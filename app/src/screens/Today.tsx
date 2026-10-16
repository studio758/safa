import { useEffect, useRef } from 'react';
import { Animated, Pressable, Text, View, type ScrollViewInstance } from 'react-native';
import { BlendHero, PracticeItem, ReflectPrompt, ShapesList } from '../ds/almanac';
import { Button } from '../ds/Button';
import { Eyebrow, Tag } from '../ds/display';
import { IconButton } from '../ds/IconButton';
import { Wordmark } from '../ds/Wordmark';
import { FIRST_DAY, LAST_DAY, relativeLabel } from '../data/calendar';
import { CATEGORY } from '../data/editorial';
import { dayTypeLabel } from '../data/engine';
import { useTween } from '../lib/useTween';
import { useSafa } from '../state/SafaState';
import { color, radius, type, wrap } from '../theme/tokens';
import { Cover, ListRow, Scroller, card } from './shared';

export function Today() {
  const { state: s, day, prevDay, nextDay, goToday, toggleSave, openObs, openGreet, togglePractice, openJournal, openLearn } = useSafa();
  const fade = useTween(s.fade, { duration: 320 });

  const scroll = useRef<ScrollViewInstance>(null);
  useEffect(() => { scroll.current?.scrollTo({ y: 0, animated: false }); }, [day.key]);

  const practices = day.practice.map((p, i) => ({ ...p, key: `${day.key}:${i}`, done: !!s.done[`${day.key}:${i}`] }));
  const nDone = practices.filter(p => p.done).length;
  const shapes = day.shapes.map(sh => (sh.eventId !== undefined ? { ...sh, onPress: () => openObs(sh.eventId!) } : sh));
  const lead = day.lead;
  const isToday = day.key === s.today;

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12 }}>
        <View style={{ opacity: day.key === FIRST_DAY ? 0.3 : 1 }}>
          <IconButton icon="chevron-left" label="Previous day" onPress={prevDay} />
        </View>
        <Wordmark size={18} />
        <View style={{ flexDirection: 'row', gap: 2 }}>
          <IconButton icon="bookmark" label="Save this day" active={!!s.saved[day.key]} onPress={toggleSave} />
          <View style={{ opacity: day.key === LAST_DAY ? 0.3 : 1 }}>
            <IconButton icon="chevron-right" label="Next day" onPress={nextDay} />
          </View>
        </View>
      </View>

      <Scroller ref={scroll} contentStyle={{ paddingTop: 8, paddingHorizontal: 24, paddingBottom: 120 }}>
        <Animated.View style={{ opacity: fade, transform: [{ translateY: fade.interpolate({ inputRange: [0, 1], outputRange: [8, 0] }) }] }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <Tag tone={day.tagTone}>{dayTypeLabel(day.dayType)}</Tag>
            <Text style={[type.caption, { color: color.textMuted }]}>{relativeLabel(day.key, s.today)}</Text>
            {isToday ? null : (
              <Pressable accessibilityRole="button" onPress={goToday} hitSlop={8} style={{ marginLeft: 'auto' }}>
                <Text style={[type.caption, { color: color.textSage, fontFamily: 'Inter_500Medium' }]}>Back to today</Text>
              </Pressable>
            )}
          </View>
          <BlendHero date={day.date} theme={day.theme} blend={day.blend} image={day.image} cues={day.cues} />

          {lead ? (
            <ListRow
              icon={(CATEGORY[lead.category] ?? CATEGORY.religion).icon}
              tint={color.terracotta500}
              badgeBg={color.terracotta50}
              title={lead.name}
              note={`${lead.tradition} · meaning and context`}
              chevron
              onPress={() => openObs(lead.id)}
              style={[card, { marginTop: 28, paddingVertical: 16, paddingHorizontal: 18 }]}
              hoverBg={color.surfaceMuted}
            />
          ) : null}

          <View style={{ height: 40 }} />
          <View style={{ marginBottom: 6 }}><Eyebrow>What Shapes Today</Eyebrow></View>
          <ShapesList items={shapes} />

          <View style={{ height: 36 }} />
          <View style={{ marginBottom: 14 }}><Eyebrow tone="sage">Nature Now</Eyebrow></View>
          <View style={{ borderRadius: radius.lg, overflow: 'hidden', backgroundColor: color.surfaceSage, borderWidth: 1, borderColor: color.sage100 }}>
            <Cover source={day.nature.image} style={{ height: 128 }} />
            <View style={{ paddingTop: 18, paddingHorizontal: 20, paddingBottom: 20, gap: 6 }}>
              <Text style={[type.h3, { color: color.textHeading }]}>{day.nature.title}</Text>
              <Text style={[type.small, { color: color.textBody }]}>{day.nature.text}</Text>
            </View>
          </View>

          <View style={{ height: 36 }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
            <Eyebrow>Practice Today</Eyebrow>
            <Text style={[type.caption, { color: color.textMuted }]}>{nDone ? `${nDone} of ${practices.length}` : ''}</Text>
          </View>
          <View style={{ gap: 10 }}>
            {practices.map(p => (
              <PracticeItem key={p.key} title={p.title} category={p.category} duration={p.duration} done={p.done} onToggle={v => togglePractice(p.key, v)} />
            ))}
          </View>

          {day.prompt ? (
            <>
              <View style={{ height: 36 }} />
              <ReflectPrompt label={day.prompt.label} prompt={day.prompt.prompt} action={day.prompt.action} onAction={openJournal} />
            </>
          ) : null}

          {day.share ? (
            <View style={{ marginTop: 36, gap: 14 }}>
              <Eyebrow tone={day.share.mode === 'greeting' ? 'terracotta' : 'muted'}>
                {day.share.mode === 'greeting' ? 'Share a Greeting' : 'Share Respectfully'}
              </Eyebrow>
              <Text style={[type.blend, wrap.pretty, { color: color.textBody }]}>{day.share.event.greetingShort}</Text>
              <Button
                variant={day.share.mode === 'greeting' ? 'warm' : 'secondary'}
                fullWidth
                icon={day.share.mode === 'greeting' ? 'envelope' : 'feather'}
                onPress={() => openGreet(day.share!.event.id)}
              >
                {day.share.mode === 'greeting' ? 'Send a greeting' : 'Share respectfully'}
              </Button>
            </View>
          ) : null}

          <View style={{ height: 24 }} />
          <Button variant="secondary" fullWidth icon="book-open" onPress={openLearn}>Learn more</Button>
        </Animated.View>
      </Scroller>
    </View>
  );
}

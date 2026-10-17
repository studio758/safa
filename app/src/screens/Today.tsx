import { useEffect, useRef } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { BlendHero, FlatTile, PracticeItem, ReflectPrompt, ShapesList } from '../ds/almanac';
import { Button } from '../ds/Button';
import { Eyebrow, Tag } from '../ds/display';
import { Sheet } from '../ds/feedback';
import { JournalField } from '../ds/forms';
import { IconButton } from '../ds/IconButton';
import { Wordmark } from '../ds/Wordmark';
import { FIRST_DAY, LAST_DAY, relativeLabel } from '../data/calendar';
import { dayTypeLabel } from '../data/engine';
import { useTween } from '../lib/useTween';
import { useSafa } from '../state/SafaState';
import { color, radius, type } from '../theme/tokens';
import { Scroller, type ScrollViewInstance } from './shared';

export function Today() {
  const { state: s, day, prevDay, nextDay, goToday, toggleSave, togglePractice, openJournal, closeJournal, setDraft, saveEntry } = useSafa();
  const fade = useTween(s.fade, { duration: 320 });

  const scroll = useRef<ScrollViewInstance>(null);
  useEffect(() => { scroll.current?.scrollTo({ y: 0, animated: false }); }, [day.key]);

  const practices = day.practice.map((p, i) => ({ ...p, key: `${day.key}:${i}`, done: !!s.practices[`${day.key}:${i}`] }));
  const nDone = practices.filter(p => p.done).length;
  const isToday = day.key === s.today;

  const prompt = day.prompt ?? { label: 'Reflect', prompt: day.reflect, action: 'Write in your journal' };

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
          <IconButton icon="gear" label="Settings" onPress={() => router.push('/settings')} />
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

          <BlendHero date={day.date} theme={day.theme} blend={day.blend} flat={day.flat} cues={day.cues} />

          <View style={{ height: 40 }} />
          <View style={{ marginBottom: 6 }}><Eyebrow>What Shapes Today</Eyebrow></View>
          <ShapesList items={day.shapes} />
          <Text style={[type.caption, { color: color.textFaint, marginTop: 10 }]}>
            Moon entries are sample data until verified lunar calculations arrive in Stage 2.
          </Text>

          <View style={{ height: 36 }} />
          <View style={{ marginBottom: 14 }}><Eyebrow tone="sage">Nature Now</Eyebrow></View>
          <View style={{ borderRadius: radius.lg, overflow: 'hidden', backgroundColor: color.surfaceSage, borderWidth: 1, borderColor: color.sage100 }}>
            <FlatTile flat={day.nature.flat} style={{ height: 128 }} />
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
              <PracticeItem key={p.key} title={p.title} category={p.category} duration={p.duration} done={p.done} onToggle={v => togglePractice(p.key, p.title, v)} />
            ))}
          </View>

          <View style={{ height: 36 }} />
          <ReflectPrompt label={prompt.label} prompt={prompt.prompt} action={prompt.action} onAction={openJournal} />
        </Animated.View>
      </Scroller>

      <Sheet open={s.journalOpen} onClose={closeJournal} title="Reflection">
        <View style={{ gap: 20 }}>
          <JournalField prompt={prompt.prompt} value={s.draft} onChange={setDraft} />
          <Button variant="primary" fullWidth disabled={!s.draft.trim()} onPress={() => saveEntry(prompt.prompt)}>
            Save reflection
          </Button>
        </View>
      </Sheet>
    </View>
  );
}

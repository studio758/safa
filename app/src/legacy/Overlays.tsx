import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { FlatTile, PracticeItem } from '../ds/almanac';
import { Button } from '../ds/Button';
import { Eyebrow, Tag } from '../ds/display';
import { JournalField, TextField } from '../ds/forms';
import { Icon } from '../ds/Icon';
import { IconButton } from '../ds/IconButton';
import { ROW_BY_ID, longDate, rangeLabel, shortDate } from '../data/calendar';
import { CARDS, suggestionsFor, type CardStyle } from '../data/content';
import { eventTypeLabel, flatForEvent, greetingModeFor, isFestive, isSolemn, practiceFor, seasonOf } from '../data/engine';
import { useTween } from '../lib/useTween';
import { useSafa } from '../state/SafaState';
import { color, font, motion, radius, type, wrap } from '../theme/tokens';
import type { ScrollViewInstance } from '../screens/shared';
import { Scroller, card } from '../screens/shared';

/** Full-screen page that slides in from the right (520ms, settle easing). */
function SlideOver({ open, z, title, onBack, label, children }: { open: boolean; z: number; title: string; onBack: () => void; label: string; children: ReactNode }) {
  const [w, setW] = useState(400);
  const v = useTween(open ? 0 : 1, { duration: 520, easing: motion.settle });
  return (
    <Animated.View
      onLayout={e => setW(e.nativeEvent.layout.width)}
      pointerEvents={open ? 'auto' : 'none'}
      accessibilityLabel={label}
      accessibilityElementsHidden={!open}
      importantForAccessibility={open ? 'auto' : 'no-hide-descendants'}
      style={[
        StyleSheet.absoluteFill,
        { zIndex: z, backgroundColor: color.bgCanvas, transform: [{ translateX: v.interpolate({ inputRange: [0, 1], outputRange: [0, w * 1.04] }) }] },
      ]}
    >
      <View style={{ height: 52, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, gap: 4 }}>
        <IconButton icon="chevron-left" label="Back" onPress={onBack} />
        <Text numberOfLines={1} style={{ ...font('display', 500, 17, 1.2), color: color.textHeading, flexShrink: 1 }}>{title}</Text>
      </View>
      {children}
    </Animated.View>
  );
}

/** Key facts from the calendar row, as label/value pairs. */
function Facts({ items }: { items: [string, string | undefined][] }) {
  return (
    <View style={{ gap: 10 }}>
      {items.filter((x): x is [string, string] => !!x[1]).map(([k, v]) => (
        <View key={k} style={{ flexDirection: 'row', gap: 12 }}>
          <Text style={[type.small, { width: 96, color: color.textMuted }]}>{k}</Text>
          <Text style={[type.small, { flex: 1, color: color.textBody }]}>{v}</Text>
        </View>
      ))}
    </View>
  );
}

export function ObservanceDetail({ bottomInset }: { bottomInset: number }) {
  const { state: s, closeObs, toggleObsPractice, openGreet, toggleCal, showDay } = useSafa();
  const row = ROW_BY_ID.get(s.obsId);

  const scroll = useRef<ScrollViewInstance>(null);
  useEffect(() => { if (s.obsOpen) scroll.current?.scrollTo({ y: 0, animated: false }); }, [s.obsOpen, s.obsId]);

  if (!row) return null;
  const inCal = !!s.cal[row.id];
  const mode = greetingModeFor(row);
  const tagTone = isSolemn(row) ? 'neutral' : isFestive(row) ? 'terracotta' : mode === 'respectful' ? 'mauve' : 'sage';
  const day = rangeLabel(row);
  const holiday = row.holiday === 'yes' ? 'Public holiday' : row.holiday === 'regional' ? 'Public holiday in some regions' : undefined;
  const precision = row.precision === 'approximate' ? 'Approximate; may shift by a day or more' : row.precision === 'ecological_window' ? 'Seasonal window rather than a fixed date' : undefined;

  return (
    <SlideOver open={s.obsOpen} z={30} title="Observance" onBack={closeObs} label="Observance detail">
      <Scroller ref={scroll} contentStyle={{ paddingTop: 8, paddingHorizontal: 24, paddingBottom: 48 + bottomInset }}>
        <FlatTile flat={flatForEvent(row, seasonOf(row, s.settings.hemisphere))} style={{ height: 220, borderRadius: radius.lg }} />
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 20, marginBottom: 10 }}>
          <Tag tone={tagTone}>{eventTypeLabel(row)}</Tag>
          <Text style={[type.caption, { color: color.textMuted, flexShrink: 1 }]}>{longDate(row.date)}{day ? ` · ${day}` : ''}</Text>
        </View>
        <Text accessibilityRole="header" style={[type.h1, wrap.balance, { color: color.textHeading }]}>{row.name}</Text>
        {row.alt ? <Text style={[type.caption, { color: color.textMuted, marginTop: 6 }]}>Also known as {row.alt}</Text> : null}
        <Text style={[type.blend, wrap.pretty, { color: color.textBody, marginTop: 12 }]}>{row.meaning}</Text>

        <View style={styles.section}>
          <Eyebrow>About</Eyebrow>
          <Facts
            items={[
              ['Tradition', row.subCategory && row.subCategory !== row.tradition ? `${row.tradition} · ${row.subCategory}` : row.tradition],
              ['Region', row.region],
              ['Calendar', row.calendarDate ? `${row.calendar} · ${row.calendarDate}` : row.calendar],
              ['Dates', row.range ? `${shortDate(row.range[0])} – ${shortDate(row.range[1])}` : undefined],
              ['Date', precision],
              ['Holiday', holiday],
              ['Note', row.notes],
            ]}
          />
        </View>

        {row.greetingLong ? (
          <View style={styles.section}>
            <Eyebrow tone={mode === 'greeting' ? 'terracotta' : 'muted'}>{mode === 'greeting' ? 'A Greeting to Share' : 'Sharing Respectfully'}</Eyebrow>
            <Text style={[type.body, wrap.pretty, { color: color.textBody }]}>{row.greetingLong}</Text>
          </View>
        ) : null}

        <View style={[styles.section, { gap: 12 }]}>
          <Eyebrow tone="sage">Related Practices</Eyebrow>
          {practiceFor(row).map((p, i) => {
            const key = `${row.id}:${i}`;
            return <PracticeItem key={key} title={p.title} category={p.category} duration={p.duration} done={!!s.obsDone[key]} onToggle={v => toggleObsPractice(key, v)} />;
          })}
        </View>

        <View style={{ marginTop: 32, gap: 10 }}>
          {mode === 'greeting' ? (
            <Button variant="warm" size="lg" fullWidth icon="envelope" onPress={() => openGreet()}>Send a greeting</Button>
          ) : mode === 'respectful' ? (
            <Button variant="secondary" size="lg" fullWidth icon="feather" onPress={() => openGreet()}>Share respectfully</Button>
          ) : (
            <View style={[card, { backgroundColor: color.surfaceMuted, paddingVertical: 18, paddingHorizontal: 20, flexDirection: 'row', gap: 12, alignItems: 'flex-start' }]}>
              <Icon name="feather" size={14} color={color.stone500} style={{ width: undefined, marginTop: 4 }} />
              <Text style={[type.small, { color: color.textBody, flex: 1 }]}>This is a calendar marker rather than an occasion for greetings.</Text>
            </View>
          )}
          <Button variant="secondary" size="lg" fullWidth icon={inCal ? 'check' : 'calendar-plus'} onPress={toggleCal}>
            {inCal ? 'Added to calendar' : 'Add to calendar'}
          </Button>
          <Button variant="ghost" fullWidth icon="sun" onPress={() => showDay(row.date)}>See the whole day</Button>
        </View>
      </Scroller>
    </SlideOver>
  );
}

/** One card style layer; layers cross-fade (480ms) when the style changes. */
function CardLayer({ style, on }: { style: CardStyle; on: boolean }) {
  const v = useTween(on ? 1 : 0, { duration: 480 });
  return (
    <Animated.View style={[StyleSheet.absoluteFill, { opacity: v, backgroundColor: style.bg }]}>
      <View style={[StyleSheet.absoluteFill, { backgroundColor: style.wash }]} />
    </Animated.View>
  );
}

export function GreetingComposer({ bottomInset }: { bottomInset: number }) {
  const { state: s, closeGreet, setCardStyle, setRecipient, setNote, shareGreet } = useSafa();
  const row = ROW_BY_ID.get(s.obsId);
  if (!row) return null;
  const respectful = row.share !== 'yes';
  const c = CARDS.find(x => x.id === s.cardStyle) ?? CARDS[0];
  const headline = row.greetingShort ?? row.name;
  const noteShown = s.note.trim() || 'Your note will appear here.';
  const recipientShown = s.recipient.trim() || 'someone dear';
  const closing = `For ${recipientShown}, with ${respectful ? 'care' : 'warmth'} from Safa`;

  return (
    <SlideOver open={s.greetOpen} z={40} title={respectful ? `Share respectfully: ${row.name}` : `A greeting for ${row.name}`} onBack={closeGreet} label="Greeting composer">
      <Scroller contentStyle={{ paddingTop: 8, paddingHorizontal: 24, paddingBottom: 48 + bottomInset }}>
        <View
          accessibilityLabel={`Card preview: ${headline}. ${noteShown} ${closing}`}
          style={{ aspectRatio: 4 / 5, borderRadius: radius.lg, overflow: 'hidden', borderWidth: 1, borderColor: color.borderSubtle }}
        >
          {CARDS.map(x => <CardLayer key={x.id} style={x} on={x.id === c.id} />)}
          <View style={[StyleSheet.absoluteFill, { paddingVertical: 32, paddingHorizontal: 28, justifyContent: 'space-between', alignItems: 'center' }]}>
            <Text style={{ ...font('sans', 500, 11, 1.2), letterSpacing: 11 * 0.14, textTransform: 'uppercase', color: c.eyebrow, textAlign: 'center' }}>{row.name}</Text>
            <View style={{ gap: 18, alignItems: 'center' }}>
              <Text style={[font('display', 500, headline.length > 48 ? 22 : 30, 1.2), wrap.balance, { color: c.fg, textAlign: 'center' }]}>{headline}</Text>
              {s.note.trim() && s.note.trim() !== headline ? (
                <Text numberOfLines={6} style={[font('serifItalic', 400, 15, 1.6), wrap.pretty, { color: c.fg, textAlign: 'center', maxWidth: 270 }]}>{noteShown}</Text>
              ) : null}
            </View>
            <Text style={{ ...font('sans', 400, 13, 1.4), color: c.eyebrow, textAlign: 'center' }}>{closing}</Text>
          </View>
        </View>

        <View style={{ marginTop: 28, marginBottom: 12 }}><Eyebrow tone="muted">Card</Eyebrow></View>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          {CARDS.map(x => {
            const on = x.id === s.cardStyle;
            return (
              <Pressable
                key={x.id}
                accessibilityRole="radio"
                accessibilityState={{ checked: on }}
                accessibilityLabel={x.label}
                onPress={() => setCardStyle(x.id)}
                style={{ flex: 1, minWidth: 0, gap: 8, alignItems: 'center' }}
              >
                <View style={{ alignSelf: 'stretch', height: 64 }}>
                  {on ? <View style={styles.swatchRing} /> : null}
                  <View style={[StyleSheet.absoluteFill, { borderRadius: radius.md, overflow: 'hidden', backgroundColor: x.bg }]}>
                    {on ? null : <View style={[StyleSheet.absoluteFill, { borderRadius: radius.md, borderWidth: 1, borderColor: color.borderSubtle }]} />}
                  </View>
                </View>
                <Text style={[type.caption, { color: color.textBody }]}>{x.label}</Text>
              </Pressable>
            );
          })}
        </View>

        <View style={{ height: 24 }} />
        <TextField label="For" value={s.recipient} onChange={setRecipient} placeholder="A name" />
        <Text style={[type.label, { color: color.textHeading, marginTop: 24, marginBottom: 10 }]}>Your note</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
          {suggestionsFor(row).map(g => (
            <Tag key={g.label} tone={respectful ? 'neutral' : 'terracotta'} selected={s.note === g.text} onPress={() => setNote(g.text)}>{g.label}</Tag>
          ))}
        </View>
        <JournalField value={s.note} onChange={setNote} rows={3} placeholder="Write a few words in your own voice…" />
        <View style={{ height: 28 }} />
        <Button variant={respectful ? 'primary' : 'warm'} size="lg" fullWidth icon="share-from-square" onPress={shareGreet}>
          {respectful ? 'Share message' : 'Share greeting'}
        </Button>
      </Scroller>
    </SlideOver>
  );
}

const styles = StyleSheet.create({
  section: { marginTop: 28, paddingTop: 24, borderTopWidth: 1, borderTopColor: color.borderRule, gap: 10 },
  // box-shadow: 0 0 0 2px canvas, 0 0 0 4px sage-600 → a 2px ring sitting 2px outside the swatch.
  swatchRing: { position: 'absolute', top: -4, left: -4, right: -4, bottom: -4, borderRadius: radius.md + 4, borderWidth: 2, borderColor: color.sage600 },
});

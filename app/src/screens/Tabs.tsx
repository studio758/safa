import { Pressable, ScrollView, Text, View } from 'react-native';
import { Button } from '../ds/Button';
import { Eyebrow } from '../ds/display';
import { SegmentedControl, Toggle } from '../ds/forms';
import { IconButton } from '../ds/IconButton';
import { Wordmark } from '../ds/Wordmark';
import { DAY_KEYS, FIRST_DAY, LAST_DAY, addDays, addMonths, fromKey, inRange, longDate, monthOf, monthTitle, rowsFor, shortDate, weekdayShort } from '../data/calendar';
import { CATEGORY } from '../data/editorial';
import { DAY_KIND_COLOR, buildDay, eventTypeLabel, rankEvents } from '../data/engine';
import { useSafa } from '../state/SafaState';
import { color, font, radius, type } from '../theme/tokens';
import { Cover, ListRow, ScreenTitle, Scroller, TAB_CONTENT, card } from './shared';

/** Monday-first week containing `key`. */
function weekOf(key: string) {
  const dow = (fromKey(key).getDay() + 6) % 7;
  const start = addDays(key, -dow);
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
}

const FIRST_MONTH = monthOf(FIRST_DAY);
const LAST_MONTH = monthOf(LAST_DAY);

export function Almanac() {
  const { state: s, showDay, openObs, setMonth } = useSafa();
  const week = weekOf(s.dayKey);
  const days = DAY_KEYS.filter(k => monthOf(k) === s.month);

  return (
    <Scroller contentStyle={TAB_CONTENT}>
      <Eyebrow tone="muted">{monthTitle(monthOf(s.dayKey))}</Eyebrow>
      <ScreenTitle style={{ marginTop: 8, marginBottom: 22 }}>Almanac</ScreenTitle>

      <View style={[card, { flexDirection: 'row', gap: 4, paddingVertical: 10, paddingHorizontal: 6 }]}>
        {week.map(k => {
          const sel = k === s.dayKey;
          const ok = inRange(k);
          const kind = ok ? buildDay(k, s.hemi).kind : 'quiet';
          const fg = sel ? color.linen0 : k === s.today ? color.sage700 : color.textHeading;
          const dot = sel && kind !== 'quiet' ? color.linen0 : DAY_KIND_COLOR[kind];
          return (
            <Pressable
              key={k}
              accessibilityRole="button"
              accessibilityLabel={longDate(k)}
              accessibilityState={{ selected: sel, disabled: !ok }}
              disabled={!ok}
              onPress={() => showDay(k)}
              style={{ flex: 1, minWidth: 0, alignItems: 'center', gap: 6, paddingVertical: 8, borderRadius: 999, backgroundColor: sel ? color.sage700 : 'transparent', opacity: ok ? 1 : 0.35 }}
            >
              <Text style={{ ...font('sans', 500, 10, 1), lineHeight: 12, letterSpacing: 0.8, textTransform: 'uppercase', opacity: 0.75, color: fg }}>{weekdayShort(k)}</Text>
              <Text style={{ ...font('display', 500, 17, 1), lineHeight: 20, color: fg }}>{fromKey(k).getDate()}</Text>
              <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: dot }} />
            </Pressable>
          );
        })}
      </View>

      <View style={{ height: 32 }} />
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        <Eyebrow>{monthTitle(s.month)}</Eyebrow>
        <View style={{ flexDirection: 'row', gap: 2, marginRight: -10 }}>
          <View style={{ opacity: s.month === FIRST_MONTH ? 0.3 : 1 }}>
            <IconButton icon="chevron-left" label="Previous month" size={36} onPress={() => s.month > FIRST_MONTH && setMonth(addMonths(s.month, -1))} />
          </View>
          <View style={{ opacity: s.month === LAST_MONTH ? 0.3 : 1 }}>
            <IconButton icon="chevron-right" label="Next month" size={36} onPress={() => s.month < LAST_MONTH && setMonth(addMonths(s.month, 1))} />
          </View>
        </View>
      </View>
      {days.map(k => {
        const { moon, events } = rowsFor(k);
        const rows = [
          ...rankEvents(events).map(e => {
            const cat = CATEGORY[e.category] ?? CATEGORY.religion;
            return { id: `e${e.id}`, icon: cat.icon, tint: cat.tint, title: e.name, note: `${e.tradition} · ${eventTypeLabel(e)}`, onPress: () => openObs(e.id) };
          }),
          ...(moon?.moonTransition
            ? [{ id: `m${moon.id}`, icon: moon.moonPhase === 'New Moon' ? 'circle' : 'moon', tint: CATEGORY.natural_cycle.tint, title: moon.moonPhase, note: 'Moon phase', onPress: () => showDay(k) }]
            : []),
        ];
        return rows.map((r, i) => (
          <ListRow
            key={r.id}
            leading={i === 0 ? (k === s.today ? 'Today' : shortDate(k)) : ' '}
            icon={r.icon}
            tint={r.tint}
            title={r.title}
            note={r.note}
            chevron
            onPress={r.onPress}
            style={{ paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: color.borderSubtle }}
          />
        ));
      })}
    </Scroller>
  );
}

export function Journal() {
  const { state: s, openJournal, showDay } = useSafa();
  const saved = Object.keys(s.saved).filter(k => s.saved[k]).sort().map(k => buildDay(k, s.hemi));
  return (
    <Scroller contentStyle={TAB_CONTENT}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
        <ScreenTitle>Journal</ScreenTitle>
        <Button size="sm" icon="pen" onPress={openJournal}>New entry</Button>
      </View>

      {saved.length > 0 ? (
        <>
          <View style={{ marginBottom: 12 }}><Eyebrow tone="sage">Saved Days</Eyebrow></View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginHorizontal: -24, marginBottom: 32 }}
            contentContainerStyle={{ paddingHorizontal: 24, gap: 10 }}
          >
            {saved.map(d => (
              <Pressable
                key={d.key}
                accessibilityRole="button"
                accessibilityLabel={`${d.date}: ${d.theme}`}
                onPress={() => showDay(d.key)}
                style={{ width: 150, borderWidth: 1, borderColor: color.borderSubtle, borderRadius: radius.lg, overflow: 'hidden', backgroundColor: color.surfaceCard }}
              >
                <Cover source={d.image} style={{ height: 90 }} />
                <View style={{ paddingTop: 12, paddingHorizontal: 14, paddingBottom: 14, gap: 4 }}>
                  <Text style={[type.caption, { color: color.textMuted }]}>{d.date}</Text>
                  <Text style={{ ...font('display', 500, 15, 1.3), color: color.textHeading }}>{d.lead?.name ?? d.theme}</Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </>
      ) : null}

      <View style={{ marginBottom: 4 }}><Eyebrow tone="mauve">Reflections</Eyebrow></View>
      {s.entries.map((e, i) => (
        <View key={`${e.date}-${s.entries.length - i}`} style={{ paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: color.borderSubtle, gap: 8 }}>
          <Text style={[type.caption, { color: color.textMuted }]}>{e.date}</Text>
          <Text style={{ ...font('serifItalic', 400, 17, 1.5), color: color.textMauve }}>{e.prompt}</Text>
          <Text style={{ ...font('serif', 400, 16, 1.7), color: color.textHeading }}>{e.text}</Text>
        </View>
      ))}
    </Scroller>
  );
}

export function You() {
  const { state: s, setHemi, setRemind, setObsRemind, replay } = useSafa();
  return (
    <Scroller contentStyle={[TAB_CONTENT, { flexGrow: 1 }]}>
      <ScreenTitle style={{ marginBottom: 28 }}>You</ScreenTitle>
      <View style={{ marginBottom: 12 }}><Eyebrow tone="muted">Hemisphere</Eyebrow></View>
      <SegmentedControl options={['Northern', 'Southern']} value={s.hemi} onChange={setHemi} />
      <Text style={[type.caption, { color: color.textMuted, marginTop: 10, marginBottom: 28 }]}>
        Seasons and nature notes follow the {s.hemi.toLowerCase()} hemisphere.
      </Text>

      <View style={{ marginBottom: 12 }}><Eyebrow tone="muted">Notifications</Eyebrow></View>
      <View style={[card, { paddingVertical: 16, paddingHorizontal: 18, gap: 18 }]}>
        <Toggle checked={s.remind} onChange={setRemind} label="Morning reminder" description="7:00 · silent" />
        <View style={{ height: 1, backgroundColor: color.borderSubtle }} />
        <Toggle checked={s.obsRemind} onChange={setObsRemind} label="Observances you follow" description="The evening before" />
      </View>

      <View style={{ height: 28 }} />
      <Button variant="secondary" fullWidth icon="rotate-left" onPress={replay}>Replay welcome</Button>
      <View style={{ flex: 1, minHeight: 40 }} />
      <View style={{ alignItems: 'center', paddingTop: 24 }}>
        <Wordmark size={24} tagline />
      </View>
    </Scroller>
  );
}

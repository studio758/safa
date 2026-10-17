import { useEffect, useRef, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { Eyebrow } from '../ds/display';
import { IconButton } from '../ds/IconButton';
import { DAY_KEYS, FIRST_DAY, LAST_DAY, addDays, addMonths, clampKey, fromKey, inRange, longDate, monthOf, monthTitle, rowsFor, shortDate, weekdayShort } from '../data/calendar';
import { CATEGORY } from '../data/editorial';
import { DAY_KIND_COLOR, buildDay, eventTypeLabel, rankEvents } from '../data/engine';
import { useSafa } from '../state/SafaState';
import { color, font } from '../theme/tokens';
import { ListRow, ScreenTitle, Scroller, TAB_CONTENT, card } from '../screens/shared';

/** The seven days (Monday first) of the week containing `key`. */
function weekOf(key: string) {
  const dow = (fromKey(key).getDay() + 6) % 7;
  const start = addDays(key, -dow);
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
}

const FIRST_MONTH = monthOf(FIRST_DAY);
const LAST_MONTH = monthOf(LAST_DAY);

/** Every Monday that starts a week in the calendar's range, oldest first. */
const WEEK_STARTS: string[] = (() => {
  const out: string[] = [];
  for (let k = weekOf(FIRST_DAY)[0]; k <= LAST_DAY; k = addDays(k, 7)) out.push(k);
  return out;
})();

/** One day in the week strip. Tapping opens that day on Today. */
function DayCell({ k, selected, onPress }: { k: string; selected: boolean; onPress: (k: string) => void }) {
  const { state: s } = useSafa();
  const sel = selected;
  const ok = inRange(k);
  const kind = ok ? buildDay(k, s.settings.hemisphere).kind : 'quiet';
  const fg = sel ? color.linen0 : k === s.today ? color.sage700 : color.textHeading;
  const dot = sel && kind !== 'quiet' ? color.linen0 : DAY_KIND_COLOR[kind];
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={longDate(k)}
      accessibilityState={{ selected: sel, disabled: !ok }}
      disabled={!ok}
      onPress={() => onPress(k)}
      style={{ flex: 1, minWidth: 0, alignItems: 'center', gap: 6, paddingVertical: 8, borderRadius: 999, backgroundColor: sel ? color.sage700 : 'transparent', opacity: ok ? 1 : 0.35 }}
    >
      <Text style={{ ...font('sans', 500, 10, 1), lineHeight: 12, letterSpacing: 0.8, textTransform: 'uppercase', opacity: 0.75, color: fg }}>{weekdayShort(k)}</Text>
      <Text style={{ ...font('display', 500, 17, 1), lineHeight: 20, color: fg }}>{fromKey(k).getDate()}</Text>
      <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: dot }} />
    </Pressable>
  );
}

export function Almanac() {
  const { state: s, showDay, openObs, setMonth } = useSafa();
  const days = DAY_KEYS.filter(k => monthOf(k) === s.month);

  // The week strip is a paging list of weeks. Swiping moves the selected day to the
  // same weekday in the new week, without leaving the almanac.
  const weekIdx = WEEK_STARTS.indexOf(weekOf(s.dayKey)[0]);
  const settled = useRef(weekIdx);
  const pager = useRef<FlatList<string>>(null);
  const [pageW, setPageW] = useState(0);

  useEffect(() => {
    if (!pageW || weekIdx < 0 || weekIdx === settled.current) return;
    settled.current = weekIdx;
    pager.current?.scrollToIndex({ index: weekIdx, animated: true });
  }, [weekIdx, pageW]);

  const onSettle = (x: number) => {
    if (!pageW) return;
    const idx = Math.round(x / pageW);
    const start = WEEK_STARTS[idx];
    if (!start || idx === settled.current) return;
    settled.current = idx;
    const dow = (fromKey(s.dayKey).getDay() + 6) % 7;
    const target = clampKey(addDays(start, dow));
    showDay(target);
    setMonth(monthOf(target));
  };

  return (
    <Scroller contentStyle={TAB_CONTENT}>
      <Eyebrow tone="muted">{monthTitle(monthOf(s.dayKey))}</Eyebrow>
      <ScreenTitle style={{ marginTop: 8, marginBottom: 22 }}>Almanac</ScreenTitle>

      <View style={[card, { overflow: 'hidden' }]} onLayout={e => setPageW(e.nativeEvent.layout.width - 2)}>
        {pageW > 0 ? (
          <FlatList
            ref={pager}
            data={WEEK_STARTS}
            keyExtractor={k => k}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            initialScrollIndex={Math.max(0, weekIdx)}
            getItemLayout={(_, i) => ({ length: pageW, offset: pageW * i, index: i })}
            onMomentumScrollEnd={e => onSettle(e.nativeEvent.contentOffset.x)}
            renderItem={({ item: start }) => (
              <View style={{ width: pageW, flexDirection: 'row', gap: 4, paddingVertical: 10, paddingHorizontal: 6 }}>
                {weekOf(start).map(k => (
                  <DayCell key={k} k={k} selected={k === s.dayKey} onPress={showDay} />
                ))}
              </View>
            )}
          />
        ) : null}
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

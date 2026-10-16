/* @ds-bundle: {"format":4,"namespace":"SafaDesignSystem_a782c7","components":[{"name":"BlendHero","sourcePath":"components/almanac/BlendHero.jsx"},{"name":"JourneySteps","sourcePath":"components/almanac/JourneySteps.jsx"},{"name":"PracticeItem","sourcePath":"components/almanac/PracticeItem.jsx"},{"name":"ReflectPrompt","sourcePath":"components/almanac/ReflectPrompt.jsx"},{"name":"ShapesList","sourcePath":"components/almanac/ShapesList.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Wordmark","sourcePath":"components/core/Wordmark.jsx"},{"name":"Card","sourcePath":"components/display/Card.jsx"},{"name":"Eyebrow","sourcePath":"components/display/Eyebrow.jsx"},{"name":"PullQuote","sourcePath":"components/display/PullQuote.jsx"},{"name":"Tag","sourcePath":"components/display/Tag.jsx"},{"name":"Sheet","sourcePath":"components/feedback/Sheet.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"JournalField","sourcePath":"components/forms/JournalField.jsx"},{"name":"SegmentedControl","sourcePath":"components/forms/SegmentedControl.jsx"},{"name":"TextField","sourcePath":"components/forms/TextField.jsx"},{"name":"Toggle","sourcePath":"components/forms/Toggle.jsx"},{"name":"TabBar","sourcePath":"components/navigation/TabBar.jsx"},{"name":"TopBar","sourcePath":"components/navigation/TopBar.jsx"}],"sourceHashes":{"app/CalendarScreen.jsx":"50c1d23f9686","app/Greeting.jsx":"20cae4045832","app/OtherScreens.jsx":"f213cd58db77","app/Parts.jsx":"1ea9e8c53d9d","app/TodayScreen.jsx":"a2666603d84e","app/content.js":"41438307ba2b","app/data.js":"35c030862b44","app/ios-frame.jsx":"24642b887be3","app/tweaks-panel.jsx":"d259e3a86f73","components/almanac/BlendHero.jsx":"8563cb395ecd","components/almanac/JourneySteps.jsx":"3125b59a2159","components/almanac/PracticeItem.jsx":"6ae2eca2af71","components/almanac/ReflectPrompt.jsx":"0b7ae542cb07","components/almanac/ShapesList.jsx":"3e7422fc5d33","components/core/Button.jsx":"e1a3ebd06359","components/core/Icon.jsx":"93ec5ff610ce","components/core/IconButton.jsx":"6edc9f4dca8f","components/core/Wordmark.jsx":"2d3e3025a0b1","components/display/Card.jsx":"6453f7108e04","components/display/Eyebrow.jsx":"93cb121a2b13","components/display/PullQuote.jsx":"68ffb07f0d70","components/display/Tag.jsx":"d234e1f50aae","components/feedback/Sheet.jsx":"7746fa13136f","components/feedback/Toast.jsx":"ec10de89e746","components/forms/Checkbox.jsx":"4b090ed8d9b5","components/forms/JournalField.jsx":"3a31311e14cc","components/forms/SegmentedControl.jsx":"4c1c60b9c723","components/forms/TextField.jsx":"2c4edd621e98","components/forms/Toggle.jsx":"32a251c97c47","components/navigation/TabBar.jsx":"be50e5bab7e7","components/navigation/TopBar.jsx":"59aea7e66db0","ui_kits/app/Onboarding.jsx":"2d898d7b5822","ui_kits/app/OtherTabs.jsx":"5cb71b486bc0","ui_kits/app/Today.jsx":"f70a11bcf531","ui_kits/app/data.js":"e3d3af5cff6c"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.SafaDesignSystem_a782c7 = window.SafaDesignSystem_a782c7 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// app/CalendarScreen.jsx
try { (() => {
const C_DS = window.SafaDesignSystem_a782c7;
function CalendarScreen({
  dayKey,
  todayKey,
  onOpenDay,
  onOpenEvent,
  prefs
}) {
  const {
    Tag,
    IconButton,
    Button
  } = C_DS;
  const D = window.SafaData;
  const sel0 = D.fromKey(dayKey);
  const [ym, setYm] = React.useState([sel0.getFullYear(), sel0.getMonth()]);
  const [sel, setSel] = React.useState(dayKey);
  const [filter, setFilter] = React.useState('all');
  const [y, m] = ym;
  const first = new Date(y, m, 1),
    lead = (first.getDay() + 6) % 7,
    n = new Date(y, m + 1, 0).getDate();
  const cells = [...Array(lead).fill(null), ...Array.from({
    length: n
  }, (_, i) => new Date(y, m, i + 1))];
  const minYm = D.fromKey(D.first),
    maxYm = D.fromKey(D.last);
  const canPrev = new Date(y, m, 1) > new Date(minYm.getFullYear(), minYm.getMonth(), 1);
  const canNext = new Date(y, m, 1) < new Date(maxYm.getFullYear(), maxYm.getMonth(), 1);
  const go = d => {
    const t = new Date(y, m + d, 1);
    setYm([t.getFullYear(), t.getMonth()]);
  };
  const match = e => !e.isMoon && (filter === 'all' || (filter === 'yours' ? prefs.followed.includes(e.tradition_or_system) : e.category === filter)) && (prefs.minor || e.major || prefs.followed.includes(e.tradition_or_system));
  const selDay = D.byDay[sel] ? D.day(sel) : null;
  const selEvents = selDay ? selDay.events.filter(match) : [];
  const monthCount = cells.filter(Boolean).reduce((a, d) => a + (D.byDay[D.key(d)] || []).filter(e => match(e) && e.major).length, 0);
  const FILTERS = [['all', 'All'], ...(prefs.followed.length ? [['yours', 'Yours']] : []), ['religion', 'Faith'], ['seasonal_system', 'Season'], ['ancient_tradition', 'Ancient'], ['folklore', 'Folklore']];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      overflowY: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '62px 24px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-caption)',
      color: 'var(--text-muted)'
    }
  }, y), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '4px 0 0',
      font: 'var(--type-h1)',
      color: 'var(--text-heading)'
    }
  }, first.toLocaleDateString('en-GB', {
    month: 'long'
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4,
      opacity: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: canPrev ? 1 : .3,
      pointerEvents: canPrev ? 'auto' : 'none'
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: "chevron-left",
    label: "Previous month",
    variant: "outline",
    onClick: () => go(-1)
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: canNext ? 1 : .3,
      pointerEvents: canNext ? 'auto' : 'none'
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: "chevron-right",
    label: "Next month",
    variant: "outline",
    onClick: () => go(1)
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-small)',
      color: 'var(--text-muted)',
      marginTop: 6
    }
  }, monthCount, " major observance", monthCount === 1 ? '' : 's', " this month"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      margin: '18px -24px 0',
      padding: '0 24px',
      overflowX: 'auto',
      scrollbarWidth: 'none'
    }
  }, FILTERS.map(([k, l]) => /*#__PURE__*/React.createElement(Tag, {
    key: k,
    selected: filter === k,
    onClick: () => setFilter(k)
  }, l)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 16px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      rowGap: 4
    }
  }, ['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((w, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      textAlign: 'center',
      font: '500 10px/1 var(--font-sans)',
      letterSpacing: '.08em',
      color: 'var(--text-faint)',
      paddingBottom: 8
    }
  }, w)), cells.map((d, i) => {
    if (!d) return /*#__PURE__*/React.createElement("div", {
      key: 'x' + i
    });
    const k = D.key(d),
      list = D.byDay[k] || [],
      has = list.length > 0;
    const ev = list.filter(match);
    const moon = list.find(e => e.isMoon);
    const trans = moon && moon.is_moon_phase_transition === 'yes' && /Full|New/.test(moon.moon_phase_daily);
    const on = k === sel,
      today = k === todayKey;
    const cats = [...new Set(ev.map(e => e.category))].slice(0, 3);
    return /*#__PURE__*/React.createElement("button", {
      key: k,
      disabled: !has,
      onClick: () => setSel(k),
      style: {
        height: 56,
        border: 'none',
        background: 'none',
        padding: 0,
        cursor: has ? 'pointer' : 'default',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 36,
        height: 36,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        background: on ? 'var(--charcoal-900)' : today ? 'var(--sage-100)' : 'transparent',
        color: on ? 'var(--linen-0)' : has ? 'var(--text-heading)' : 'var(--stone-400)',
        font: `${today || ev.some(e => e.major) ? 600 : 400} 15px/1 var(--font-sans)`,
        transition: 'background var(--dur-quick)'
      }
    }, d.getDate(), trans && /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        top: -1,
        right: -2
      }
    }, /*#__PURE__*/React.createElement(MoonDisc, {
      phase: moon.moon_phase_daily,
      size: 11,
      hemi: prefs.hemi
    }))), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        gap: 3,
        height: 5
      }
    }, cats.map(c => /*#__PURE__*/React.createElement("span", {
      key: c,
      style: {
        width: 5,
        height: 5,
        borderRadius: 3,
        background: D.CAT[c].color
      }
    }))));
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '16px 0 0',
      padding: '22px 24px 40px',
      borderTop: '1px solid var(--border-subtle)'
    }
  }, selDay && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement(MoonDisc, {
    phase: selDay.moon.moon_phase_daily,
    size: 28,
    hemi: prefs.hemi
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 18px/1.2 var(--font-display)',
      color: 'var(--text-heading)'
    }
  }, fmtLong(selDay.date)), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-caption)',
      color: 'var(--text-muted)',
      marginTop: 3
    }
  }, selDay.moon.moon_phase_daily, " \xB7 ", prefs.hemi === 'south' ? selDay.moon.season_hemisphere_south : selDay.moon.season_hemisphere_north))), selEvents.length ? selEvents.map((e, i) => /*#__PURE__*/React.createElement(EventRow, {
    key: e.row_id,
    e: e,
    first: i === 0,
    onOpen: onOpenEvent,
    followed: prefs.followed
  })) : /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 0',
      font: 'var(--type-small)',
      color: 'var(--text-muted)'
    }
  }, selDay.events.length ? 'Nothing here for this filter.' : 'A quiet day. Only the moon and the season are moving.'), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(Button, {
    fullWidth: true,
    variant: "primary",
    iconRight: "arrow-right",
    onClick: () => onOpenDay(sel)
  }, "Open this day")))));
}
window.CalendarScreen = CalendarScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "app/CalendarScreen.jsx", error: String((e && e.message) || e) }); }

// app/Greeting.jsx
try { (() => {
const G_DS = window.SafaDesignSystem_a782c7;
function ObservanceDetail({
  e,
  season,
  onGreet,
  onSave,
  saved
}) {
  const {
    Button,
    Eyebrow,
    IconButton
  } = G_DS;
  const D = window.SafaData;
  const ri = D.rangeInfo(e);
  const cat = D.CAT[e.category] || D.CAT.religion;
  const meta = [['Tradition', e.tradition_or_system + (e.sub_category && e.sub_category !== e.tradition_or_system ? ` · ${e.sub_category}` : '')], ['Region', e.region], e.source_calendar_date_if_applicable && e.source_calendar_system !== 'Gregorian' ? ['Calendar', `${e.source_calendar_date_if_applicable} · ${e.source_calendar_system}`] : null, ri ? ['Runs', `${fmtShort(D.fromKey(e.range_start))} – ${fmtShort(D.fromKey(e.range_end))} · day ${ri.n} of ${ri.total}`] : null, ['Date', {
    exact: 'Exact',
    computed_exact: 'Calculated',
    approximate: 'Approximate',
    ecological_window: 'Ecological window'
  }[e.date_precision] || e.date_precision], e.is_public_holiday_if_applicable && e.is_public_holiday_if_applicable !== 'no' ? ['Public holiday', e.is_public_holiday_if_applicable === 'yes' ? 'Yes' : e.is_public_holiday_if_applicable[0].toUpperCase() + e.is_public_holiday_if_applicable.slice(1)] : null].filter(Boolean);
  const share = e.shareable_greeting_applicable !== 'no';
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: `fa-solid fa-${cat.icon}`,
    style: {
      fontSize: 11,
      color: cat.color
    }
  }), /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "muted"
  }, cat.label, " \xB7 ", e.event_type.replace(/_/g, ' '))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: '500 28px/1.15 var(--font-display)',
      color: 'var(--text-heading)'
    }
  }, e.event_name), e.alternate_name && /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'italic 400 15px/1.4 var(--font-serif)',
      color: 'var(--text-muted)',
      marginTop: 6
    }
  }, e.alternate_name)), /*#__PURE__*/React.createElement(IconButton, {
    icon: "bookmark",
    label: "Save",
    active: saved,
    onClick: onSave,
    variant: "outline"
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '16px 0 20px',
      font: 'italic 400 17px/1.65 var(--font-serif)',
      color: 'var(--text-body)'
    }
  }, e.short_meaning), e.sensitivity_flag === 'high' && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      padding: '14px 16px',
      marginBottom: 20,
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-muted)',
      font: 'var(--type-small)',
      color: 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-feather",
    style: {
      color: 'var(--stone-500)',
      marginTop: 4
    }
  }), /*#__PURE__*/React.createElement("span", null, "A solemn observance for many. Safa shares it as a respectful acknowledgment, never as a celebration.")), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--border-subtle)'
    }
  }, meta.map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: 'flex',
      gap: 16,
      padding: '12px 0',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 104,
      flex: 'none',
      font: 'var(--type-caption)',
      color: 'var(--text-muted)',
      paddingTop: 2
    }
  }, k), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-small)',
      color: 'var(--text-heading)'
    }
  }, v)))), e.notes && /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-caption)',
      color: 'var(--text-muted)',
      marginTop: 12
    }
  }, e.notes), e.tags.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      marginTop: 16,
      flexWrap: 'wrap'
    }
  }, e.tags.map(t => /*#__PURE__*/React.createElement(G_DS.Tag, {
    key: t
  }, t))), share && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(Button, {
    fullWidth: true,
    variant: e.greeting_type === 'respectful_acknowledgment' ? 'secondary' : 'warm',
    icon: e.greeting_type === 'respectful_acknowledgment' ? 'feather' : 'hand-holding-heart',
    onClick: () => onGreet(e)
  }, e.greeting_type === 'respectful_acknowledgment' ? 'Share a respectful note' : 'Create a greeting card')));
}
function GreetingCard({
  e,
  text,
  name,
  style,
  season
}) {
  const plain = style === 'Plain';
  const solemn = e.sensitivity_flag === 'high' || /solemn|reverent/.test(e.greeting_tone);
  const sign = name ? `For ${name}, ${solemn || e.greeting_type === 'respectful_acknowledgment' ? 'with respect' : 'with warmth'} from Safa` : solemn ? 'With respect, from Safa' : 'With warmth, from Safa';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      aspectRatio: '4 / 5',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      background: plain ? solemn ? 'var(--linen-200)' : 'var(--linen-0)' : 'var(--linen-0)',
      border: '1px solid var(--border-subtle)',
      boxShadow: 'var(--shadow-md)',
      display: 'flex',
      flexDirection: 'column'
    }
  }, !plain && /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '0 0 46%',
      background: `url(${window.SafaImageFor(e, season)}) center/cover`
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: plain ? '36px 28px 22px' : '22px 26px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-eyebrow)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color: solemn ? 'var(--text-muted)' : 'var(--text-accent-strong)'
    }
  }, e.event_name), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: `400 ${text.length > 110 ? 16 : plain ? 23 : 20}px/1.45 var(--font-display)`,
      color: 'var(--text-heading)',
      textWrap: 'balance'
    }
  }, text)), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 1,
      background: 'var(--stone-300)',
      margin: '10px 0 12px'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'italic 400 12.5px/1.4 var(--font-serif)',
      color: 'var(--text-muted)'
    }
  }, sign)));
}
function GreetingComposer({
  e,
  season,
  defaultName,
  defaultStyle,
  onClose,
  onShared
}) {
  const {
    Button,
    SegmentedControl,
    TextField,
    IconButton
  } = G_DS;
  const canPhoto = e.visual_card_worthy !== 'no' && e.sensitivity_flag !== 'high';
  const [len, setLen] = React.useState('Short');
  const [name, setName] = React.useState(defaultName || '');
  const [style, setStyle] = React.useState(canPhoto ? defaultStyle : 'Plain');
  const text = len === 'Short' ? e.greeting_short : e.greeting_long;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 70,
      background: 'var(--bg-canvas)',
      display: 'flex',
      flexDirection: 'column',
      animation: 'safaRise var(--dur-slow) var(--ease-settle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '54px 12px 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: "xmark",
    label: "Close",
    onClick: onClose
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 17px/1 var(--font-display)',
      color: 'var(--text-heading)'
    }
  }, e.greeting_type === 'respectful_acknowledgment' ? 'Respectful note' : 'Greeting card'), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '16px 40px 0'
    }
  }, /*#__PURE__*/React.createElement(GreetingCard, {
    e: e,
    text: text,
    name: name.trim(),
    style: style,
    season: season
  }), e.shareable_greeting_applicable === 'conditional' && /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-caption)',
      color: 'var(--text-muted)',
      textAlign: 'center',
      margin: '14px 0 0'
    }
  }, "Best shared with people who mark this day.")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 24px 40px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      borderTop: '1px solid var(--border-subtle)',
      background: 'var(--bg-canvas-soft)',
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(SegmentedControl, {
    options: ['Short', 'Long'],
    value: len,
    onChange: setLen
  })), canPhoto && /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(SegmentedControl, {
    options: ['Photo', 'Plain'],
    value: style,
    onChange: setStyle
  }))), /*#__PURE__*/React.createElement(TextField, {
    value: name,
    onChange: setName,
    placeholder: "Recipient\u2019s first name (optional)"
  }), /*#__PURE__*/React.createElement(Button, {
    fullWidth: true,
    size: "lg",
    variant: e.greeting_type === 'respectful_acknowledgment' ? 'primary' : 'warm',
    icon: "share-from-square",
    onClick: onShared
  }, "Share")));
}
Object.assign(window, {
  ObservanceDetail,
  GreetingCard,
  GreetingComposer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "app/Greeting.jsx", error: String((e && e.message) || e) }); }

// app/OtherScreens.jsx
try { (() => {
const Y_DS = window.SafaDesignSystem_a782c7;
function TraditionPicker({
  value,
  onChange
}) {
  const {
    Tag
  } = Y_DS;
  const list = window.SafaData.traditions.filter(t => !/observance layer|solar terms|natural/.test(t));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8
    }
  }, list.map(t => /*#__PURE__*/React.createElement(Tag, {
    key: t,
    selected: value.includes(t),
    onClick: () => onChange(value.includes(t) ? value.filter(x => x !== t) : [...value, t])
  }, t)));
}
function YouScreen({
  prefs,
  setPrefs,
  onRestart
}) {
  const {
    SegmentedControl,
    Toggle,
    TextField,
    Wordmark,
    Button
  } = Y_DS;
  const D = window.SafaData;
  const row = {
    background: 'var(--surface-card)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 'var(--radius-md)',
    padding: '16px 18px'
  };
  const lab = t => /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-label)',
      color: 'var(--text-heading)',
      margin: '14px 0 2px'
    }
  }, t);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      overflowY: 'auto',
      padding: '62px 24px 40px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '0 0 6px',
      font: 'var(--type-h1)',
      color: 'var(--text-heading)'
    }
  }, "You"), lab('Hemisphere'), /*#__PURE__*/React.createElement(SegmentedControl, {
    options: [{
      value: 'north',
      label: 'Northern'
    }, {
      value: 'south',
      label: 'Southern'
    }],
    value: prefs.hemi,
    onChange: v => setPrefs({
      ...prefs,
      hemi: v
    })
  }), lab('Traditions you observe'), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-caption)',
      color: 'var(--text-muted)',
      marginBottom: 4
    }
  }, "Placed first and marked \u201CYours\u201D. Everything else stays visible."), /*#__PURE__*/React.createElement(TraditionPicker, {
    value: prefs.followed,
    onChange: v => setPrefs({
      ...prefs,
      followed: v
    })
  }), lab('Daily screen'), /*#__PURE__*/React.createElement("div", {
    style: row
  }, /*#__PURE__*/React.createElement(Toggle, {
    checked: prefs.minor,
    onChange: v => setPrefs({
      ...prefs,
      minor: v
    }),
    label: "Include smaller observances",
    description: "Ancient, folklore and regional days"
  })), /*#__PURE__*/React.createElement("div", {
    style: row
  }, /*#__PURE__*/React.createElement(Toggle, {
    checked: prefs.remind,
    onChange: v => setPrefs({
      ...prefs,
      remind: v
    }),
    label: "Morning reminder",
    description: "One silent notification at 7:00"
  })), lab('Greeting cards'), /*#__PURE__*/React.createElement(TextField, {
    value: prefs.name,
    onChange: v => setPrefs({
      ...prefs,
      name: v
    }),
    placeholder: "Your first name",
    hint: "Never required. Used only on cards you share."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    fullWidth: true,
    icon: "rotate-left",
    onClick: onRestart
  }, "See the welcome again")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      paddingTop: 32,
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    size: 24,
    tagline: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-caption)',
      color: 'var(--text-faint)'
    }
  }, D.all.length, " calendar entries \xB7 ", D.traditions.length, " traditions and systems")));
}
function SavedScreen({
  saved,
  journal,
  onOpenDay,
  onOpenEvent
}) {
  const D = window.SafaData;
  const days = Object.keys(saved.days).filter(k => saved.days[k]).sort();
  const events = Object.values(saved.events).filter(Boolean);
  const empty = !days.length && !events.length && !journal.length;
  const sec = t => /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '28px 0 8px'
    }
  }, /*#__PURE__*/React.createElement(SectionHead, null, t));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      overflowY: 'auto',
      padding: '62px 24px 40px',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: 'var(--type-h1)',
      color: 'var(--text-heading)'
    }
  }, "Saved"), empty && /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body)',
      color: 'var(--text-muted)',
      marginTop: 16
    }
  }, "Days, observances and journal entries you keep will rest here."), days.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, sec('Days'), days.map((k, i) => {
    const d = D.day(k);
    const b = window.SafaBlend(d, {});
    return /*#__PURE__*/React.createElement("button", {
      key: k,
      onClick: () => onOpenDay(k),
      style: {
        width: '100%',
        display: 'flex',
        gap: 14,
        alignItems: 'center',
        padding: '14px 0',
        background: 'none',
        border: 'none',
        borderTop: i ? '1px solid var(--border-subtle)' : 'none',
        cursor: 'pointer',
        textAlign: 'left'
      }
    }, /*#__PURE__*/React.createElement(MoonDisc, {
      phase: d.moon.moon_phase_daily,
      size: 28
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        font: '400 17px/1.3 var(--font-display)',
        color: 'var(--text-heading)'
      }
    }, b.theme), /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--type-caption)',
        color: 'var(--text-muted)'
      }
    }, fmtLong(d.date))));
  })), events.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, sec('Observances'), events.map((e, i) => /*#__PURE__*/React.createElement(EventRow, {
    key: e.row_id,
    e: e,
    first: i === 0,
    onOpen: onOpenEvent
  }))), journal.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, sec('Journal'), journal.map((j, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: '14px 0',
      borderTop: i ? '1px solid var(--border-subtle)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-caption)',
      color: 'var(--text-muted)'
    }
  }, fmtLong(D.fromKey(j.k))), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'italic 400 15px/1.5 var(--font-serif)',
      color: 'var(--text-mauve)',
      margin: '6px 0'
    }
  }, j.prompt), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-small)',
      color: 'var(--text-body)'
    }
  }, j.text)))));
}
function Onboarding({
  prefs,
  onDone
}) {
  const {
    Button,
    Wordmark,
    PullQuote,
    SegmentedControl,
    Toggle,
    JourneySteps
  } = Y_DS;
  const [step, setStep] = React.useState(0);
  const [p, setP] = React.useState(prefs);
  const next = () => step < 3 ? setStep(step + 1) : onDone(p);
  const pane = i => ({
    position: 'absolute',
    inset: 0,
    padding: '108px 28px 44px',
    display: 'flex',
    flexDirection: 'column',
    transition: 'opacity var(--dur-slow) var(--ease-calm), transform var(--dur-slow) var(--ease-calm)',
    opacity: step === i ? 1 : 0,
    transform: step === i ? 'none' : `translateY(${step > i ? -12 : 12}px)`,
    pointerEvents: step === i ? 'auto' : 'none'
  });
  const eb = t => /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-eyebrow)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--text-accent-strong)'
    }
  }, t);
  const h = t => /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: 'var(--type-h1)',
      color: 'var(--text-heading)',
      textWrap: 'balance'
    }
  }, t);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 80,
      background: 'var(--bg-canvas)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 70,
      left: 32,
      right: 32,
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement(JourneySteps, {
    steps: ['Welcome', 'Hemisphere', 'Traditions', 'Notification'],
    current: step
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      ...pane(0),
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 44
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    size: 60,
    tagline: true
  }), /*#__PURE__*/React.createElement(PullQuote, {
    size: 18,
    attribution: "The Safa Promise"
  }, "We are not here to change what you believe. We are here to share the beauty of how the world observes time.")), /*#__PURE__*/React.createElement(Button, {
    fullWidth: true,
    size: "lg",
    onClick: next
  }, "Begin"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-caption)',
      color: 'var(--text-muted)',
      marginTop: 14
    }
  }, "No religious affiliation or personal data required.")), /*#__PURE__*/React.createElement("div", {
    style: pane(1)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 16
    }
  }, eb('Hemisphere'), h('Where are you living through the seasons?'), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 12px',
      font: 'var(--type-body)'
    }
  }, "One question, so autumn arrives for you when it actually arrives."), /*#__PURE__*/React.createElement(SegmentedControl, {
    options: [{
      value: 'north',
      label: 'Northern'
    }, {
      value: 'south',
      label: 'Southern'
    }],
    value: p.hemi,
    onChange: v => setP({
      ...p,
      hemi: v
    })
  })), /*#__PURE__*/React.createElement(Button, {
    fullWidth: true,
    size: "lg",
    onClick: next
  }, "Continue")), /*#__PURE__*/React.createElement("div", {
    style: pane(2)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 16,
      minHeight: 0
    }
  }, eb('Optional'), h('Any traditions you observe?'), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 8px',
      font: 'var(--type-body)'
    }
  }, "We\u2019ll place them first. You\u2019ll still see how the rest of the world marks each day."), /*#__PURE__*/React.createElement("div", {
    style: {
      maxHeight: 260,
      overflowY: 'auto'
    }
  }, /*#__PURE__*/React.createElement(TraditionPicker, {
    value: p.followed,
    onChange: v => setP({
      ...p,
      followed: v
    })
  }))), /*#__PURE__*/React.createElement(Button, {
    fullWidth: true,
    size: "lg",
    onClick: next
  }, p.followed.length ? 'Continue' : 'Skip for now')), /*#__PURE__*/React.createElement("div", {
    style: pane(3)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 16
    }
  }, eb('Notification'), h('A single, silent ping each morning.'), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 12px',
      font: 'var(--type-body)'
    }
  }, "Just enough to anchor the start of your day. Nothing more."), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-md)',
      padding: '16px 18px'
    }
  }, /*#__PURE__*/React.createElement(Toggle, {
    checked: p.remind,
    onChange: v => setP({
      ...p,
      remind: v
    }),
    label: "Morning reminder",
    description: "7:00 \xB7 silent"
  }))), /*#__PURE__*/React.createElement(Button, {
    fullWidth: true,
    size: "lg",
    onClick: next
  }, "See today")));
}
Object.assign(window, {
  YouScreen,
  SavedScreen,
  Onboarding,
  TraditionPicker
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "app/OtherScreens.jsx", error: String((e && e.message) || e) }); }

// app/Parts.jsx
try { (() => {
const P_DS = window.SafaDesignSystem_a782c7;
const PHASE = {
  'New Moon': [0, 1],
  'Waxing Crescent': [.25, 1],
  'First Quarter': [.5, 1],
  'Waxing Gibbous': [.78, 1],
  'Full Moon': [1, 1],
  'Waning Gibbous': [.78, -1],
  'Last Quarter': [.5, -1],
  'Waning Crescent': [.25, -1]
};
function MoonDisc({
  phase,
  size = 40,
  hemi = 'north'
}) {
  const [k, dir0] = PHASE[phase] || [.5, 1];
  const dir = hemi === 'south' ? -dir0 : dir0;
  const r = 50,
    rx = Math.abs(1 - 2 * k) * r;
  const d = k >= 1 ? null : k <= 0 ? '' : `M50 0 A50 50 0 0 1 50 100 A${rx} 50 0 0 ${k < .5 ? 0 : 1} 50 0Z`;
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "-2 -2 104 104",
    "aria-label": phase,
    style: {
      flex: 'none',
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "50",
    cy: "50",
    r: "50",
    fill: "var(--stone-400)"
  }), d === null ? /*#__PURE__*/React.createElement("circle", {
    cx: "50",
    cy: "50",
    r: "50",
    fill: "var(--linen-0)"
  }) : d && /*#__PURE__*/React.createElement("path", {
    d: d,
    fill: "var(--linen-0)",
    transform: dir < 0 ? 'translate(100 0) scale(-1 1)' : undefined
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "50",
    cy: "50",
    r: "50",
    fill: "none",
    stroke: "var(--stone-500)",
    strokeWidth: size < 20 ? 6 : 2
  }));
}
function SectionHead({
  children,
  tone = 'terracotta',
  action
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      margin: '0 0 12px'
    }
  }, /*#__PURE__*/React.createElement(P_DS.Eyebrow, {
    tone: tone
  }, children), action);
}
const WD = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
function DateStrip({
  selected,
  onSelect,
  today
}) {
  const D = window.SafaData;
  const sel = D.fromKey(selected);
  const start = new Date(sel);
  start.setDate(sel.getDate() - 3);
  const days = Array.from({
    length: 7
  }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 4
    }
  }, days.map(d => {
    const k = D.key(d);
    const on = k === selected;
    const has = !!D.byDay[k];
    const major = has && D.byDay[k].some(e => e.major);
    return /*#__PURE__*/React.createElement("button", {
      key: k,
      disabled: !has,
      onClick: () => onSelect(k),
      style: {
        flex: 1,
        height: 64,
        border: 'none',
        borderRadius: 999,
        background: on ? 'var(--charcoal-900)' : 'transparent',
        color: on ? 'var(--linen-0)' : has ? 'var(--text-heading)' : 'var(--stone-400)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        cursor: has ? 'pointer' : 'default',
        transition: 'background var(--dur-base) var(--ease-calm)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: '500 10px/1 var(--font-sans)',
        letterSpacing: '.08em',
        opacity: on ? .7 : .55
      }
    }, WD[d.getDay()]), /*#__PURE__*/React.createElement("span", {
      style: {
        font: `${k === today ? 600 : 400} 16px/1 var(--font-sans)`
      }
    }, d.getDate()), /*#__PURE__*/React.createElement("span", {
      style: {
        width: 4,
        height: 4,
        borderRadius: 2,
        background: major ? on ? 'var(--terracotta-300)' : 'var(--terracotta-500)' : 'transparent'
      }
    }));
  }));
}
function Badge({
  children,
  tone = 'neutral'
}) {
  const c = {
    neutral: ['var(--surface-muted)', 'var(--text-muted)'],
    major: ['var(--terracotta-50)', 'var(--terracotta-700)'],
    solemn: ['var(--surface-inverse)', 'var(--linen-100)'],
    yours: ['var(--sage-50)', 'var(--sage-800)']
  }[tone];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 10.5px/1 var(--font-sans)',
      letterSpacing: '.03em',
      padding: '5px 8px',
      borderRadius: 999,
      background: c[0],
      color: c[1],
      whiteSpace: 'nowrap'
    }
  }, children);
}
function EventRow({
  e,
  onOpen,
  followed = [],
  first
}) {
  const D = window.SafaData;
  const cat = D.CAT[e.category] || D.CAT.religion;
  const ri = D.rangeInfo(e);
  return /*#__PURE__*/React.createElement("button", {
    onClick: () => onOpen(e),
    style: {
      width: '100%',
      display: 'flex',
      gap: 14,
      alignItems: 'flex-start',
      padding: '16px 0',
      background: 'none',
      border: 'none',
      borderTop: first ? 'none' : '1px solid var(--border-subtle)',
      textAlign: 'left',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 'none',
      width: 36,
      height: 36,
      borderRadius: '50%',
      background: 'var(--surface-muted)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: `fa-solid fa-${cat.icon}`,
    style: {
      fontSize: 13,
      color: cat.color
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 17px/1.25 var(--font-display)',
      color: 'var(--text-heading)'
    }
  }, e.event_name), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-caption)',
      color: 'var(--text-muted)'
    }
  }, e.tradition_or_system, e.region !== 'Global' ? ` · ${e.region}` : ''), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '400 14px/1.5 var(--font-sans)',
      color: 'var(--text-body)',
      marginTop: 2
    }
  }, e.short_meaning), (e.major || ri || e.date_precision === 'approximate' || followed.includes(e.tradition_or_system) || e.sensitivity_flag === 'high') && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 6,
      marginTop: 6
    }
  }, followed.includes(e.tradition_or_system) && /*#__PURE__*/React.createElement(Badge, {
    tone: "yours"
  }, "Yours"), e.sensitivity_flag === 'high' && /*#__PURE__*/React.createElement(Badge, {
    tone: "solemn"
  }, "Solemn"), e.major && e.sensitivity_flag !== 'high' && /*#__PURE__*/React.createElement(Badge, {
    tone: "major"
  }, "Major observance"), ri && /*#__PURE__*/React.createElement(Badge, null, "Day ", ri.n, " of ", ri.total), e.date_precision === 'approximate' && /*#__PURE__*/React.createElement(Badge, null, "Approximate date"))), /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-chevron-right",
    style: {
      fontSize: 11,
      color: 'var(--stone-400)',
      marginTop: 12
    }
  }));
}
const fmtLong = d => d.toLocaleDateString('en-GB', {
  weekday: 'long',
  day: 'numeric',
  month: 'long'
});
const fmtShort = d => d.toLocaleDateString('en-GB', {
  day: 'numeric',
  month: 'short'
});
Object.assign(window, {
  MoonDisc,
  SectionHead,
  DateStrip,
  Badge,
  EventRow,
  fmtLong,
  fmtShort
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "app/Parts.jsx", error: String((e && e.message) || e) }); }

// app/TodayScreen.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const T_DS = window.SafaDesignSystem_a782c7;
function TodayScreen({
  dayKey,
  setDayKey,
  todayKey,
  prefs,
  tweaks,
  onOpenEvent,
  onGreet,
  saved,
  onSave,
  onJournal
}) {
  const {
    IconButton,
    PracticeItem,
    ReflectPrompt,
    Tag,
    Button
  } = T_DS;
  const D = window.SafaData;
  const day = D.day(dayKey);
  const b = window.SafaBlend(day, {
    hemi: prefs.hemi,
    followed: prefs.followed,
    minor: prefs.minor
  });
  const [done, setDone] = React.useState({});
  const ref = React.useRef(null);
  React.useEffect(() => {
    setDone({});
    ref.current && (ref.current.scrollTop = 0);
  }, [dayKey]);
  const step = n => {
    const d = D.fromKey(dayKey);
    d.setDate(d.getDate() + n);
    const k = D.key(d);
    if (D.byDay[k]) setDayKey(k);
  };
  const greet = b.greetable.find(e => e.visual_card_worthy === 'yes') || b.greetable[0];
  const upcoming = React.useMemo(() => D.days.filter(k => k > dayKey && D.byDay[k].some(e => e.major)).slice(0, 3).map(k => ({
    k,
    e: D.byDay[k].find(e => e.major)
  })), [dayKey]);
  const hemiLabel = prefs.hemi === 'south' ? 'Southern Hemisphere' : 'Northern Hemisphere';
  const moonHero = tweaks.hero === 'Moon';
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      height: '100%',
      overflowY: 'auto',
      overflowX: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '58px 20px 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      paddingLeft: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-caption)',
      color: 'var(--text-muted)'
    }
  }, dayKey === todayKey ? 'Today' : day.date.toLocaleDateString('en-GB', {
    weekday: 'long'
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 22px/1.1 var(--font-display)',
      color: 'var(--text-heading)'
    }
  }, day.date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: dayKey.slice(0, 4) !== todayKey.slice(0, 4) ? 'numeric' : undefined
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 2
    }
  }, dayKey !== todayKey && /*#__PURE__*/React.createElement(IconButton, {
    icon: "rotate-left",
    label: "Back to today",
    onClick: () => setDayKey(todayKey)
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: "bookmark",
    label: saved ? 'Saved' : 'Save day',
    active: saved,
    onClick: onSave
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 16px 0'
    }
  }, /*#__PURE__*/React.createElement(DateStrip, {
    selected: dayKey,
    onSelect: setDayKey,
    today: todayKey
  })), /*#__PURE__*/React.createElement("div", {
    key: dayKey,
    style: {
      padding: '22px 24px 40px',
      animation: 'safaFade var(--dur-slow) var(--ease-calm)'
    }
  }, moonHero ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '18px 0 26px',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(MoonDisc, {
    phase: day.moon.moon_phase_daily,
    size: 132,
    hemi: prefs.hemi
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-caption)',
      color: 'var(--text-muted)',
      letterSpacing: '.04em'
    }
  }, day.moon.moon_phase_daily, " \xB7 ", b.season)) : /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 210,
      borderRadius: 'var(--radius-lg)',
      background: `url(${b.image}) center/cover`,
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 12,
      bottom: 12,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '6px 12px 6px 6px',
      borderRadius: 999,
      background: 'color-mix(in oklch, var(--linen-0) 86%, transparent)',
      backdropFilter: 'blur(10px)'
    }
  }, /*#__PURE__*/React.createElement(MoonDisc, {
    phase: day.moon.moon_phase_daily,
    size: 22,
    hemi: prefs.hemi
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 12px/1 var(--font-sans)',
      color: 'var(--text-heading)'
    }
  }, day.moon.moon_phase_daily))), /*#__PURE__*/React.createElement(T_DS.Eyebrow, {
    tone: b.solemn ? 'muted' : 'terracotta'
  }, b.type), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '10px 0 14px',
      font: '500 32px/1.12 var(--font-display)',
      color: 'var(--text-heading)',
      letterSpacing: '-.01em',
      textWrap: 'balance'
    }
  }, b.theme), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: 'italic 400 17px/1.7 var(--font-serif)',
      color: 'var(--text-body)',
      textWrap: 'pretty'
    }
  }, b.blend), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 10,
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-md)',
      padding: 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(MoonDisc, {
    phase: day.moon.moon_phase_daily,
    size: 30,
    hemi: prefs.hemi
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 14px/1.3 var(--font-sans)',
      color: 'var(--text-heading)'
    }
  }, day.moon.moon_phase_daily), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-caption)',
      color: 'var(--text-muted)',
      marginTop: 2
    }
  }, day.moon.is_moon_phase_transition === 'yes' ? 'Phase begins today' : 'Lunar cycle'))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-sage)',
      border: '1px solid var(--sage-100)',
      borderRadius: 'var(--radius-md)',
      padding: 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 30,
      height: 30,
      borderRadius: '50%',
      background: 'var(--sage-100)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: `fa-solid fa-${b.solar ? 'sun' : 'leaf'}`,
    style: {
      fontSize: 13,
      color: 'var(--sage-700)'
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 14px/1.3 var(--font-sans)',
      color: 'var(--text-heading)'
    }
  }, b.solar || b.season), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-caption)',
      color: 'var(--text-muted)',
      marginTop: 2
    }
  }, b.solar ? `${b.season} · ` : '', hemiLabel)))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 36
    }
  }), /*#__PURE__*/React.createElement(SectionHead, null, "What Shapes Today"), b.events.length ? b.events.map((e, i) => /*#__PURE__*/React.createElement(EventRow, {
    key: e.row_id,
    e: e,
    first: i === 0,
    onOpen: onOpenEvent,
    followed: prefs.followed
  })) : /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 20px',
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-muted)',
      font: 'var(--type-small)',
      color: 'var(--text-body)'
    }
  }, "A quiet day. Only the moon and the season are moving. Tone: stillness and consistency."), greet && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 32
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => onGreet(greet),
    style: {
      width: '100%',
      display: 'flex',
      gap: 14,
      alignItems: 'center',
      padding: 12,
      background: greet.sensitivity_flag === 'high' ? 'var(--surface-muted)' : 'var(--surface-terracotta)',
      border: '1px solid var(--terracotta-100)',
      borderRadius: 'var(--radius-lg)',
      cursor: 'pointer',
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 'none',
      width: 64,
      height: 76,
      borderRadius: 'var(--radius-md)',
      background: greet.sensitivity_flag === 'high' ? 'var(--linen-0)' : `url(${window.SafaImageFor(greet, b.season)}) center/cover`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, greet.sensitivity_flag === 'high' && /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-feather",
    style: {
      color: 'var(--stone-500)'
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-eyebrow)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--text-accent-strong)'
    }
  }, greet.greeting_type === 'respectful_acknowledgment' ? 'Share respectfully' : 'Send a greeting'), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '400 15px/1.45 var(--font-display)',
      color: 'var(--text-heading)'
    }
  }, greet.greeting_short)), /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-arrow-right",
    style: {
      fontSize: 13,
      color: 'var(--terracotta-600)',
      marginRight: 6
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 36
    }
  }), /*#__PURE__*/React.createElement(SectionHead, null, "Practice Today"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, b.practice.map((p, i) => /*#__PURE__*/React.createElement(PracticeItem, _extends({
    key: i
  }, p, {
    done: !!done[i],
    onToggle: v => setDone({
      ...done,
      [i]: v
    })
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 32
    }
  }), /*#__PURE__*/React.createElement(ReflectPrompt, {
    prompt: b.reflect,
    action: "Write in your journal",
    onAction: () => onJournal(b.reflect)
  }), upcoming.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 36
    }
  }), /*#__PURE__*/React.createElement(SectionHead, {
    tone: "sage"
  }, "Coming Up"), upcoming.map(({
    k,
    e
  }, i) => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => setDayKey(k),
    style: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '13px 0',
      background: 'none',
      border: 'none',
      borderTop: i ? '1px solid var(--border-subtle)' : 'none',
      cursor: 'pointer',
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 52,
      font: '500 12px/1.2 var(--font-sans)',
      color: 'var(--text-muted)'
    }
  }, fmtShort(D.fromKey(k))), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      font: '400 16px/1.3 var(--font-display)',
      color: 'var(--text-heading)'
    }
  }, e.event_name), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-caption)',
      color: 'var(--text-faint)'
    }
  }, e.tradition_or_system)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    fullWidth: true,
    icon: "chevron-left",
    onClick: () => step(-1)
  }, "Previous"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    fullWidth: true,
    iconRight: "chevron-right",
    onClick: () => step(1)
  }, "Next day"))));
}
window.TodayScreen = TodayScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "app/TodayScreen.jsx", error: String((e && e.message) || e) }); }

// app/content.js
try { (() => {
// Safa editorial layer: turns calendar rows into a daily blend.
(function () {
  const IMG = '../assets/imagery/';
  const THEME = {
    celebration: 'A day for shared joy',
    devotion: 'A day of devotion and attention',
    gratitude: 'A day to give thanks',
    renewal: 'A day of renewal',
    release: 'What is ready to be released',
    reflection: 'A day for honest reflection',
    remembrance: 'A day of remembrance',
    grounding: 'A day of quiet grounding',
    transition: 'A day between phases',
    cleansing: 'A day to clear space',
    harvest: 'A day to gather in',
    balance: 'A day of balance',
    planting: 'A day to plant'
  };
  const PRACTICE = {
    celebration: [['Share a meal or a sweet with someone', 'Connection'], ['Send one warm message', 'Connection', '2 min']],
    devotion: [['Light a candle and sit for five minutes', 'Spirit', '5 min'], ['Read one passage slowly', 'Learning']],
    gratitude: [['Write down three things you are thankful for', 'Reflection', '3 min'], ['Thank someone by name', 'Connection']],
    renewal: [['Open the windows and let fresh air in', 'Home & body'], ['Begin one small thing you have postponed', 'Intention']],
    release: [['Write and release one emotional burden', 'Reflection', '5 min'], ['Give away one thing you no longer use', 'Home']],
    reflection: [['Take a slow walk without your phone', 'Body', '15 min'], ['Write a few honest lines', 'Reflection', '5 min']],
    remembrance: [['Slow your pace', 'Body'], ['Remember someone by name', 'Reflection']],
    grounding: [['Spend ten quiet minutes outside', 'Nature', '10 min'], ['Make one nourishing choice for your body', 'Home & body']],
    transition: [['Tend to one corner of your home', 'Home & body', '15 min'], ['Notice what is changing in the light', 'Nature']],
    cleansing: [['Clear one room or drawer', 'Home & body', '20 min'], ['Drink water slowly, before coffee', 'Body']],
    harvest: [['Cook with something in season', 'Nature'], ['Gather seeds or cuttings to keep', 'Garden']],
    balance: [['Divide the day evenly between work and rest', 'Body'], ['Sit for a minute at dusk', 'Nature', '1 min']],
    planting: [['Sow or repot one plant', 'Garden', '10 min'], ['Check the soil before watering', 'Garden']]
  };
  const REFLECT = {
    celebration: 'Who would I like to celebrate with, and have I told them?',
    devotion: 'What do I give my full attention to?',
    gratitude: 'What am I grateful for that I usually overlook?',
    renewal: 'What would I like to begin again?',
    release: 'What truth has become too visible to ignore?',
    reflection: 'What do I notice when life is not demanding my reaction?',
    remembrance: 'Who or what would I like to remember today?',
    grounding: 'What helps me feel steady?',
    transition: 'What am I moving out of, and what am I moving into?',
    cleansing: 'What can I let settle today?',
    harvest: 'What have I gathered this season?',
    balance: 'Where would I like a little more balance?',
    planting: 'What small thing am I willing to tend?'
  };
  const SEASON_IMG = {
    Summer: ['terrace-dining', 'leaf-shadow', 'terrace-lounge'],
    Autumn: ['clay-tagine', 'olive-shadow-wall', 'terracotta-room'],
    Winter: ['candle-pinecone', 'linen-interior', 'oat-room'],
    Spring: ['sage-leaves', 'soil-shears', 'hallway-mural']
  };
  const hash = s => [...s].reduce((a, c) => a * 31 + c.charCodeAt(0) >>> 0, 7);
  function weightTags(day) {
    const w = {};
    day.list.forEach(e => {
      const k = e.isMoon ? 1 : e.major ? 4 : 2;
      e.tags.forEach((t, i) => w[t] = (w[t] || 0) + k * (i === 0 ? 1.2 : 1));
    });
    if (day.moon && day.moon.moon_phase_daily === 'Full Moon') w.release = (w.release || 0) + 3;
    if (day.moon && day.moon.moon_phase_daily === 'New Moon') w.renewal = (w.renewal || 0) + 3;
    const solemn = day.events.find(e => e.sensitivity_flag === 'high');
    if (solemn) solemn.tags.forEach(t => w[t] = (w[t] || 0) + 10);
    return Object.entries(w).sort((a, b) => b[1] - a[1]).map(x => x[0]);
  }
  function rank(events, followed) {
    return [...events].sort((a, b) => followed.includes(b.tradition_or_system) - followed.includes(a.tradition_or_system) || b.major - a.major || (b.sensitivity_flag === 'high') - (a.sensitivity_flag === 'high'));
  }
  window.SafaBlend = function (day, {
    hemi = 'north',
    followed = [],
    minor = true
  } = {}) {
    const season = hemi === 'south' ? day.moon.season_hemisphere_south : day.moon.season_hemisphere_north;
    let events = rank(day.events, followed);
    if (!minor) events = events.filter(e => e.major || followed.includes(e.tradition_or_system) || e.event_type === 'solar_term');
    const tags = weightTags({
      ...day,
      events,
      list: [day.moon, ...events]
    });
    const top = tags[0] || 'grounding';
    const lead = events[0];
    const solemn = events.find(e => e.sensitivity_flag === 'high');
    const solar = day.list.find(e => /Solstice|Equinox/.test(e.solar_context))?.solar_context;
    const type = solemn ? 'Sacred day' : events.some(e => e.major) ? 'Observance day' : day.moon.is_moon_phase_transition === 'yes' ? 'Moon day' : events.length ? 'Gentle day' : 'Quiet day';
    let blend;
    if (!events.length) blend = `No major observance falls today. ${day.moon.short_meaning} Every day holds a subtle rhythm, even the quiet ones.`;else {
      const others = events.slice(1, 3).map(e => e.event_name);
      blend = `${(solemn || lead).short_meaning}${others.length ? ` Also marked today: ${others.join(' and ')}.` : ''} ${day.moon.short_meaning}`;
    }
    const imgs = SEASON_IMG[season] || SEASON_IMG.Autumn;
    const image = IMG + (day.moon.moon_phase_daily === 'Full Moon' ? 'moonrise' : solemn ? 'lamp-plinth' : imgs[hash(day.key) % imgs.length]) + '.jpg';
    const practice = [...(PRACTICE[top] || []), ...(PRACTICE[tags[1]] || PRACTICE.grounding)].slice(0, 3).map(([title, category, duration]) => ({
      title,
      category,
      duration
    }));
    const greetable = events.filter(e => e.shareable_greeting_applicable !== 'no');
    return {
      theme: THEME[top],
      top,
      tags,
      blend,
      season,
      solar,
      type,
      events,
      solemn,
      image,
      practice,
      reflect: REFLECT[top],
      greetable
    };
  };
  window.SafaImageFor = function (e, season) {
    if (e.sensitivity_flag === 'high') return IMG + 'lamp-plinth.jpg';
    const imgs = SEASON_IMG[season] || SEASON_IMG.Autumn;
    return IMG + imgs[hash(e.event_name) % imgs.length] + '.jpg';
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "app/content.js", error: String((e && e.message) || e) }); }

// app/data.js
try { (() => {
// Loads and indexes the Safa master calendar CSV (June 2026 – June 2027).
(function () {
  function parse(s) {
    const rows = [];
    let r = [],
      f = '',
      q = false;
    for (let i = 0; i < s.length; i++) {
      const c = s[i];
      if (q) {
        if (c === '"') {
          if (s[i + 1] === '"') {
            f += '"';
            i++;
          } else q = false;
        } else f += c;
      } else if (c === '"') q = true;else if (c === ',') {
        r.push(f);
        f = '';
      } else if (c === '\n') {
        r.push(f);
        rows.push(r);
        r = [];
        f = '';
      } else if (c !== '\r') f += c;
    }
    if (f || r.length) {
      r.push(f);
      rows.push(r);
    }
    return rows;
  }
  const pad = n => String(n).padStart(2, '0');
  const key = d => `${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(d.getDate())}`;
  const fromKey = k => {
    const [y, m, d] = k.split('/').map(Number);
    return new Date(y, m - 1, d);
  };
  const CAT = {
    religion: {
      label: 'Faith',
      color: 'var(--terracotta-500)',
      icon: 'star'
    },
    natural_cycle: {
      label: 'Moon',
      color: 'var(--mauve-500)',
      icon: 'moon'
    },
    seasonal_system: {
      label: 'Season',
      color: 'var(--sage-500)',
      icon: 'leaf'
    },
    ancient_tradition: {
      label: 'Ancient',
      color: 'var(--stone-500)',
      icon: 'landmark'
    },
    folklore: {
      label: 'Folklore',
      color: 'var(--sage-700)',
      icon: 'feather'
    },
    indigenous_tradition: {
      label: 'Indigenous',
      color: 'var(--terracotta-700)',
      icon: 'seedling'
    }
  };
  window.SafaData = {
    CAT,
    key,
    fromKey,
    async load(url) {
      const text = await (await fetch(url)).text();
      const rows = parse(text);
      const h = rows[0];
      const all = rows.slice(1).filter(r => r.length > 5).map(r => {
        const o = Object.fromEntries(h.map((k, i) => [k, (r[i] || '').trim()]));
        o.tags = o.practical_theme_tags.split(',').map(s => s.trim()).filter(Boolean);
        o.major = o.is_major_observance === 'yes';
        o.isMoon = o.event_type === 'moon_phase';
        return o;
      });
      const byDay = {};
      all.forEach(e => (byDay[e.gregorian_date] = byDay[e.gregorian_date] || []).push(e));
      const days = Object.keys(byDay).sort();
      const traditions = [...new Set(all.filter(e => !e.isMoon).map(e => e.tradition_or_system))].sort();
      this.all = all;
      this.byDay = byDay;
      this.days = days;
      this.traditions = traditions;
      this.first = days[0];
      this.last = days[days.length - 1];
      return this;
    },
    day(k) {
      const list = this.byDay[k] || [];
      const moon = list.find(e => e.isMoon) || list[0];
      const events = list.filter(e => !e.isMoon);
      return {
        key: k,
        date: fromKey(k),
        moon,
        events,
        list
      };
    },
    // range info: "Day 7 of 9"
    rangeInfo(e) {
      if (e.single_day_or_range !== 'range' || !e.range_start) return null;
      const s = fromKey(e.range_start),
        en = fromKey(e.range_end),
        d = fromKey(e.gregorian_date);
      const total = Math.round((en - s) / 864e5) + 1,
        n = Math.round((d - s) / 864e5) + 1;
      return {
        n,
        total
      };
    }
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "app/data.js", error: String((e && e.message) || e) }); }

// app/ios-frame.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
// Copied omelette starter. Re-running copy_starter_component with this kind overwrites this file with the latest version (page content is unaffected).

/* BEGIN USAGE */
// iOS.jsx — Simplified iOS 26 (Liquid Glass) device frame
// Based on the iOS 26 UI Kit + Figma status bar spec. No assets, no deps.
// Exports (to window): IOSDevice, IOSStatusBar, IOSNavBar, IOSGlassPill, IOSList, IOSListRow, IOSKeyboard
//
// Usage — wrap your screen content in <IOSDevice> to get the bezel, status bar
// and home indicator (props: title, dark, keyboard):
//
//   <IOSDevice title="Settings">
//     ...your screen content...
//   </IOSDevice>
//   <IOSDevice dark title="Search" keyboard>…</IOSDevice>
/* END USAGE */

// ─────────────────────────────────────────────────────────────
// Status bar
// ─────────────────────────────────────────────────────────────
function IOSStatusBar({
  dark = false,
  time = '9:41'
}) {
  const c = dark ? '#fff' : '#000';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 154,
      alignItems: 'center',
      justifyContent: 'center',
      padding: '21px 24px 19px',
      boxSizing: 'border-box',
      position: 'relative',
      zIndex: 20,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 22,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 1.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: '-apple-system, "SF Pro", system-ui',
      fontWeight: 590,
      fontSize: 17,
      lineHeight: '22px',
      color: c
    }
  }, time)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 22,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 7,
      paddingTop: 1,
      paddingRight: 1
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "19",
    height: "12",
    viewBox: "0 0 19 12"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "7.5",
    width: "3.2",
    height: "4.5",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "4.8",
    y: "5",
    width: "3.2",
    height: "7",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9.6",
    y: "2.5",
    width: "3.2",
    height: "9.5",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14.4",
    y: "0",
    width: "3.2",
    height: "12",
    rx: "0.7",
    fill: c
  })), /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "12",
    viewBox: "0 0 17 12"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8.5 3.2C10.8 3.2 12.9 4.1 14.4 5.6L15.5 4.5C13.7 2.7 11.2 1.5 8.5 1.5C5.8 1.5 3.3 2.7 1.5 4.5L2.6 5.6C4.1 4.1 6.2 3.2 8.5 3.2Z",
    fill: c
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.5 6.8C9.9 6.8 11.1 7.3 12 8.2L13.1 7.1C11.8 5.9 10.2 5.1 8.5 5.1C6.8 5.1 5.2 5.9 3.9 7.1L5 8.2C5.9 7.3 7.1 6.8 8.5 6.8Z",
    fill: c
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "8.5",
    cy: "10.5",
    r: "1.5",
    fill: c
  })), /*#__PURE__*/React.createElement("svg", {
    width: "27",
    height: "13",
    viewBox: "0 0 27 13"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0.5",
    y: "0.5",
    width: "23",
    height: "12",
    rx: "3.5",
    stroke: c,
    strokeOpacity: "0.35",
    fill: "none"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "2",
    width: "20",
    height: "9",
    rx: "2",
    fill: c
  }), /*#__PURE__*/React.createElement("path", {
    d: "M25 4.5V8.5C25.8 8.2 26.5 7.2 26.5 6.5C26.5 5.8 25.8 4.8 25 4.5Z",
    fill: c,
    fillOpacity: "0.4"
  }))));
}

// ─────────────────────────────────────────────────────────────
// Liquid glass pill — blur + tint + shine
// ─────────────────────────────────────────────────────────────
function IOSGlassPill({
  children,
  dark = false,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 44,
      minWidth: 44,
      borderRadius: 9999,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: dark ? '0 2px 6px rgba(0,0,0,0.35), 0 6px 16px rgba(0,0,0,0.2)' : '0 1px 3px rgba(0,0,0,0.07), 0 3px 10px rgba(0,0,0,0.06)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 9999,
      backdropFilter: 'blur(12px) saturate(180%)',
      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      background: dark ? 'rgba(120,120,128,0.28)' : 'rgba(255,255,255,0.5)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 9999,
      boxShadow: dark ? 'inset 1.5px 1.5px 1px rgba(255,255,255,0.15), inset -1px -1px 1px rgba(255,255,255,0.08)' : 'inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)',
      border: dark ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0,0,0,0.06)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      alignItems: 'center',
      padding: '0 4px'
    }
  }, children));
}

// ─────────────────────────────────────────────────────────────
// Navigation bar — glass pills + large title
// ─────────────────────────────────────────────────────────────
function IOSNavBar({
  title = 'Title',
  dark = false,
  trailingIcon = true
}) {
  const muted = dark ? 'rgba(255,255,255,0.6)' : '#404040';
  const text = dark ? '#fff' : '#000';
  const pillIcon = content => /*#__PURE__*/React.createElement(IOSGlassPill, {
    dark: dark
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, content));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      paddingTop: 62,
      paddingBottom: 10,
      position: 'relative',
      zIndex: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px'
    }
  }, pillIcon(/*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "20",
    viewBox: "0 0 12 20",
    fill: "none",
    style: {
      marginLeft: -1
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M10 2L2 10l8 8",
    stroke: muted,
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), trailingIcon && pillIcon(/*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "6",
    viewBox: "0 0 22 6"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "3",
    cy: "3",
    r: "2.5",
    fill: muted
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "3",
    r: "2.5",
    fill: muted
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "19",
    cy: "3",
    r: "2.5",
    fill: muted
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px',
      fontFamily: '-apple-system, system-ui',
      fontSize: 34,
      fontWeight: 700,
      lineHeight: '41px',
      color: text,
      letterSpacing: 0.4
    }
  }, title));
}

// ─────────────────────────────────────────────────────────────
// Grouped list (inset card, r:26) + row (52px)
// ─────────────────────────────────────────────────────────────
function IOSListRow({
  title,
  detail,
  icon,
  chevron = true,
  isLast = false,
  dark = false
}) {
  const text = dark ? '#fff' : '#000';
  const sec = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const ter = dark ? 'rgba(235,235,245,0.3)' : 'rgba(60,60,67,0.3)';
  const sep = dark ? 'rgba(84,84,88,0.65)' : 'rgba(60,60,67,0.12)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      minHeight: 52,
      padding: '0 16px',
      position: 'relative',
      fontFamily: '-apple-system, system-ui',
      fontSize: 17,
      letterSpacing: -0.43
    }
  }, icon && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 7,
      background: icon,
      marginRight: 12,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      color: text
    }
  }, title), detail && /*#__PURE__*/React.createElement("span", {
    style: {
      color: sec,
      marginRight: 6
    }
  }, detail), chevron && /*#__PURE__*/React.createElement("svg", {
    width: "8",
    height: "14",
    viewBox: "0 0 8 14",
    style: {
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1 1l6 6-6 6",
    stroke: ter,
    strokeWidth: "2",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })), !isLast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: icon ? 58 : 16,
      height: 0.5,
      background: sep
    }
  }));
}
function IOSList({
  header,
  children,
  dark = false
}) {
  const hc = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const bg = dark ? '#1C1C1E' : '#fff';
  return /*#__PURE__*/React.createElement("div", null, header && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '-apple-system, system-ui',
      fontSize: 13,
      color: hc,
      textTransform: 'uppercase',
      padding: '8px 36px 6px',
      letterSpacing: -0.08
    }
  }, header), /*#__PURE__*/React.createElement("div", {
    style: {
      background: bg,
      borderRadius: 26,
      margin: '0 16px',
      overflow: 'hidden'
    }
  }, children));
}

// ─────────────────────────────────────────────────────────────
// Device frame
// ─────────────────────────────────────────────────────────────
function IOSDevice({
  children,
  width = 402,
  height = 874,
  dark = false,
  title,
  keyboard = false
}) {
  return (
    /*#__PURE__*/
    // data-om-starter: inert presence marker — Claude Design's starter-usage
    // probe reads it; it renders nothing. Keep it on this root element.
    React.createElement("div", {
      "data-om-starter": "ios-frame",
      style: {
        width,
        height,
        borderRadius: 48,
        overflow: 'hidden',
        position: 'relative',
        background: dark ? '#000' : '#F2F2F7',
        boxShadow: '0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.12)',
        fontFamily: '-apple-system, system-ui, sans-serif',
        WebkitFontSmoothing: 'antialiased'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: 11,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 126,
        height: 37,
        borderRadius: 24,
        background: '#000',
        zIndex: 50
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10
      }
    }, /*#__PURE__*/React.createElement(IOSStatusBar, {
      dark: dark
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }
    }, title !== undefined && /*#__PURE__*/React.createElement(IOSNavBar, {
      title: title,
      dark: dark
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        overflow: 'auto'
      }
    }, children), keyboard && /*#__PURE__*/React.createElement(IOSKeyboard, {
      dark: dark
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 60,
        height: 34,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingBottom: 8,
        pointerEvents: 'none'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 139,
        height: 5,
        borderRadius: 100,
        background: dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.25)'
      }
    })))
  );
}

// ─────────────────────────────────────────────────────────────
// Keyboard — iOS 26 liquid glass
// ─────────────────────────────────────────────────────────────
function IOSKeyboard({
  dark = false
}) {
  const glyph = dark ? 'rgba(255,255,255,0.7)' : '#595959';
  const sugg = dark ? 'rgba(255,255,255,0.6)' : '#333';
  const keyBg = dark ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.85)';

  // special-key icons
  const icons = {
    shift: /*#__PURE__*/React.createElement("svg", {
      width: "19",
      height: "17",
      viewBox: "0 0 19 17"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M9.5 1L1 9.5h4.5V16h8V9.5H18L9.5 1z",
      fill: glyph
    })),
    del: /*#__PURE__*/React.createElement("svg", {
      width: "23",
      height: "17",
      viewBox: "0 0 23 17"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M7 1h13a2 2 0 012 2v11a2 2 0 01-2 2H7l-6-7.5L7 1z",
      fill: "none",
      stroke: glyph,
      strokeWidth: "1.6",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M10 5l7 7M17 5l-7 7",
      stroke: glyph,
      strokeWidth: "1.6",
      strokeLinecap: "round"
    })),
    ret: /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "14",
      viewBox: "0 0 20 14"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M18 1v6H4m0 0l4-4M4 7l4 4",
      fill: "none",
      stroke: "#fff",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }))
  };
  const key = (content, {
    w,
    flex,
    ret,
    fs = 25,
    k
  } = {}) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      height: 42,
      borderRadius: 8.5,
      flex: flex ? 1 : undefined,
      width: w,
      minWidth: 0,
      background: ret ? '#08f' : keyBg,
      boxShadow: '0 1px 0 rgba(0,0,0,0.075)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, "SF Compact", system-ui',
      fontSize: fs,
      fontWeight: 458,
      color: ret ? '#fff' : glyph
    }
  }, content);
  const row = (keys, pad = 0) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6.5,
      justifyContent: 'center',
      padding: `0 ${pad}px`
    }
  }, keys.map(l => key(l, {
    flex: true,
    k: l
  })));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 15,
      borderRadius: 27,
      overflow: 'hidden',
      padding: '11px 0 2px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxShadow: dark ? '0 -2px 20px rgba(0,0,0,0.09)' : '0 -1px 6px rgba(0,0,0,0.018), 0 -3px 20px rgba(0,0,0,0.012)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 27,
      backdropFilter: 'blur(12px) saturate(180%)',
      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      background: dark ? 'rgba(120,120,128,0.14)' : 'rgba(255,255,255,0.25)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 27,
      boxShadow: dark ? 'inset 1.5px 1.5px 1px rgba(255,255,255,0.15)' : 'inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)',
      border: dark ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0,0,0,0.06)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 20,
      alignItems: 'center',
      padding: '8px 22px 13px',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative'
    }
  }, ['"The"', 'the', 'to'].map((w, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, i > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 25,
      background: '#ccc',
      opacity: 0.3
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      textAlign: 'center',
      fontFamily: '-apple-system, system-ui',
      fontSize: 17,
      color: sugg,
      letterSpacing: -0.43,
      lineHeight: '22px'
    }
  }, w)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 13,
      padding: '0 6.5px',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative'
    }
  }, row(['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']), row(['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'], 20), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14.25,
      alignItems: 'center'
    }
  }, key(icons.shift, {
    w: 45,
    k: 'shift'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6.5,
      flex: 1
    }
  }, ['z', 'x', 'c', 'v', 'b', 'n', 'm'].map(l => key(l, {
    flex: true,
    k: l
  }))), key(icons.del, {
    w: 45,
    k: 'del'
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      alignItems: 'center'
    }
  }, key('ABC', {
    w: 92.25,
    fs: 18,
    k: 'abc'
  }), key('', {
    flex: true,
    k: 'space'
  }), key(icons.ret, {
    w: 92.25,
    ret: true,
    k: 'ret'
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 56,
      width: '100%',
      position: 'relative'
    }
  }));
}
Object.assign(window, {
  IOSDevice,
  IOSStatusBar,
  IOSNavBar,
  IOSGlassPill,
  IOSList,
  IOSListRow,
  IOSKeyboard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "app/ios-frame.jsx", error: String((e && e.message) || e) }); }

// app/tweaks-panel.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
// Copied omelette starter. Re-running copy_starter_component with this kind overwrites this file with the latest version (page content is unaffected).

/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  // data-om-starter: inert presence marker — Claude Design's starter-usage
  // probe reads it. The closed panel renders nothing, so the marker rides
  // the <html> element as an attribute instead of a rendered node — zero
  // elements added, so page CSS (even structural selectors like
  // :nth-child) can never observe it. It records that the page WIRES a
  // tweaks panel, whether or not the panel is open. Keep this effect.
  React.useEffect(() => {
    document.documentElement.setAttribute('data-om-starter', 'tweaks-panel');
    return () => document.documentElement.removeAttribute('data-om-starter');
  }, []);
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "app/tweaks-panel.jsx", error: String((e && e.message) || e) }); }

// components/almanac/BlendHero.jsx
try { (() => {
function BlendHero({
  date,
  theme,
  blend,
  image,
  cues = []
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, image && /*#__PURE__*/React.createElement("div", {
    style: {
      height: 200,
      borderRadius: 'var(--radius-lg)',
      background: `url(${image}) center/cover`
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-caption)',
      color: 'var(--text-muted)',
      letterSpacing: '.02em'
    }
  }, date), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: '500 34px/1.12 var(--font-display)',
      color: 'var(--text-heading)',
      letterSpacing: '-.01em',
      textWrap: 'balance'
    }
  }, theme), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: 'var(--type-blend)',
      color: 'var(--text-body)',
      textWrap: 'pretty'
    }
  }, blend), cues.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8
    }
  }, cues.map((c, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      font: '500 12px/1 var(--font-sans)',
      color: 'var(--text-muted)',
      padding: '7px 12px',
      borderRadius: 999,
      border: '1px solid var(--border-subtle)',
      background: 'var(--surface-card)'
    }
  }, c))));
}
Object.assign(__ds_scope, { BlendHero });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/almanac/BlendHero.jsx", error: String((e && e.message) || e) }); }

// components/almanac/JourneySteps.jsx
try { (() => {
function JourneySteps({
  steps = [],
  current = 0
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 0,
      width: '100%'
    }
  }, steps.map((s, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, i > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      height: 2,
      background: i <= current ? 'var(--sage-300)' : 'var(--linen-300)',
      transition: 'background var(--dur-slow) var(--ease-calm)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    title: s,
    style: {
      flex: 'none',
      width: 14,
      height: 14,
      borderRadius: '50%',
      border: '2px solid var(--sage-500)',
      background: i < current ? 'var(--sage-500)' : i === current ? 'var(--surface-card)' : 'transparent',
      opacity: i > current ? .45 : 1,
      transition: 'all var(--dur-slow) var(--ease-calm)'
    }
  }))));
}
Object.assign(__ds_scope, { JourneySteps });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/almanac/JourneySteps.jsx", error: String((e && e.message) || e) }); }

// components/almanac/ReflectPrompt.jsx
try { (() => {
function ReflectPrompt({
  label = 'Reflect',
  prompt,
  action = 'Write',
  onAction
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '28px 24px',
      borderRadius: 'var(--radius-lg)',
      background: 'var(--surface-mauve)',
      border: '1px solid var(--mauve-100)',
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-eyebrow)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--text-mauve)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'italic 400 21px/1.5 var(--font-serif)',
      color: 'var(--text-heading)',
      textWrap: 'pretty'
    }
  }, prompt), onAction && /*#__PURE__*/React.createElement("button", {
    onClick: onAction,
    style: {
      alignSelf: 'flex-start',
      marginTop: 4,
      background: 'none',
      border: 'none',
      padding: 0,
      font: '500 14px/1 var(--font-sans)',
      color: 'var(--text-mauve)',
      cursor: 'pointer',
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }
  }, action, " ", /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-arrow-right",
    style: {
      fontSize: 12
    }
  })));
}
Object.assign(__ds_scope, { ReflectPrompt });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/almanac/ReflectPrompt.jsx", error: String((e && e.message) || e) }); }

// components/almanac/ShapesList.jsx
try { (() => {
const TONE = {
  moon: 'var(--mauve-500)',
  observance: 'var(--terracotta-500)',
  season: 'var(--sage-500)',
  nature: 'var(--sage-600)'
};
function ShapesList({
  items = []
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: 14,
      padding: '14px 0',
      borderTop: i ? '1px solid var(--border-subtle)' : 'none',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 'none',
      width: 36,
      height: 36,
      borderRadius: '50%',
      background: 'var(--surface-muted)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: `fa-solid fa-${it.icon}`,
    style: {
      fontSize: 14,
      color: TONE[it.kind] || 'var(--icon-default)'
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 3
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 15px/1.3 var(--font-sans)',
      color: 'var(--text-heading)'
    }
  }, it.title), it.detail && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-small)',
      color: 'var(--text-muted)'
    }
  }, it.detail)))));
}
Object.assign(__ds_scope, { ShapesList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/almanac/ShapesList.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function Icon({
  name,
  style = 'solid',
  size = 16,
  color,
  title,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("i", {
    className: `fa-${style} fa-${name} ${className}`,
    "aria-hidden": title ? undefined : true,
    "aria-label": title,
    style: {
      fontSize: size,
      color: color || 'currentColor',
      lineHeight: 1,
      width: size * 1.25,
      textAlign: 'center',
      display: 'inline-block'
    }
  });
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
const SIZES = {
  sm: {
    h: 36,
    px: 16,
    fs: 14
  },
  md: {
    h: 44,
    px: 22,
    fs: 15
  },
  lg: {
    h: 52,
    px: 28,
    fs: 16
  }
};
function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  disabled,
  fullWidth,
  onClick,
  type = 'button'
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const s = SIZES[size] || SIZES.md;
  const v = {
    primary: {
      bg: hover ? 'var(--action-primary-hover)' : 'var(--action-primary)',
      fg: 'var(--action-on-primary)',
      bd: 'transparent'
    },
    warm: {
      bg: hover ? 'var(--action-warm-hover)' : 'var(--action-warm)',
      fg: 'var(--linen-0)',
      bd: 'transparent'
    },
    secondary: {
      bg: hover ? 'var(--surface-muted)' : 'var(--surface-card)',
      fg: 'var(--text-heading)',
      bd: 'var(--border-strong)'
    },
    ghost: {
      bg: hover ? 'var(--surface-muted)' : 'transparent',
      fg: 'var(--text-sage)',
      bd: 'transparent'
    }
  }[variant];
  return /*#__PURE__*/React.createElement("button", {
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
      height: s.h,
      padding: `0 ${s.px}px`,
      width: fullWidth ? '100%' : undefined,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      background: v.bg,
      color: v.fg,
      border: `1px solid ${v.bd}`,
      borderRadius: 'var(--radius-pill)',
      font: `500 ${s.fs}px/1 var(--font-sans)`,
      letterSpacing: '0.01em',
      cursor: disabled ? 'default' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      transform: press && !disabled ? 'scale(0.98)' : 'none',
      transition: 'background var(--dur-quick) var(--ease-calm), transform var(--dur-quick) var(--ease-calm)'
    }
  }, icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: s.fs
  }), children, iconRight && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconRight,
    size: s.fs - 2
  }));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
// Glyphs that exist in Font Awesome Free "regular"; everything else falls back to solid.
const REGULAR = ['bookmark', 'heart', 'calendar', 'user', 'sun', 'moon', 'star', 'bell', 'share-from-square', 'circle', 'comment', 'envelope', 'clock', 'eye', 'image', 'file', 'folder', 'lightbulb', 'hand', 'square', 'compass'];
function IconButton({
  icon,
  label,
  variant = 'plain',
  size = 44,
  active,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  const bg = variant === 'filled' ? active ? 'var(--action-primary)' : 'var(--surface-muted)' : variant === 'outline' ? 'var(--surface-card)' : hover ? 'var(--surface-muted)' : 'transparent';
  const fg = variant === 'filled' && active ? 'var(--linen-0)' : active ? 'var(--text-accent)' : 'var(--text-body)';
  return /*#__PURE__*/React.createElement("button", {
    "aria-label": label,
    title: label,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: size,
      height: size,
      borderRadius: '50%',
      border: variant === 'outline' ? '1px solid var(--border-subtle)' : 'none',
      background: bg,
      color: fg,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'background var(--dur-quick) var(--ease-calm)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    style: active || variant === 'filled' || !REGULAR.includes(icon) ? 'solid' : 'regular',
    size: Math.round(size * 0.4)
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Wordmark.jsx
try { (() => {
const D = 'M43.40 12.40L43.40 12.40Q54.60 12.40 60.60 14.80Q66.60 17.20 71 20L71 20Q73.40 21.40 74.90 22.10Q76.40 22.80 77.80 22.80L77.80 22.80Q79.80 22.80 80.70 20.60Q81.60 18.40 82.20 14L82.20 14L86.80 14Q86.60 17.80 86.30 22.80Q86 27.80 85.90 36.10Q85.80 44.40 85.80 58L85.80 58L81.20 58Q80.60 47.80 76.70 38.40Q72.80 29 65.70 22.90Q58.60 16.80 47.60 16.80L47.60 16.80Q37.80 16.80 31.30 22.60Q24.80 28.40 24.80 38.20L24.80 38.20Q24.80 46.60 29.00 52.30Q33.20 58 40.90 63.30Q48.60 68.60 59.20 75.40L59.20 75.40Q69 81.80 76.80 88.10Q84.60 94.40 89.10 102Q93.60 109.60 93.60 120.60L93.60 120.60Q93.60 133.60 87.20 142.20Q80.80 150.80 70 155Q59.20 159.20 46.40 159.20L46.40 159.20Q34.60 159.20 27.70 156.80Q20.80 154.40 15.80 151.80L15.80 151.80Q11.40 149 9.00 149L9.00 149Q7.00 149 6.10 151.20Q5.20 153.40 4.60 157.80L4.60 157.80L0 157.80Q0.40 153.20 0.50 147Q0.60 140.80 0.70 130.90Q0.80 121 0.80 105.80L0.80 105.80L5.40 105.80Q6.20 118.60 9.90 129.70Q13.60 140.80 21.30 147.60Q29.00 154.40 41.80 154.40L41.80 154.40Q48.80 154.40 54.50 151.90Q60.20 149.40 63.60 144.10Q67 138.80 67 130.60L67 130.60Q67 122.40 63.20 116.20Q59.40 110 52.60 104.60Q45.80 99.20 36.60 93.60L36.60 93.60Q27.20 87.60 19 81.40Q10.80 75.20 5.90 67.30Q1 59.40 1 48.20L1 48.20Q1 35.80 7.00 27.90Q13.00 20 22.70 16.20Q32.40 12.40 43.40 12.40ZM135.40 157.80L135.40 157.80Q126.80 157.80 120.80 154.50Q114.80 151.20 111.80 145.50Q108.80 139.80 108.80 132.80L108.80 132.80Q108.80 124.20 112.80 118.70Q116.80 113.20 123.10 109.90Q129.40 106.60 136.40 104.30Q143.40 102 149.60 99.90Q155.80 97.80 159.80 95Q163.80 92.20 163.80 87.60L163.80 87.60L163.80 73Q163.80 66.60 161.90 62.50Q160 58.40 156.30 56.30Q152.60 54.20 147 54.20L147 54.20Q142.80 54.20 138.20 55.40Q133.60 56.60 130.60 60L130.60 60Q135.80 61.40 138.70 65.20Q141.60 69 141.60 74.40L141.60 74.40Q141.60 80.60 137.50 84.10Q133.40 87.60 127.20 87.60L127.20 87.60Q120.60 87.60 117.20 83.40Q113.80 79.20 113.80 73.60L113.80 73.60Q113.80 68 116.60 64.30Q119.40 60.60 124.40 57.60L124.40 57.60Q129.40 54.20 137.20 52.20Q145 50.20 154.20 50.20L154.20 50.20Q163 50.20 169.80 52.10Q176.60 54 181.40 58.80L181.40 58.80Q186.20 63.40 187.60 70.20Q189 77 189 86.80L189 86.80L189 141.60Q189 146.60 190.20 148.70Q191.40 150.80 194 150.80L194 150.80Q196 150.80 197.80 149.80Q199.60 148.80 201.80 147L201.80 147L204 150.40Q199.60 153.80 194.80 155.80Q190 157.80 183.20 157.80L183.20 157.80Q176.20 157.80 172.10 155.80Q168 153.80 166.10 150Q164.20 146.20 164 141L164 141Q159.20 149 152.20 153.40Q145.20 157.80 135.40 157.80ZM147.40 146.60L147.40 146.60Q152.20 146.60 156.30 144Q160.40 141.40 163.80 136.20L163.80 136.20L163.80 95.80Q161.80 98.80 158.10 101.20Q154.40 103.60 150.20 106Q146 108.40 142.30 111.50Q138.60 114.60 136.10 119.10Q133.60 123.60 133.60 130.60L133.60 130.60Q133.60 138.40 137.40 142.50Q141.20 146.60 147.40 146.60ZM261.40 0L261.40 0Q268 0 272.90 1.70Q277.80 3.40 281.40 6.20L281.40 6.20Q284.40 8.60 286.30 12.20Q288.20 15.80 288.20 20.20L288.20 20.20Q288.20 25.60 284.50 29.40Q280.80 33.20 275.20 33.20L275.20 33.20Q269.20 33.20 265.30 29.70Q261.40 26.20 261.40 20L261.40 20Q261.40 15.20 264.10 11.70Q266.80 8.20 271.80 6.80L271.80 6.80Q271.20 5.40 269.20 4.40Q267.20 3.40 263.80 3.40L263.80 3.40Q259.80 3.40 256.90 5Q254.00 6.60 252.20 9.40L252.20 9.40Q250.20 12.80 249.40 19.40Q248.60 26 248.60 39.40L248.60 39.40L248.60 53.20L270 53.20L270 57.20L248.60 57.20L248.60 135.80Q248.60 145.60 253.90 148.90Q259.20 152.20 268.20 152.20L268.20 152.20L268.20 156.40Q263.20 156.20 254.20 155.90Q245.20 155.60 235.00 155.60L235.00 155.60Q227.80 155.60 220.60 155.90Q213.40 156.20 209.80 156.40L209.80 156.40L209.80 152.20Q217.20 152.20 220.30 149.20Q223.40 146.20 223.40 137.80L223.40 137.80L223.40 57.20L209.00 57.20L209.00 53.20L223.40 53.20Q223.40 41.40 224.60 33.50Q225.80 25.60 228.30 20Q230.80 14.40 235.20 10L235.20 10Q239.40 5.60 246.30 2.80Q253.20 0 261.40 0ZM306.60 157.80L306.60 157.80Q298 157.80 292 154.50Q286 151.20 283 145.50Q280 139.80 280 132.80L280 132.80Q280 124.20 284 118.70Q288 113.20 294.30 109.90Q300.60 106.60 307.60 104.30Q314.60 102 320.80 99.90Q327 97.80 331 95Q335 92.20 335 87.60L335 87.60L335 73Q335 66.60 333.10 62.50Q331.20 58.40 327.50 56.30Q323.80 54.20 318.20 54.20L318.20 54.20Q314 54.20 309.40 55.40Q304.80 56.60 301.80 60L301.80 60Q307 61.40 309.90 65.20Q312.80 69 312.80 74.40L312.80 74.40Q312.80 80.60 308.70 84.10Q304.60 87.60 298.40 87.60L298.40 87.60Q291.80 87.60 288.40 83.40Q285 79.20 285 73.60L285 73.60Q285 68 287.80 64.30Q290.60 60.60 295.60 57.60L295.60 57.60Q300.60 54.20 308.40 52.20Q316.20 50.20 325.40 50.20L325.40 50.20Q334.20 50.20 341 52.10Q347.80 54 352.60 58.80L352.60 58.80Q357.40 63.40 358.80 70.20Q360.20 77 360.20 86.80L360.20 86.80L360.20 141.60Q360.20 146.60 361.40 148.70Q362.60 150.80 365.20 150.80L365.20 150.80Q367.20 150.80 369 149.80Q370.80 148.80 373 147L373 147L375.20 150.40Q370.80 153.80 366 155.80Q361.20 157.80 354.40 157.80L354.40 157.80Q347.40 157.80 343.30 155.80Q339.20 153.80 337.30 150Q335.40 146.20 335.20 141L335.20 141Q330.40 149 323.40 153.40Q316.40 157.80 306.60 157.80ZM318.60 146.60L318.60 146.60Q323.40 146.60 327.50 144Q331.60 141.40 335 136.20L335 136.20L335 95.80Q333 98.80 329.30 101.20Q325.60 103.60 321.40 106Q317.20 108.40 313.50 111.50Q309.80 114.60 307.30 119.10Q304.80 123.60 304.80 130.60L304.80 130.60Q304.80 138.40 308.60 142.50Q312.40 146.60 318.60 146.60Z';
function Wordmark({
  size = 32,
  tone = 'dark',
  tagline = false
}) {
  const color = tone === 'light' ? 'var(--text-inverse)' : 'var(--text-heading)';
  const width = size * 2.3500;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: size * 0.32
    }
  }, /*#__PURE__*/React.createElement("svg", {
    role: "img",
    "aria-label": "Safa",
    viewBox: "0 0 376 160",
    width: width,
    height: size,
    style: {
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("path", {
    fill: color,
    d: D
  })), tagline && /*#__PURE__*/React.createElement("span", {
    style: {
      font: `300 ${Math.max(11, size * 0.3)}px/1.2 var(--font-sans)`,
      color: tone === 'light' ? 'var(--stone-400)' : 'var(--text-muted)'
    }
  }, "The modern almanac for mindful living."));
}
Object.assign(__ds_scope, { Wordmark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Wordmark.jsx", error: String((e && e.message) || e) }); }

// components/display/Card.jsx
try { (() => {
function Card({
  children,
  tone = 'card',
  padding = 24,
  align = 'left',
  onClick,
  style
}) {
  const bg = {
    card: 'var(--surface-card)',
    muted: 'var(--surface-muted)',
    sage: 'var(--surface-sage)',
    terracotta: 'var(--surface-terracotta)',
    mauve: 'var(--surface-mauve)',
    inverse: 'var(--surface-inverse)'
  }[tone];
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    style: {
      background: bg,
      color: tone === 'inverse' ? 'var(--text-inverse)' : 'inherit',
      border: tone === 'inverse' ? 'none' : '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-md)',
      padding,
      textAlign: align,
      cursor: onClick ? 'pointer' : 'default',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Card.jsx", error: String((e && e.message) || e) }); }

// components/display/Eyebrow.jsx
try { (() => {
function Eyebrow({
  children,
  tone = 'terracotta'
}) {
  const c = {
    terracotta: 'var(--text-accent-strong)',
    sage: 'var(--text-sage)',
    mauve: 'var(--text-mauve)',
    muted: 'var(--text-muted)'
  }[tone];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-eyebrow)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color: c
    }
  }, children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/display/PullQuote.jsx
try { (() => {
function PullQuote({
  children,
  attribution,
  size = 26
}) {
  return /*#__PURE__*/React.createElement("figure", {
    style: {
      margin: 0,
      position: 'relative',
      padding: '8px 40px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      left: 0,
      top: -6,
      font: `400 ${size * 1.8}px/1 var(--font-display)`,
      color: 'var(--stone-300)'
    }
  }, "\u201C"), /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: 0,
      font: `400 ${size}px/1.45 var(--font-display)`,
      color: 'var(--text-heading)',
      textWrap: 'pretty'
    }
  }, children), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      right: 0,
      bottom: attribution ? 22 : -16,
      font: `400 ${size * 1.8}px/1 var(--font-display)`,
      color: 'var(--stone-300)'
    }
  }, "\u201D"), attribution && /*#__PURE__*/React.createElement("figcaption", {
    style: {
      marginTop: 20,
      font: 'var(--type-eyebrow)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--text-accent-strong)'
    }
  }, attribution));
}
Object.assign(__ds_scope, { PullQuote });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/PullQuote.jsx", error: String((e && e.message) || e) }); }

// components/display/Tag.jsx
try { (() => {
function Tag({
  children,
  tone = 'neutral',
  icon,
  selected,
  onClick
}) {
  const t = {
    neutral: ['var(--surface-muted)', 'var(--text-body)'],
    sage: ['var(--sage-50)', 'var(--sage-800)'],
    terracotta: ['var(--terracotta-50)', 'var(--terracotta-700)'],
    mauve: ['var(--mauve-50)', 'var(--mauve-700)']
  }[tone];
  return /*#__PURE__*/React.createElement("span", {
    onClick: onClick,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 28,
      padding: '0 12px',
      borderRadius: 999,
      background: selected ? 'var(--charcoal-900)' : t[0],
      color: selected ? 'var(--linen-0)' : t[1],
      border: '1px solid rgba(43,42,39,.05)',
      font: '500 12px/1 var(--font-sans)',
      whiteSpace: 'nowrap',
      cursor: onClick ? 'pointer' : 'default'
    }
  }, icon && /*#__PURE__*/React.createElement("i", {
    className: `fa-solid fa-${icon}`,
    style: {
      fontSize: 11
    }
  }), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Sheet.jsx
try { (() => {
function Sheet({
  open,
  onClose,
  title,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: open ? 'auto' : 'none',
      zIndex: 50
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--overlay-scrim)',
      opacity: open ? 1 : 0,
      transition: 'opacity var(--dur-base) var(--ease-calm)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      maxHeight: '86%',
      overflow: 'auto',
      background: 'var(--bg-canvas)',
      borderRadius: '24px 24px 0 0',
      padding: '12px 24px 36px',
      boxShadow: 'var(--shadow-lg)',
      transform: open ? 'translateY(0)' : 'translateY(104%)',
      transition: 'transform var(--dur-slow) var(--ease-settle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 4,
      borderRadius: 2,
      background: 'var(--stone-300)',
      margin: '0 auto 20px'
    }
  }), title && /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '0 0 16px',
      font: 'var(--type-h2)',
      color: 'var(--text-heading)'
    }
  }, title), children));
}
Object.assign(__ds_scope, { Sheet });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Sheet.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function Toast({
  message,
  icon = 'check',
  visible = true
}) {
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      padding: '12px 18px',
      borderRadius: 999,
      background: 'var(--surface-inverse)',
      color: 'var(--text-inverse)',
      font: '400 14px/1.2 var(--font-sans)',
      boxShadow: 'var(--shadow-md)',
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateY(8px)',
      transition: 'all var(--dur-base) var(--ease-calm)'
    }
  }, icon && /*#__PURE__*/React.createElement("i", {
    className: `fa-solid fa-${icon}`,
    style: {
      fontSize: 12,
      color: 'var(--sage-300)'
    }
  }), message);
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function Checkbox({
  checked,
  onChange,
  label,
  description,
  disabled
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start',
      cursor: disabled ? 'default' : 'pointer',
      opacity: disabled ? .5 : 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: e => {
      e.preventDefault();
      !disabled && onChange && onChange(!checked);
    },
    style: {
      flex: 'none',
      width: 22,
      height: 22,
      marginTop: 1,
      borderRadius: '50%',
      border: `1.5px solid ${checked ? 'var(--sage-600)' : 'var(--stone-400)'}`,
      background: checked ? 'var(--sage-600)' : 'var(--surface-card)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all var(--dur-base) var(--ease-calm)'
    }
  }, checked && /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-check",
    style: {
      fontSize: 11,
      color: 'var(--linen-0)'
    }
  })), (label || description) && /*#__PURE__*/React.createElement("span", {
    onClick: e => {
      e.preventDefault();
      !disabled && onChange && onChange(!checked);
    },
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-body)',
      color: checked ? 'var(--text-muted)' : 'var(--text-heading)',
      transition: 'color var(--dur-base)'
    }
  }, label), description && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-caption)',
      color: 'var(--text-muted)'
    }
  }, description)));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/almanac/PracticeItem.jsx
try { (() => {
function PracticeItem({
  title,
  category,
  duration,
  done,
  onToggle
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '16px 18px',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-md)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Checkbox, {
    checked: done,
    onChange: onToggle,
    label: title,
    description: category
  })), duration && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-caption)',
      color: 'var(--text-faint)'
    }
  }, duration));
}
Object.assign(__ds_scope, { PracticeItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/almanac/PracticeItem.jsx", error: String((e && e.message) || e) }); }

// components/forms/JournalField.jsx
try { (() => {
function JournalField({
  prompt,
  value,
  onChange,
  placeholder = 'Write a few lines…',
  rows = 5
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, prompt && /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'italic 400 18px/1.6 var(--font-serif)',
      color: 'var(--text-heading)'
    }
  }, prompt), /*#__PURE__*/React.createElement("textarea", {
    rows: rows,
    value: value,
    placeholder: placeholder,
    onChange: e => onChange && onChange(e.target.value),
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      resize: 'none',
      padding: 16,
      background: 'var(--surface-card)',
      border: `1px solid ${focus ? 'var(--sage-500)' : 'var(--border-subtle)'}`,
      borderRadius: 'var(--radius-md)',
      font: '400 16px/1.75 var(--font-serif)',
      color: 'var(--text-heading)',
      outline: 'none',
      boxShadow: focus ? '0 0 0 3px var(--focus-ring)' : 'none'
    }
  }));
}
Object.assign(__ds_scope, { JournalField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/JournalField.jsx", error: String((e && e.message) || e) }); }

// components/forms/SegmentedControl.jsx
try { (() => {
function SegmentedControl({
  options,
  value,
  onChange,
  fullWidth = true
}) {
  return /*#__PURE__*/React.createElement("div", {
    role: "radiogroup",
    style: {
      display: 'flex',
      gap: 4,
      padding: 4,
      background: 'var(--surface-muted)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 999,
      boxSizing: 'border-box',
      width: fullWidth ? '100%' : 'auto'
    }
  }, options.map(o => {
    const val = o.value ?? o;
    const lab = o.label ?? o;
    const on = val === value;
    return /*#__PURE__*/React.createElement("button", {
      key: val,
      role: "radio",
      "aria-checked": on,
      onClick: () => onChange && onChange(val),
      style: {
        flex: 1,
        minWidth: 0,
        height: 38,
        padding: '0 12px',
        border: 'none',
        borderRadius: 999,
        background: on ? 'var(--surface-card)' : 'transparent',
        boxShadow: on ? 'var(--shadow-sm)' : 'none',
        color: on ? 'var(--text-heading)' : 'var(--text-muted)',
        font: `${on ? 500 : 400} 14px/1 var(--font-sans)`,
        cursor: 'pointer',
        transition: 'all var(--dur-base) var(--ease-calm)'
      }
    }, lab);
  }));
}
Object.assign(__ds_scope, { SegmentedControl });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SegmentedControl.jsx", error: String((e && e.message) || e) }); }

// components/forms/TextField.jsx
try { (() => {
function TextField({
  label,
  value,
  onChange,
  placeholder,
  hint,
  type = 'text',
  disabled
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      width: '100%'
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-label)',
      color: 'var(--text-heading)'
    }
  }, label), /*#__PURE__*/React.createElement("input", {
    type: type,
    value: value,
    placeholder: placeholder,
    disabled: disabled,
    onChange: e => onChange && onChange(e.target.value),
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      height: 48,
      padding: '0 16px',
      background: 'var(--surface-card)',
      border: `1px solid ${focus ? 'var(--sage-500)' : 'var(--border-subtle)'}`,
      borderRadius: 'var(--radius-md)',
      boxShadow: focus ? '0 0 0 3px var(--focus-ring)' : 'none',
      font: 'var(--type-body)',
      color: 'var(--text-heading)',
      outline: 'none',
      opacity: disabled ? .5 : 1,
      transition: 'border-color var(--dur-quick) var(--ease-calm), box-shadow var(--dur-quick) var(--ease-calm)'
    }
  }), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-caption)',
      color: 'var(--text-muted)'
    }
  }, hint));
}
Object.assign(__ds_scope, { TextField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/TextField.jsx", error: String((e && e.message) || e) }); }

// components/forms/Toggle.jsx
try { (() => {
function Toggle({
  checked,
  onChange,
  label,
  description,
  disabled
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      justifyContent: 'space-between',
      cursor: disabled ? 'default' : 'pointer',
      opacity: disabled ? .5 : 1,
      width: '100%'
    }
  }, (label || description) && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-body)',
      color: 'var(--text-heading)'
    }
  }, label), description && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-caption)',
      color: 'var(--text-muted)'
    }
  }, description)), /*#__PURE__*/React.createElement("button", {
    role: "switch",
    "aria-checked": !!checked,
    disabled: disabled,
    onClick: () => onChange && onChange(!checked),
    style: {
      flex: 'none',
      width: 46,
      height: 28,
      borderRadius: 999,
      border: 'none',
      padding: 3,
      background: checked ? 'var(--sage-600)' : 'var(--stone-300)',
      cursor: 'inherit',
      transition: 'background var(--dur-base) var(--ease-calm)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      width: 22,
      height: 22,
      borderRadius: '50%',
      background: 'var(--linen-0)',
      boxShadow: 'var(--shadow-xs)',
      transform: checked ? 'translateX(18px)' : 'none',
      transition: 'transform var(--dur-base) var(--ease-settle)'
    }
  })));
}
Object.assign(__ds_scope, { Toggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Toggle.jsx", error: String((e && e.message) || e) }); }

// components/navigation/TabBar.jsx
try { (() => {
function TabBar({
  items = [],
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      justifyContent: 'space-around',
      padding: '10px 8px 26px',
      background: 'color-mix(in oklch, var(--bg-canvas) 88%, transparent)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      borderTop: '1px solid var(--border-subtle)'
    }
  }, items.map(it => {
    const on = it.id === value;
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      onClick: () => onChange && onChange(it.id),
      style: {
        minWidth: 64,
        height: 48,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: on ? 'var(--sage-700)' : 'var(--stone-500)',
        transition: 'color var(--dur-quick)'
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: `fa-${on ? 'solid' : it.regular === false ? 'solid' : 'regular'} fa-${it.icon}`,
      style: {
        fontSize: 18
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        font: `${on ? 500 : 400} 11px/1 var(--font-sans)`,
        letterSpacing: '.02em'
      }
    }, it.label));
  }));
}
Object.assign(__ds_scope, { TabBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/TabBar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/TopBar.jsx
try { (() => {
function TopBar({
  title,
  left,
  right,
  center = true
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      height: 56,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 12px',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 44,
      display: 'flex'
    }
  }, left), title && /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      textAlign: center ? 'center' : 'left',
      font: '500 17px/1 var(--font-display)',
      color: 'var(--text-heading)'
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 44,
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 4
    }
  }, right));
}
Object.assign(__ds_scope, { TopBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/TopBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/Onboarding.jsx
try { (() => {
const OB = window.SafaDesignSystem_a782c7;
function Onboarding({
  onDone
}) {
  const {
    Button,
    Wordmark,
    PullQuote,
    SegmentedControl,
    Toggle,
    JourneySteps
  } = OB;
  const [step, setStep] = React.useState(0);
  const [hemi, setHemi] = React.useState('Northern');
  const [remind, setRemind] = React.useState(true);
  const next = () => step < 2 ? setStep(step + 1) : onDone({
    hemi,
    remind
  });
  const pane = {
    position: 'absolute',
    inset: 0,
    padding: '72px 28px 40px',
    display: 'flex',
    flexDirection: 'column',
    transition: 'opacity var(--dur-slow) var(--ease-calm), transform var(--dur-slow) var(--ease-calm)'
  };
  const vis = i => ({
    opacity: step === i ? 1 : 0,
    transform: step === i ? 'none' : `translateY(${step > i ? -12 : 12}px)`,
    pointerEvents: step === i ? 'auto' : 'none'
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: '100%',
      background: 'var(--bg-canvas)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 28,
      left: 28,
      right: 28,
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement(JourneySteps, {
    steps: ['Welcome', 'Hemisphere', 'Notification', 'Daily Blend'],
    current: step
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      ...pane,
      ...vis(0),
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 48
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    size: 48,
    tagline: true
  }), /*#__PURE__*/React.createElement(PullQuote, {
    size: 19,
    attribution: "The Safa Promise"
  }, "We are not here to change what you believe. We are here to share the beauty of how the world observes time.")), /*#__PURE__*/React.createElement(Button, {
    fullWidth: true,
    size: "lg",
    onClick: next
  }, "Begin"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-caption)',
      color: 'var(--text-muted)',
      marginTop: 14
    }
  }, "No religious affiliation or personal data required.")), /*#__PURE__*/React.createElement("div", {
    style: {
      ...pane,
      ...vis(1)
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-eyebrow)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--text-accent-strong)'
    }
  }, "Hemisphere"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: 'var(--type-h1)',
      color: 'var(--text-heading)'
    }
  }, "Where are you living through the seasons?"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: 'var(--type-body)'
    }
  }, "One question, so autumn arrives for you when it actually arrives."), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 8
    }
  }), /*#__PURE__*/React.createElement(SegmentedControl, {
    options: ['Northern', 'Southern'],
    value: hemi,
    onChange: setHemi
  })), /*#__PURE__*/React.createElement(Button, {
    fullWidth: true,
    size: "lg",
    onClick: next
  }, "Continue")), /*#__PURE__*/React.createElement("div", {
    style: {
      ...pane,
      ...vis(2)
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-eyebrow)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--text-accent-strong)'
    }
  }, "Notification"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: 'var(--type-h1)',
      color: 'var(--text-heading)'
    }
  }, "A single, silent ping each morning."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: 'var(--type-body)'
    }
  }, "Just enough to anchor the start of your day. Nothing more."), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 8
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-md)',
      padding: '16px 18px'
    }
  }, /*#__PURE__*/React.createElement(Toggle, {
    checked: remind,
    onChange: setRemind,
    label: "Morning reminder",
    description: "7:00 \xB7 silent"
  }))), /*#__PURE__*/React.createElement(Button, {
    fullWidth: true,
    size: "lg",
    onClick: next
  }, "See today")));
}
window.Onboarding = Onboarding;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/Onboarding.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/OtherTabs.jsx
try { (() => {
const OT = window.SafaDesignSystem_a782c7;
function Almanac({
  onOpenDay
}) {
  const {
    TopBar,
    Tag
  } = OT;
  const color = {
    moon: 'var(--mauve-500)',
    observance: 'var(--terracotta-500)',
    season: 'var(--sage-500)'
  };
  const [filter, setFilter] = React.useState('all');
  const items = window.SAFA_ALMANAC.filter(i => filter === 'all' || i.kind === filter);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement(TopBar, {
    title: "Almanac"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '8px 24px 32px'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '0 0 6px',
      font: 'var(--type-h1)',
      color: 'var(--text-heading)'
    }
  }, "October"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 20px',
      font: 'var(--type-small)',
      color: 'var(--text-muted)'
    }
  }, "Mid-autumn \xB7 Northern Hemisphere"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginBottom: 20,
      flexWrap: 'wrap'
    }
  }, [['all', 'All'], ['moon', 'Moon'], ['observance', 'Observances'], ['season', 'Seasons']].map(([k, l]) => /*#__PURE__*/React.createElement(Tag, {
    key: k,
    selected: filter === k,
    onClick: () => setFilter(k)
  }, l))), items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    onClick: () => onOpenDay(it),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '16px 0',
      borderTop: i ? '1px solid var(--border-subtle)' : 'none',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 52,
      font: '500 13px/1.2 var(--font-sans)',
      color: 'var(--text-muted)'
    }
  }, it.date), /*#__PURE__*/React.createElement("i", {
    className: `fa-solid fa-${it.icon}`,
    style: {
      fontSize: 14,
      color: color[it.kind],
      width: 18,
      textAlign: 'center'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      font: '400 17px/1.3 var(--font-display)',
      color: 'var(--text-heading)'
    }
  }, it.title), /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-chevron-right",
    style: {
      fontSize: 11,
      color: 'var(--stone-400)'
    }
  })))));
}
function Journal({
  prompt,
  entries,
  onSaveEntry
}) {
  const {
    TopBar,
    JournalField,
    Button
  } = OT;
  const [text, setText] = React.useState('');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement(TopBar, {
    title: "Journal"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '8px 24px 32px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-eyebrow)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--text-mauve)',
      marginBottom: 12
    }
  }, "Today\u2019s reflection"), /*#__PURE__*/React.createElement(JournalField, {
    prompt: prompt,
    value: text,
    onChange: setText,
    rows: 6
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 14
    }
  }), /*#__PURE__*/React.createElement(Button, {
    fullWidth: true,
    disabled: !text.trim(),
    onClick: () => {
      onSaveEntry(text);
      setText('');
    }
  }, "Keep this"), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 40
    }
  }), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '0 0 8px',
      font: 'var(--type-h3)',
      color: 'var(--text-heading)'
    }
  }, "Earlier"), entries.map((e, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: '16px 0',
      borderTop: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-caption)',
      color: 'var(--text-muted)',
      marginBottom: 6
    }
  }, e.date), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'italic 400 15px/1.5 var(--font-serif)',
      color: 'var(--text-mauve)',
      marginBottom: 6
    }
  }, e.prompt), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-small)',
      color: 'var(--text-body)'
    }
  }, e.text)))));
}
function You({
  prefs,
  setPrefs
}) {
  const {
    TopBar,
    SegmentedControl,
    Toggle,
    TextField,
    Wordmark
  } = OT;
  const row = {
    background: 'var(--surface-card)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 'var(--radius-md)',
    padding: '16px 18px'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement(TopBar, {
    title: "You"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '8px 24px 32px',
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(TextField, {
    label: "First name",
    value: prefs.name,
    onChange: v => setPrefs({
      ...prefs,
      name: v
    }),
    placeholder: "For greeting cards",
    hint: prefs.name ? `For ${prefs.name}, with warmth from Safa` : 'Optional'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-label)',
      color: 'var(--text-heading)',
      marginTop: 8
    }
  }, "Hemisphere"), /*#__PURE__*/React.createElement(SegmentedControl, {
    options: ['Northern', 'Southern'],
    value: prefs.hemi,
    onChange: v => setPrefs({
      ...prefs,
      hemi: v
    })
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      ...row,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(Toggle, {
    checked: prefs.remind,
    onChange: v => setPrefs({
      ...prefs,
      remind: v
    }),
    label: "Morning reminder",
    description: "One silent notification at 7:00"
  })), /*#__PURE__*/React.createElement("div", {
    style: row
  }, /*#__PURE__*/React.createElement(Toggle, {
    checked: prefs.nature,
    onChange: v => setPrefs({
      ...prefs,
      nature: v
    }),
    label: "Garden & plant cues",
    description: "Planting, pruning and watering timing"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      paddingTop: 40,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    size: 20,
    tagline: true
  }))));
}
Object.assign(window, {
  Almanac,
  Journal,
  You
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/OtherTabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/Today.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TD = window.SafaDesignSystem_a782c7;
function SectionHead({
  eyebrow,
  title,
  tone = 'terracotta'
}) {
  const {
    Eyebrow
  } = TD;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: tone
  }, eyebrow), title && /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: 'var(--type-h2)',
      color: 'var(--text-heading)'
    }
  }, title));
}
function Today({
  dayIndex,
  setDayIndex,
  onLearn,
  onJournal,
  onSave,
  saved
}) {
  const {
    BlendHero,
    ShapesList,
    PracticeItem,
    ReflectPrompt,
    TopBar,
    IconButton,
    Wordmark,
    Button
  } = TD;
  const day = window.SAFA_DAYS[dayIndex];
  const [done, setDone] = React.useState({});
  const scroller = React.useRef(null);
  React.useEffect(() => {
    setDone({});
    if (scroller.current) scroller.current.scrollTop = 0;
  }, [dayIndex]);
  const n = window.SAFA_DAYS.length;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement(TopBar, {
    left: /*#__PURE__*/React.createElement(IconButton, {
      icon: "chevron-left",
      label: "Previous day",
      onClick: () => setDayIndex((dayIndex + n - 1) % n)
    }),
    title: /*#__PURE__*/React.createElement(Wordmark, {
      size: 18
    }),
    right: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IconButton, {
      icon: "bookmark",
      label: "Save",
      active: saved,
      onClick: onSave
    }), /*#__PURE__*/React.createElement(IconButton, {
      icon: "chevron-right",
      label: "Next day",
      onClick: () => setDayIndex((dayIndex + 1) % n)
    }))
  }), /*#__PURE__*/React.createElement("div", {
    ref: scroller,
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '8px 24px 32px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    key: day.id,
    style: {
      animation: 'safaFade var(--dur-slow) var(--ease-calm)'
    }
  }, /*#__PURE__*/React.createElement(BlendHero, {
    date: day.date,
    theme: day.theme,
    blend: day.blend,
    image: day.image,
    cues: day.cues
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 40
    }
  }), /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "What Shapes Today"
  }), /*#__PURE__*/React.createElement(ShapesList, {
    items: day.shapes
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 36
    }
  }), /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Nature Now",
    tone: "sage"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      background: 'var(--surface-sage)',
      border: '1px solid var(--sage-100)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 120,
      background: `url(${day.nature.image}) center/cover`
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 20px 20px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-h3)',
      color: 'var(--text-heading)',
      marginBottom: 6
    }
  }, day.nature.title), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-small)',
      color: 'var(--text-body)'
    }
  }, day.nature.text))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 36
    }
  }), /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Practice Today"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, day.practice.map((p, i) => /*#__PURE__*/React.createElement(PracticeItem, _extends({
    key: i
  }, p, {
    done: !!done[i],
    onToggle: v => setDone({
      ...done,
      [i]: v
    })
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 36
    }
  }), /*#__PURE__*/React.createElement(ReflectPrompt, {
    prompt: day.reflect,
    action: "Write in your journal",
    onAction: onJournal
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 28
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    fullWidth: true,
    icon: "book-open",
    onClick: () => onLearn(day.learn)
  }, "Learn more"))));
}
window.Today = Today;
window.SectionHead = SectionHead;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/Today.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/data.js
try { (() => {
window.SAFA_DAYS = [{
  id: 'quiet',
  date: 'Tuesday, 14 October',
  type: 'Quiet day',
  theme: 'A day of quiet grounding',
  blend: 'Not every meaningful day arrives loudly. Today supports subtle care, patience, and mindful maintenance.',
  image: '../../assets/imagery/olive-shadow-wall.jpg',
  cues: ['Waxing moon', 'Stable seasonal rhythm'],
  shapes: [{
    icon: 'moon',
    kind: 'moon',
    title: 'Waxing moon',
    detail: 'A gentle build; nothing asks to be finished yet.'
  }, {
    icon: 'leaf',
    kind: 'season',
    title: 'Stable seasonal rhythm',
    detail: 'Mid-autumn in the Northern Hemisphere.'
  }, {
    icon: 'circle',
    kind: 'observance',
    title: 'No major global observance',
    detail: 'Tone: stillness and consistency.'
  }],
  nature: {
    title: 'Seed heads are ripening',
    text: 'Leave some flower heads standing. Finches and other small birds feed on them through the colder weeks.',
    image: '../../assets/imagery/sage-leaves.jpg'
  },
  practice: [{
    title: 'Tend to one corner of your home',
    category: 'Home & body',
    duration: '15 min'
  }, {
    title: 'Make one nourishing choice for your body',
    category: 'Home & body'
  }, {
    title: 'Spend ten quiet minutes outside',
    category: 'Nature',
    duration: '10 min'
  }],
  reflect: 'What do I notice when life is not demanding my reaction?',
  learn: {
    title: 'Why quiet days matter',
    text: 'On days with no major cultural or solar milestones, Safa leans on the ongoing lunar phase and the micro-season. Every day holds a subtle rhythm, even in the quietest weeks of the year.'
  }
}, {
  id: 'fullmoon',
  date: 'Thursday, 16 October',
  type: 'Ritual day',
  theme: 'What is ready to be released',
  blend: 'Today illuminates what is ready to be released. The full moon heightens visibility and emotional clarity, making this a powerful moment for cleansing, completion, and honest reflection.',
  image: '../../assets/imagery/moonrise.jpg',
  cues: ['Full moon', 'Release'],
  shapes: [{
    icon: 'moon',
    kind: 'moon',
    title: 'Full moon',
    detail: 'Emotional visibility, culmination energy.'
  }, {
    icon: 'feather',
    kind: 'observance',
    title: 'Release theme',
    detail: 'Shared across many lunar traditions.'
  }, {
    icon: 'leaf',
    kind: 'season',
    title: 'Leaf fall',
    detail: 'The season is letting go alongside you.'
  }],
  nature: {
    title: 'A good night to look up',
    text: 'Clear autumn skies make the full moon easy to see from early evening. Owls are more vocal as territories settle for winter.',
    image: '../../assets/imagery/leaf-shadow.jpg'
  },
  practice: [{
    title: 'Place crystals or water under moonlight',
    category: 'Spirit'
  }, {
    title: 'Clear one room or drawer',
    category: 'Home & body',
    duration: '20 min'
  }, {
    title: 'Write and release one emotional burden',
    category: 'Reflection',
    duration: '5 min'
  }],
  reflect: 'What truth has become too visible to ignore?',
  learn: {
    title: 'The full moon across cultures',
    text: 'Many calendars mark the full moon as a point of completion. Safa does not flatten these into sameness; it notes where traditions overlap and where they differ.'
  }
}, {
  id: 'sacred',
  date: 'Saturday, 18 October',
  type: 'Sacred day',
  theme: 'Reverence, pause, and remembrance',
  blend: 'Today carries reverence, pause, and remembrance. For many, this observance holds deep spiritual meaning. Safa honors its significance while inviting all users into awareness, humility, and respectful presence.',
  image: '../../assets/imagery/lamp-plinth.jpg',
  cues: ['Observance', 'Remembrance'],
  shapes: [{
    icon: 'star',
    kind: 'observance',
    title: 'A day of observance',
    detail: 'Handled with restraint; no cheerful greeting.'
  }, {
    icon: 'moon',
    kind: 'moon',
    title: 'Waning gibbous',
    detail: 'A softening after the full moon.'
  }],
  nature: {
    title: 'Bulbs go in now',
    text: 'Plant spring bulbs before the first hard frost, roughly twice as deep as the bulb is tall.',
    image: '../../assets/imagery/soil-shears.jpg'
  },
  practice: [{
    title: 'Slow your pace',
    category: 'Body'
  }, {
    title: 'Learn something about the observance',
    category: 'Learning',
    duration: '5 min'
  }, {
    title: 'Perform one quiet act of gratitude or generosity',
    category: 'Connection'
  }],
  reflect: 'Who or what would I like to remember today?',
  learn: {
    title: 'About this observance',
    text: 'Safa offers context respectfully and avoids certainty where tradition is nuanced. Read more from the communities who keep this day.'
  }
}];
window.SAFA_ALMANAC = [{
  date: '16 Oct',
  title: 'Full moon',
  kind: 'moon',
  icon: 'moon'
}, {
  date: '18 Oct',
  title: 'Day of observance',
  kind: 'observance',
  icon: 'star'
}, {
  date: '23 Oct',
  title: 'Frost dates begin (north)',
  kind: 'season',
  icon: 'leaf'
}, {
  date: '31 Oct',
  title: 'Cross-quarter day',
  kind: 'season',
  icon: 'sun'
}, {
  date: '1 Nov',
  title: 'New moon',
  kind: 'moon',
  icon: 'circle'
}];
window.SAFA_JOURNAL = [{
  date: '12 Oct',
  prompt: 'What can I let settle today?',
  text: 'The kitchen table, mostly. And the conversation from Sunday.'
}, {
  date: '9 Oct',
  prompt: 'Where did I notice the season today?',
  text: 'Cold air on the walk to the station. The plane trees have started turning.'
}];
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/data.js", error: String((e && e.message) || e) }); }

__ds_ns.BlendHero = __ds_scope.BlendHero;

__ds_ns.JourneySteps = __ds_scope.JourneySteps;

__ds_ns.PracticeItem = __ds_scope.PracticeItem;

__ds_ns.ReflectPrompt = __ds_scope.ReflectPrompt;

__ds_ns.ShapesList = __ds_scope.ShapesList;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Wordmark = __ds_scope.Wordmark;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.PullQuote = __ds_scope.PullQuote;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Sheet = __ds_scope.Sheet;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.JournalField = __ds_scope.JournalField;

__ds_ns.SegmentedControl = __ds_scope.SegmentedControl;

__ds_ns.TextField = __ds_scope.TextField;

__ds_ns.Toggle = __ds_scope.Toggle;

__ds_ns.TabBar = __ds_scope.TabBar;

__ds_ns.TopBar = __ds_scope.TopBar;

})();

import { Easing, Platform, type TextStyle, type ViewStyle } from 'react-native';

/** Safa colour tokens — mirrors `_ds/…/tokens/colors.css`. */
export const palette = {
  sage50: '#F1F4EC', sage100: '#E3E9DA', sage200: '#CFDABF', sage300: '#B8C7A6', sage500: '#9CAF88', sage600: '#829778', sage700: '#677A5C', sage800: '#4D5C45',
  terracotta50: '#F8EEE7', terracotta100: '#F0DCCD', terracotta300: '#DBAE92', terracotta500: '#C17F59', terracotta600: '#A86A47', terracotta700: '#8A5638',
  mauve50: '#F5EEF4', mauve100: '#EADCE9', mauve300: '#D2B5D0', mauve500: '#B384B1', mauve700: '#82597F',
  linen0: '#FDFDFB', linen50: '#F9F8F4', linen100: '#F7F5F0', linen200: '#F2EFE8', linen300: '#E8E4DA',
  stone300: '#DFDEDA', stone400: '#C9C5BC', stone500: '#A39E95', stone600: '#7A756D',
  charcoal700: '#5C5852', charcoal800: '#3E3B36', charcoal900: '#2B2A27', charcoal950: '#33312E',
} as const;

const p = palette;
export const color = {
  ...p,
  bgCanvas: p.linen100,
  bgCanvasSoft: p.linen50,
  surfaceCard: p.linen0,
  surfaceMuted: p.linen200,
  surfaceSunken: p.linen300,
  surfaceInverse: p.charcoal950,
  surfaceSage: p.sage50,
  surfaceTerracotta: p.terracotta50,
  surfaceMauve: p.mauve50,
  borderSubtle: p.linen300,
  borderRule: p.stone300,
  borderStrong: p.stone400,
  textHeading: p.charcoal900,
  textBody: p.charcoal700,
  textMuted: p.stone600,
  textFaint: p.stone500,
  textInverse: p.linen100,
  textAccent: p.terracotta500,
  textAccentStrong: p.terracotta700,
  textSage: p.sage700,
  textMauve: p.mauve700,
  actionPrimary: p.sage700,
  actionPrimaryHover: p.sage800,
  actionPrimarySoft: p.sage100,
  actionOnPrimary: p.linen0,
  actionWarm: p.terracotta500,
  actionWarmHover: p.terracotta600,
  iconDefault: p.sage500,
  iconWarm: p.terracotta500,
  iconMuted: p.stone500,
  /** color-mix(in oklch, sage-500 55%, transparent) */
  focusRing: 'rgba(156,175,136,0.55)',
  overlayScrim: 'rgba(43,42,39,0.32)',
} as const;

export const space = { 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 7: 32, 8: 40, 9: 48, 10: 64, 11: 80, 12: 120, gutter: 24 } as const;
export const radius = { xs: 4, sm: 6, md: 10, lg: 14, xl: 20, '2xl': 28, pill: 999 } as const;

export const shadow = {
  xs: '0px 1px 2px rgba(43,42,39,0.04)',
  sm: '0px 2px 8px rgba(43,42,39,0.05)',
  md: '0px 6px 20px rgba(43,42,39,0.06)',
  lg: '0px 16px 48px rgba(43,42,39,0.10)',
} as const;

export const motion = {
  calm: Easing.bezier(0.22, 0.61, 0.36, 1),
  settle: Easing.bezier(0.16, 1, 0.3, 1),
  quick: 180,
  base: 320,
  slow: 600,
};

/** Native driver is unavailable on web; animations there run on the JS side. */
export const nativeDriver = Platform.OS !== 'web';

// ---- Typography -----------------------------------------------------------

const FAMILIES = {
  sans: { 300: 'Inter_300Light', 400: 'Inter_400Regular', 500: 'Inter_500Medium', 600: 'Inter_600SemiBold' },
  display: { 400: 'PlayfairDisplay_400Regular', 500: 'PlayfairDisplay_500Medium', 600: 'PlayfairDisplay_600SemiBold' },
  serif: { 400: 'NotoSerif_400Regular', 500: 'NotoSerif_500Medium' },
  serifItalic: { 400: 'NotoSerif_400Regular_Italic' },
} as const;

type Family = keyof typeof FAMILIES;
type Weight<F extends Family> = keyof (typeof FAMILIES)[F];

/** CSS `font` shorthand → RN text style. `lh` is the unitless CSS line-height. */
export function font<F extends Family>(family: F, weight: Weight<F>, size: number, lh: number): TextStyle {
  return { fontFamily: FAMILIES[family][weight] as string, fontSize: size, lineHeight: Math.round(size * lh) };
}

/** Semantic type roles — mirrors `tokens/typography.css`. */
export const type = {
  display: { ...font('display', 500, 40, 1.15), letterSpacing: -0.4 },
  h1: font('display', 500, 32, 1.15),
  h2: font('display', 500, 24, 1.3),
  h3: font('display', 500, 20, 1.3),
  blend: font('serifItalic', 400, 18, 1.75),
  body: font('sans', 400, 16, 1.6),
  small: font('sans', 400, 14, 1.6),
  label: font('sans', 500, 14, 1.3),
  caption: font('sans', 400, 12, 1.4),
  eyebrow: { ...font('sans', 500, 11, 1.2), letterSpacing: 11 * 0.14, textTransform: 'uppercase' },
} satisfies Record<string, TextStyle>;

/** CSS `text-wrap` for headings/paragraphs. Only browsers honour it; native ignores the key, so it is web-only. */
export const wrap = {
  balance: (Platform.OS === 'web' ? { textWrap: 'balance' } : {}) as TextStyle,
  pretty: (Platform.OS === 'web' ? { textWrap: 'pretty' } : {}) as TextStyle,
};

/**
 * Clip children without becoming a scroll container. On web `overflow: hidden`
 * boxes can still be scrolled by focus/scrollIntoView, which would shift the app.
 */
export const clip = (Platform.OS === 'web' ? { overflow: 'clip' } : { overflow: 'hidden' }) as ViewStyle;

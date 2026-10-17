import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
// Per-weight imports: the package index would bundle every weight (~18 MB of fonts).
import { Inter_300Light } from '@expo-google-fonts/inter/300Light';
import { Inter_400Regular } from '@expo-google-fonts/inter/400Regular';
import { Inter_500Medium } from '@expo-google-fonts/inter/500Medium';
import { Inter_600SemiBold } from '@expo-google-fonts/inter/600SemiBold';
import { NotoSerif_400Regular } from '@expo-google-fonts/noto-serif/400Regular';
import { NotoSerif_400Regular_Italic } from '@expo-google-fonts/noto-serif/400Regular_Italic';
import { NotoSerif_500Medium } from '@expo-google-fonts/noto-serif/500Medium';
import { PlayfairDisplay_400Regular } from '@expo-google-fonts/playfair-display/400Regular';
import { PlayfairDisplay_500Medium } from '@expo-google-fonts/playfair-display/500Medium';
import { PlayfairDisplay_600SemiBold } from '@expo-google-fonts/playfair-display/600SemiBold';
import { useFonts } from 'expo-font';
import { Stack, router, useLocalSearchParams, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useMemo } from 'react';
import { Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppFrame } from '../SafaApp';
import { SafaProvider, useSafa, type SafaConfig } from '../state/SafaState';
import { color } from '../theme/tokens';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = { initialRouteName: '(tabs)' };

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    PlayfairDisplay_400Regular,
    PlayfairDisplay_500Medium,
    PlayfairDisplay_600SemiBold,
    NotoSerif_400Regular,
    NotoSerif_500Medium,
    NotoSerif_400Regular_Italic,
    ...FontAwesome6.font,
  });

  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync();
  }, [loaded, error]);

  if (!loaded && !error) return null;
  return (
    <SafeAreaProvider>
      <AppRoot />
    </SafeAreaProvider>
  );
}

/** Review shortcuts on web: /?start=today&date=2026-11-08 (kept from the prototype). */
function AppRoot() {
  const params = useLocalSearchParams<{ start?: string; date?: string }>();
  // On web the URL is read directly so the shortcut applies on the very first render.
  const search = Platform.OS === 'web' && typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const start = search?.get('start') ?? params.start;
  const date = search?.get('date') ?? params.date;
  const config = useMemo<SafaConfig>(
    () => ({
      startScreen: start === 'today' ? 'today' : 'onboarding',
      today: date && /^\d{4}-\d{2}-\d{2}$/.test(date) ? date.replace(/-/g, '/') : undefined,
    }),
    [start, date],
  );
  return (
    <SafaProvider config={config}>
      <Gate />
      <AppFrame>
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: color.bgCanvas } }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="onboarding" options={{ animation: 'fade' }} />
          <Stack.Screen name="settings" options={{ animation: 'slide_from_right' }} />
        </Stack>
      </AppFrame>
    </SafaProvider>
  );
}

/** Sends new users to onboarding, and finished users away from it (unless they chose to replay it). */
function Gate() {
  const { state: s } = useSafa();
  const segments = useSegments();
  const inOnboarding = segments[0] === 'onboarding';

  useEffect(() => {
    if (!s.ready) return;
    if (!s.registered && !s.skipOnboarding && !inOnboarding) router.replace('/onboarding');
    else if (s.registered && inOnboarding && !s.replaying) router.replace('/');
  }, [s.ready, s.registered, s.skipOnboarding, s.replaying, inOnboarding]);

  return null;
}

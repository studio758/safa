import { useLocalSearchParams } from 'expo-router';
import { SafaApp } from '../SafaApp';
import type { SafaConfig } from '../state/SafaState';

/**
 * Review shortcuts on web, as query params:
 *   /?start=today&date=2026-11-08
 */
export default function Index() {
  const { start, date } = useLocalSearchParams<{ start?: string; date?: string }>();
  const config: SafaConfig = {
    startScreen: start === 'today' ? 'today' : 'onboarding',
    today: date && /^\d{4}-\d{2}-\d{2}$/.test(date) ? date.replace(/-/g, '/') : undefined,
  };
  return <SafaApp config={config} />;
}

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Onboarding } from '../screens/Onboarding';

export default function OnboardingRoute() {
  const insets = useSafeAreaInsets();
  return <Onboarding bottomInset={insets.bottom} />;
}

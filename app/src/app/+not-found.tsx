import { Redirect } from 'expo-router';

// Any unknown path (e.g. when the web build is hosted under a sub-path) opens the app itself.
export default function NotFound() {
  return <Redirect href="/" />;
}

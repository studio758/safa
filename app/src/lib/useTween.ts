import { useEffect, useState } from 'react';
import { Animated, type EasingFunction } from 'react-native';
import { motion, nativeDriver } from '../theme/tokens';

type Opts = { duration?: number; easing?: EasingFunction; native?: boolean };

/**
 * An Animated.Value that eases to `target` whenever it changes — the RN
 * equivalent of a CSS `transition` on a single property.
 * Pass `native: false` when the value drives colours or layout.
 */
export function useTween(target: number, { duration = motion.base, easing = motion.calm, native = true }: Opts = {}) {
  const [v] = useState(() => new Animated.Value(target));
  useEffect(() => {
    const anim = Animated.timing(v, { toValue: target, duration, easing, useNativeDriver: native && nativeDriver });
    anim.start();
    return () => anim.stop();
  }, [target, duration, easing, native, v]);
  return v;
}

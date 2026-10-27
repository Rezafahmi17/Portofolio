import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook to track device gyroscope (mobile) or mouse tilt (desktop)
 * Provides normalized tilt values [-1, 1] with smooth damping/interpolation.
 */
export default function useGyroscope() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hasGyro, setHasGyro] = useState(false);
  const [permissionState, setPermissionState] = useState('prompt'); // 'prompt' | 'granted' | 'denied' | 'unsupported'

  const targetTilt = useRef({ x: 0, y: 0 });
  const currentTilt = useRef({ x: 0, y: 0 });
  const hasOrientationData = useRef(false);

  // Request permission for iOS 13+ devices
  const requestPermission = useCallback(async () => {
    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof DeviceOrientationEvent.requestPermission === 'function'
    ) {
      try {
        const response = await DeviceOrientationEvent.requestPermission();
        setPermissionState(response);
        return response === 'granted';
      } catch (err) {
        console.warn('Gyroscope permission error:', err);
        setPermissionState('denied');
        return false;
      }
    }
    return true;
  }, []);

  useEffect(() => {
    // Check if DeviceOrientationEvent is supported
    if (typeof window === 'undefined') return;

    const handleOrientation = (e) => {
      // Gamma: left to right [-90, 90]
      // Beta: front to back [-180, 180]
      if (e.gamma !== null && e.beta !== null) {
        hasOrientationData.current = true;
        setHasGyro(true);

        // Normalize gamma: clamp -45 to 45 -> -1 to 1
        const clampedGamma = Math.max(-45, Math.min(45, e.gamma));
        const normX = clampedGamma / 45;

        // Normalize beta: assume viewing tilt around 45 deg, clamp 15 to 75 -> -1 to 1
        const centeredBeta = e.beta - 45;
        const clampedBeta = Math.max(-30, Math.min(30, centeredBeta));
        const normY = clampedBeta / 30;

        targetTilt.current = { x: normX, y: normY };
      }
    };

    // Desktop mouse fallback: compute virtual tilt when gyro is not active
    const handleMouseMove = (e) => {
      if (hasOrientationData.current) return; // Prioritize real gyroscope on mobile

      const w = window.innerWidth;
      const h = window.innerHeight;
      const normX = (e.clientX / w) * 2 - 1;
      const normY = (e.clientY / h) * 2 - 1;

      targetTilt.current = { x: normX, y: normY };
    };

    // Smooth animation frame loop for interpolation
    let animId;
    const updateLoop = () => {
      // Lerp current tilt towards target tilt
      const factor = 0.08;
      currentTilt.current.x += (targetTilt.current.x - currentTilt.current.x) * factor;
      currentTilt.current.y += (targetTilt.current.y - currentTilt.current.y) * factor;

      setTilt({
        x: Number(currentTilt.current.x.toFixed(4)),
        y: Number(currentTilt.current.y.toFixed(4)),
      });

      animId = requestAnimationFrame(updateLoop);
    };

    window.addEventListener('deviceorientation', handleOrientation, true);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return {
    tiltX: tilt.x,
    tiltY: tilt.y,
    hasGyro,
    permissionState,
    requestPermission,
  };
}

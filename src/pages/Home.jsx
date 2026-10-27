import useGyroscope from '../hooks/useGyroscope';
import AxonCanvas from '../components/axon/AxonCanvas';
import AxonUI from '../components/axon/AxonUI';

export default function Home() {
  const { tiltX, tiltY, hasGyro, permissionState, requestPermission } = useGyroscope();

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black select-none">
      {/* Background WebGL GPU Particle Cloud & 2D Fluid Simulation */}
      <AxonCanvas tiltX={tiltX} tiltY={tiltY} />

      {/* Glossy Monospace UI Layer with Gyroscope / Tilt Tracking */}
      <AxonUI
        tiltX={tiltX}
        tiltY={tiltY}
        hasGyro={hasGyro}
        permissionState={permissionState}
        onRequestPermission={requestPermission}
      />
    </main>
  );
}

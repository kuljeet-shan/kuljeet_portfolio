import { Suspense, ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";

interface SectionCanvasProps {
  children: ReactNode;
  className?: string;
  camera?: { position?: [number, number, number]; fov?: number };
  lowPower?: boolean;
}

/**
 * Lightweight canvas for background 3D effects behind UI sections.
 * Always pointer-events-none so it doesn't block UI interaction.
 */
export const SectionCanvas = ({
  children,
  className = "",
  camera = { position: [0, 0, 10], fov: 60 },
  lowPower = true,
}: SectionCanvasProps) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: camera.position, fov: camera.fov }}
        dpr={[1, 1.2]}
        gl={{
          antialias: false,
          powerPreference: lowPower ? "low-power" : "default",
          alpha: true,
        }}
      >
        <Suspense fallback={null}>
          {children}
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};

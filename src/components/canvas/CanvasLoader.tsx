import { Html, useProgress } from "@react-three/drei";

export const CanvasLoader = () => {
  const { progress } = useProgress();
  return (
    <Html as="div" center>
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
        <p className="text-cyan-400 text-xs font-mono">
          {progress.toFixed(0)}%
        </p>
      </div>
    </Html>
  );
};

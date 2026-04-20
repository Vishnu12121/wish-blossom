import { Canvas } from "@react-three/fiber";
import { Stars, Sparkles } from "@react-three/drei";
import { Suspense } from "react";

/** Lightweight cosmic backdrop for inner pages (no heavy meshes). */
export default function StarryBackdrop() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 60 }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <Stars radius={60} depth={50} count={2200} factor={3.5} saturation={0.4} fade speed={0.4} />
        <Sparkles count={50} scale={[12, 8, 4]} size={2.5} speed={0.3} color="#ffd6ec" />
      </Suspense>
    </Canvas>
  );
}

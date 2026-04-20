import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, Sphere, Torus, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

function Moon() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.1;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={ref} position={[-2.6, 1.2, 0]}>
        <sphereGeometry args={[1.1, 64, 64]} />
        <meshStandardMaterial
          color="#f5e6c8"
          emissive="#ffd9a3"
          emissiveIntensity={0.35}
          roughness={0.85}
          metalness={0.05}
        />
      </mesh>
      <pointLight position={[-2.6, 1.2, 1]} intensity={2.5} color="#ffd9a3" distance={6} />
    </Float>
  );
}

function Planet() {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.z += delta * 0.15;
  });
  return (
    <Float speed={0.8} rotationIntensity={0.4} floatIntensity={0.8}>
      <group position={[2.4, -0.6, 0]}>
        <Sphere args={[0.85, 64, 64]}>
          <MeshDistortMaterial
            color="#e08aa8"
            emissive="#c25d8a"
            emissiveIntensity={0.25}
            distort={0.25}
            speed={1.5}
            roughness={0.4}
          />
        </Sphere>
        <group ref={group} rotation={[Math.PI / 2.4, 0, 0]}>
          <Torus args={[1.4, 0.05, 16, 100]}>
            <meshStandardMaterial color="#f3d7a8" emissive="#e0b078" emissiveIntensity={0.4} />
          </Torus>
          <Torus args={[1.6, 0.03, 16, 100]}>
            <meshStandardMaterial color="#d8b8e8" emissive="#9c7ec8" emissiveIntensity={0.3} transparent opacity={0.7} />
          </Torus>
        </group>
      </group>
    </Float>
  );
}

function Heart({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.5 + position[0]) * 0.3;
      ref.current.position.y = position[1] + Math.sin(clock.elapsedTime + position[0]) * 0.15;
    }
  });

  // Heart shape
  const heartShape = new THREE.Shape();
  const x = 0, y = 0;
  heartShape.moveTo(x + 0.25, y + 0.25);
  heartShape.bezierCurveTo(x + 0.25, y + 0.25, x + 0.2, y, x, y);
  heartShape.bezierCurveTo(x - 0.3, y, x - 0.3, y + 0.35, x - 0.3, y + 0.35);
  heartShape.bezierCurveTo(x - 0.3, y + 0.55, x - 0.1, y + 0.77, x + 0.25, y + 0.95);
  heartShape.bezierCurveTo(x + 0.6, y + 0.77, x + 0.8, y + 0.55, x + 0.8, y + 0.35);
  heartShape.bezierCurveTo(x + 0.8, y + 0.35, x + 0.8, y, x + 0.5, y);
  heartShape.bezierCurveTo(x + 0.35, y, x + 0.25, y + 0.25, x + 0.25, y + 0.25);

  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={ref} position={position} scale={scale}>
        <extrudeGeometry args={[heartShape, { depth: 0.15, bevelEnabled: true, bevelSize: 0.05, bevelThickness: 0.05, bevelSegments: 4 }]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} roughness={0.3} metalness={0.4} />
      </mesh>
    </Float>
  );
}

export default function CosmicScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#e8d5ff" />
        <pointLight position={[-5, -3, -2]} intensity={1.2} color="#ff9ec7" />

        <Stars radius={50} depth={40} count={3000} factor={4} saturation={0.5} fade speed={0.6} />
        <Sparkles count={80} scale={[10, 6, 4]} size={3} speed={0.4} color="#fff5d6" />

        <Moon />
        <Planet />

        <Heart position={[-3.5, -1.8, 1]} color="#ff9ec7" scale={0.5} />
        <Heart position={[3.2, 1.8, -1]} color="#d8b8e8" scale={0.4} />
        <Heart position={[0, -2.2, 0.5]} color="#ffb8d4" scale={0.35} />
        <Heart position={[1.5, 2.4, -0.5]} color="#c8a8e8" scale={0.3} />
      </Suspense>
    </Canvas>
  );
}

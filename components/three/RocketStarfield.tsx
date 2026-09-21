"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, useTexture } from "@react-three/drei";
import * as THREE from "three";

function Rocket() {
  const texture = useTexture("/brand/rocket.png");
  const meshRef = useRef<THREE.Mesh>(null);
  const scrollStart = useRef<number | null>(null);

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    if (scrollStart.current === null) scrollStart.current = window.scrollY;
    const scrollDelta = window.scrollY - scrollStart.current;
    // Launch drift: rocket climbs and eases into a gentle tilt as the hero scrolls away.
    const launch = Math.min(Math.max(scrollDelta / 600, 0), 1);

    const t = clock.getElapsedTime();
    mesh.position.y = launch * 2.2 + Math.sin(t * 0.8) * 0.08;
    mesh.position.x = Math.sin(t * 0.5) * 0.12;
    mesh.rotation.z = -launch * 0.35 + Math.sin(t * 0.6) * 0.03;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2.4, 2.4]} />
      <meshBasicMaterial map={texture} transparent depthWrite={false} />
    </mesh>
  );
}

export default function RocketStarfield() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 0, 5], fov: 45 }}
      className="pointer-events-none"
    >
      <Stars radius={60} depth={50} count={600} factor={0.8} saturation={0} fade speed={0.3} />
      <Rocket />
    </Canvas>
  );
}

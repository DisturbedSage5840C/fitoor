"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { categoryList, categoryIcons } from "@/data/categories";

const RADIUS = 2.4;

function Cluster() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.18;
  });

  return (
    <group ref={groupRef}>
      {categoryList.map((category, i) => {
        const angle = (i / categoryList.length) * Math.PI * 2;
        const Icon = categoryIcons[category.slug];
        return (
          <group
            key={category.slug}
            position={[Math.sin(angle) * RADIUS, 0, Math.cos(angle) * RADIUS]}
          >
            <Html center distanceFactor={7} occlude={false}>
              <div
                data-category={category.slug}
                className="flex flex-col items-center gap-2 rounded-2xl border border-category bg-maroon/90 px-4 py-5 text-center shadow-[0_18px_40px_-16px_rgba(0,0,0,0.7)]"
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-category/20 text-category-light">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="font-display text-sm whitespace-nowrap text-cream">
                  {category.name}
                </span>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

export default function IconClusterScene() {
  return (
    <Canvas dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }} camera={{ position: [0, 1.6, 5.5], fov: 45 }}>
      <Cluster />
    </Canvas>
  );
}

"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function drawPageTexture() {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.fillStyle = "#3a0a10";
  ctx.fillRect(0, 0, size, size);
  ctx.strokeStyle = "#e8c77e";
  ctx.lineWidth = 6;
  ctx.strokeRect(14, 14, size - 28, size - 28);
  ctx.fillStyle = "rgba(245, 233, 211, 0.85)";
  ctx.font = "600 22px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("FITOOR '26", size / 2, size / 2 - 10);
  ctx.font = "400 14px sans-serif";
  ctx.fillStyle = "rgba(245, 233, 211, 0.55)";
  ctx.fillText("brand guide, pg. 03", size / 2, size / 2 + 18);

  return new THREE.CanvasTexture(canvas);
}

function Page() {
  const meshRef = useRef<THREE.Mesh>(null);
  const textureRef = useRef<THREE.CanvasTexture | null>(null);
  const { gl } = useThree();
  if (!textureRef.current) textureRef.current = drawPageTexture();

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const rect = gl.domElement.getBoundingClientRect();
    const viewportH = window.innerHeight;
    // 0 as the section enters from the bottom, 1 once it has scrolled fully past the top.
    const progress = Math.min(Math.max((viewportH - rect.top) / (viewportH + rect.height), 0), 1);
    mesh.rotation.y = -progress * Math.PI * 0.85;
    mesh.position.x = -progress * 0.7;
    mesh.position.z = Math.sin(progress * Math.PI) * 0.3;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2.6, 3.2]} />
      <meshBasicMaterial map={textureRef.current} side={THREE.DoubleSide} transparent />
    </mesh>
  );
}

export default function PageTurn() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 0, 5], fov: 40 }}
      className="pointer-events-none"
    >
      <Page />
    </Canvas>
  );
}

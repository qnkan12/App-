"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  Environment,
  Lightformer,
  MeshTransmissionMaterial,
  MeshDistortMaterial,
  Stars,
  AdaptiveDpr,
} from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { Suspense, useRef } from "react";
import * as THREE from "three";

type Quality = "high" | "low";

/* Parallax rig — gently follows pointer */
function Rig({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state, _delta) => {
    const g = ref.current;
    if (!g) return;
    const tx = state.pointer.x * 0.35;
    const ty = -state.pointer.y * 0.22;
    g.rotation.y += (tx - g.rotation.y) * 0.035;
    g.rotation.x += (ty - g.rotation.x) * 0.035;
    g.position.x += (state.pointer.x * 0.3 - g.position.x) * 0.03;
    g.position.y += (state.pointer.y * 0.2 - g.position.y) * 0.03;
  });
  return <group ref={ref}>{children}</group>;
}

function GlassBlob({ quality }: { quality: Quality }) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.12;
      mesh.current.rotation.x += delta * 0.04;
    }
  });
  return (
    <Float speed={1.1} rotationIntensity={0.5} floatIntensity={1.4}>
      <mesh ref={mesh} scale={1.7}>
        <icosahedronGeometry args={[1, quality === "high" ? 24 : 10]} />
        <MeshTransmissionMaterial
          backside={quality === "high"}
          samples={quality === "high" ? 6 : 3}
          resolution={quality === "high" ? 256 : 128}
          thickness={1.3}
          chromaticAberration={0.08}
          anisotropy={0.25}
          distortion={0.35}
          distortionScale={0.4}
          temporalDistortion={0.15}
          ior={1.18}
          roughness={0.06}
          color="#d6ecff"
          attenuationColor="#5b8cff"
          attenuationDistance={1.4}
        />
      </mesh>
    </Float>
  );
}

function AccentOrb({
  position,
  color,
  scale,
  speed,
}: {
  position: [number, number, number];
  color: string;
  scale: number;
  speed: number;
}) {
  return (
    <Float speed={speed} rotationIntensity={1.2} floatIntensity={2}>
      <mesh position={position} scale={scale}>
        <sphereGeometry args={[1, 48, 48]} />
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.45}
          roughness={0.15}
          metalness={0.7}
          distort={0.35}
          speed={1.6}
        />
      </mesh>
    </Float>
  );
}

function WireRing() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.z += delta * 0.08;
      ref.current.rotation.x = Math.PI / 2.6;
    }
  });
  return (
    <mesh ref={ref} scale={3.4}>
      <torusGeometry args={[1, 0.004, 16, 120]} />
      <meshBasicMaterial color="#5b8cff" transparent opacity={0.25} />
    </mesh>
  );
}

function SceneContents({ quality }: { quality: Quality }) {
  const { viewport } = useThree();
  return (
    <Rig>
      <GlassBlob quality={quality} />
      <AccentOrb position={[-3.2, 1.4, -1]} color="#2dd4ff" scale={0.42} speed={1.3} />
      <AccentOrb position={[3.1, -1.2, -0.5]} color="#a371ff" scale={0.32} speed={1.6} />
      <AccentOrb position={[2.4, 1.9, -2]} color="#5b8cff" scale={0.22} speed={1.1} />
      <WireRing />
      <Stars
        radius={Math.max(60, viewport.width * 14)}
        depth={50}
        count={quality === "high" ? 3200 : 1200}
        factor={4}
        saturation={0}
        fade
        speed={0.8}
      />
    </Rig>
  );
}

export default function Scene({ quality = "high" }: { quality?: Quality }) {
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, quality === "high" ? 2 : 1.4]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 7], fov: 42 }}
      performance={{ min: 0.5 }}
    >
      <fog attach="fog" args={["#050505", 7, 20]} />
      <ambientLight intensity={0.35} />
      <pointLight position={[6, 4, 6]} intensity={2.2} color="#5b8cff" />
      <pointLight position={[-6, -3, -4]} intensity={1.8} color="#a371ff" />
      <pointLight position={[0, 5, -6]} intensity={1.2} color="#2dd4ff" />
      <Suspense fallback={null}>
        <SceneContents quality={quality} />
        <Environment resolution={256}>
          <group rotation={[0, 0, 0]}>
            <Lightformer form="rect" intensity={2} color="#5b8cff" position={[-5, 2, -5]} scale={[8, 8, 1]} />
            <Lightformer form="circle" intensity={3} color="#2dd4ff" position={[5, 3, 2]} scale={4} />
            <Lightformer form="rect" intensity={1.4} color="#a371ff" position={[0, -4, 4]} scale={[10, 4, 1]} />
            <Lightformer form="ring" intensity={1.6} color="#ffffff" position={[3, -2, -3]} scale={3} />
          </group>
        </Environment>
      </Suspense>
      <AdaptiveDpr pixelated />
      <EffectComposer enableNormalPass={false} multisampling={quality === "high" ? 4 : 0}>
        <Bloom
          intensity={0.9}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          mipmapBlur
          radius={0.75}
        />
        <Vignette eskil={false} offset={0.25} darkness={0.82} />
      </EffectComposer>
    </Canvas>
  );
}

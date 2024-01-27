'use client'
import { OrbitControls, Point, Points } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import colors from "nice-color-palettes";
import React, { Suspense, useRef } from "react";
import * as THREE from "three";
import { AnimatedGalaxyMaterial } from "./shader";

const palette = colors[Math.floor(Math.random() * colors.length)];

const  count =  2500
const  size =  30
const  radius =  25
const  branches =  5
const  randomness =  0.1
const  randomnessPower =  8
const  rotationSpeed =  0.2
const  insideColor =  palette[0]
const  outsideColor =  palette[1 + Math.floor(Math.random() * (palette.length - 2))]

function Galaxy() {
  // const {
  //   count,
  //   size,
  //   rotationSpeed,
  //   radius,
  //   branches,
  //   randomness,
  //   randomnessPower,
  //   insideColor,
  //   outsideColor
  // } = controls
  const particlesRef = useRef();
  const shaderRef = useRef();

  const viewport = useThree(({ viewport }) => viewport);

  useFrame((state, delta) => {
    particlesRef.current.rotation.y =
      state.clock.getElapsedTime() * rotationSpeed;
    if (shaderRef.current) shaderRef.current.uTime += delta;
  });

  return (
    <Points ref={particlesRef} limit={10000}>
      <animatedGalaxyMaterial
        ref={shaderRef}
        uSize={size * viewport.dpr}
        key={AnimatedGalaxyMaterial.key}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
      />
      {Array.from({ length: count }).map((_, i) => {
        const pRadius = Math.random() * radius;
        const bAngle = ((i % branches) / branches) * Math.PI * 2;
        const rndX =
          Math.pow(Math.random(), randomnessPower) *
          (Math.random() > 0.5 ? 1 : -1) *
          randomness *
          radius;
        const rndY =
          Math.pow(Math.random(), randomnessPower) *
          (Math.random() > 0.5 ? 1 : -1) *
          randomness *
          radius;
        const rndZ =
          Math.pow(Math.random(), randomnessPower) *
          (Math.random() > 0.5 ? 1 : -1) *
          randomness *
          radius;
        const position = [
          Math.cos(bAngle) * pRadius + rndX,
          rndY,
          Math.sin(bAngle) * pRadius + rndZ
        ];
        const color = new THREE.Color(insideColor).lerp(
          new THREE.Color(outsideColor),
          pRadius / radius
        );

        const scale = Math.random();

        return <Point key={i} position={position} color={color} size={scale} />;
      })}
    </Points>
  );
}

export default function Experience(props) {
  return (
    <Canvas dpr={[1, 2]} {...props}>
      <color attach="background" args={["black"]} />
      <OrbitControls makeDefault />
      <ambientLight />
      <Suspense fallback={null}>
        <Galaxy />
      </Suspense>
    </Canvas>
  );
}

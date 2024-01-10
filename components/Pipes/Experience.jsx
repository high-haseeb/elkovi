"use client"
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import React, { Suspense } from "react";
import Background from "./Background";
import Walls from "./Walls";
import Pipes from "./Pipes";

const Experience = () => {
  return (
    <div className="rounded-3xl w-full my-10 h-full">
      <Suspense fallback={<div>Loading...</div>}>
        <Canvas className="rounded-3xl">
          <Environment preset="studio" />
          <Physics gravity={[0,0,0]} debug colliders={false}>
            <Walls />
            <Pipes/>
          </Physics>
          <Background />
          <OrbitControls/>
        </Canvas>
      </Suspense>
    </div>
  );
};

export default Experience;

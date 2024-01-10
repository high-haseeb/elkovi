"use client";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import { Amanda } from "./Character";
import { Environment, OrbitControls, ScrollControls } from "@react-three/drei";

const Footer = () => {
  return (
    <div className="w-full h-screen">
      <Suspense fallback={<div>Loading..</div>}>
        <Canvas>
          <Environment preset="forest"/>
          <directionalLight position={[0, 1, 0]} intensity={2}/>
          <Amanda scale={3} position={[0,-3,0]} />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default Footer;

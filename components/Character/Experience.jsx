"use client";
import { Canvas } from "@react-three/fiber";
import React  from "react";
import  Astronaut  from "./Character";
import { Environment } from "@react-three/drei";

const Footer = () => {
  return (
    <div className="w-full h-screen">
        <Canvas>
          <Environment preset="forest"/>
          <directionalLight position={[0, 1, 0]} intensity={2}/>
          <Astronaut scale={3} position={[0,-3,0]} />
        </Canvas>
    </div>
  );
};

export default Footer;

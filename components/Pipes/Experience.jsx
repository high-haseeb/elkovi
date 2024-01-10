"use client"
import { Environment, OrbitControls, OrthographicCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import React, { Suspense, useState } from "react";
import Background from "./Background";
import Walls from "./Walls";
import Pipes from "./Pipes";


const getRandomColor = () => {
  const colors = ["black", "silver", "gold", "darkred"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const Experience = () => {

  const aspect = window.innerWidth / window.innerHeight;
  const cameraProps = {
    left: -10 * aspect,   // Set left boundary of the viewing frustum
    right: 10 * aspect,   // Set right boundary of the viewing frustum
    top: 10,     // Set top boundary of the viewing frustum
    bottom: -10, // Set bottom boundary of the viewing frustum
    near: 0.01,  // Set near clipping plane
    far: 10000,  // Set far clipping plane
  };
  const [pipeColor, setPipeColor] = useState("black");
  return (
    <div className="rounded-3xl w-full my-10 h-full">
      <Suspense fallback={<div>Loading...</div>}>
        <Canvas className="rounded-3xl" onClick={() => setPipeColor(getRandomColor())}>
          <OrthographicCamera makeDefault debug position={[0,0,50]} {...cameraProps}/>
          <Environment preset="studio" />
          <Physics gravity={[0,0,0]} colliders={false}>
            <Walls />
            <Pipes itemColor={pipeColor} count={15}/>
          </Physics>
          <Background colorA={pipeColor}/>
          <OrbitControls/>
        </Canvas>
      </Suspense>
    </div>
  );
};

export default Experience;

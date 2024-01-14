"use client";
import {
  Environment,
  OrbitControls,
  OrthographicCamera,
} from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import React, { useEffect, useRef, useState } from "react";
import Background from "./Background";
import Walls from "./Walls";
import Pipes from "./Pipes";

let currentIndex = 0;
const colors = ["#EE82EE", "pink", "darkred", "#FFC72C"];
const getRandomColor = () => {
  const currentColor = colors[currentIndex];
  currentIndex = (currentIndex + 1) % colors.length; // Cycle to the next color
  return currentColor;
};

const Experience = () => {
  const [pipeColor, setPipeColor] = useState("#FFC72C");
  return (
    <div className="rounded-xl lg:rounded-3xl w-full h-full ">
      <Canvas
        className="rounded-xl lg:rounded-3xl"
        onClick={() => setPipeColor(getRandomColor())}
        gl={{ antialias: true }}
        camera={{fov:100, zoom:70, position:[0,0,-350]}}
      >
        <Environment preset="studio" />
        <Physics gravity={[0, 0, 0]} colliders={false}>
          <Walls />
          <Pipes itemColor={pipeColor} count={10} />
        </Physics>
        <Background colorA={pipeColor} />
      </Canvas>
    </div>
  );
};

export default Experience;

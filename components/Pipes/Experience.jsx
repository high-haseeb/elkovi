"use client";
import {
  Environment,
  OrbitControls,
  OrthographicCamera,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import React, { Suspense, useEffect, useState } from "react";
import Background from "./Background";
import Walls from "./Walls";
import Pipes from "./Pipes";

// const getRandomColor = () => {
//   const colors = ["black", "blue", "darkred"];
//   return colors[Math.floor(Math.random() * colors.length)];
// };

let currentIndex = 0;
const colors = ["black", "blue", "darkred"];
const getRandomColor = () => {
  const currentColor = colors[currentIndex];
  currentIndex = (currentIndex + 1) % colors.length; // Cycle to the next color
  return currentColor;
};

const useWidth = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const handleResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return width / height;
};
const Experience = () => {
  const aspect = useWidth();
  const cameraProps = {
    left: -10 * aspect, // Set left boundary of the viewing frustum
    right: 10 * aspect, // Set right boundary of the viewing frustum
    top: 10, // Set top boundary of the viewing frustum
    bottom: -10, // Set bottom boundary of the viewing frustum
    near: 0.01, // Set near clipping plane
    far: 10000, // Set far clipping plane
  };
  const [pipeColor, setPipeColor] = useState("black");
  return (
    <div className="rounded-3xl w-full my-10 h-full">
      <Suspense fallback={<div>Loading...</div>}>
        <Canvas
          className="rounded-3xl"
          onClick={() => setPipeColor(getRandomColor())}
          gl={{ antialias: true, pixelRatio: devicePixelRatio }}
        >
          <pointLight color={"red"} intensity={100} postition={[0, 0, 0]} />
          <OrthographicCamera
            makeDefault
            position={[0, 0, 60]}
            {...cameraProps}
          />
          <Environment preset="studio" />
          <Physics gravity={[0, 0, 0]} colliders={false}>
            <Walls />
            <Pipes itemColor={pipeColor} count={10} />
          </Physics>
          <Background colorA={pipeColor} />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default Experience;

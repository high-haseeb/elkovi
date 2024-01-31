'use client'
import { Canvas, useFrame } from "@react-three/fiber";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { fetchData } from "@/components/Loaders/loader";
import * as THREE from "three";

const Scene = () => {
  return (
    <Canvas>
      <Particles />
      <Stars />
    </Canvas>
  );
};

export default Scene;
const Particles = () => {
  const ref = useRef();

  useEffect(() => {
    fetchData("/assets/cross.buf").then((mesh) => (ref.current.geometry = mesh.geometry));
  }, []);
  useFrame(() => {
    if (ref.current) ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z += 0.01;
  });

  return (
    <points ref={ref} castShadow receiveShadow scale={2}>
      <pointsMaterial size={0.01} attach={"material"} />
    </points>
  );
};
const Stars = () => {
  const ref = useRef();
  const starsGeometry = new THREE.BufferGeometry();
  const starsCount = 4000;
  const starsPositionArray = new Float32Array(starsCount * 3);
  for (let i = 0; i < starsCount * 3; i++) {
    starsPositionArray[i] = (Math.random() - 0.5) * 10;
  }
  starsGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starsPositionArray, 3));
  const mousePos = useRef({ x: 0, y: 0 });
  useEffect(() => {
    if (ref.current) ref.current.geometry = starsGeometry;
    
    const handleMouseMove = (event) => {
      mousePos.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);

  }, [ref.current]);
  useFrame((_, delta) => {
    ref.current.rotation.x = -mousePos.current.x
    ref.current.rotation.y = -mousePos.current.y
    ref.current.rotation.z += delta * 0.05;
  });
  return (
    <points ref={ref}>
      <pointsMaterial size={0.003} />
    </points>
  );
};

// function Model({ children, color = 'white', roughness = 0, ...props }) {
//   const ref = useRef()
//
//   useEffect(() => {
//     fetchData("/assets/cross.buf").then((mesh) =>
//       ref.current.geometry = mesh.geometry
//     );
//   }, []);
//
//   useLayoutEffect(() => {
//     ref.current.material.color.set(color)
//   }, [color])
//
//   return (
//     <mesh ref={ref} castShadow receiveShadow scale={1} >
//       <meshStandardMaterial metalness={0.2} roughness={roughness} /* map={materials.base.map} */ />
//       {children}
//     </mesh>
//   )
// }

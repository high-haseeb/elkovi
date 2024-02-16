'use client'
import { Canvas, useFrame } from "@react-three/fiber";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { fetchData } from "@/components/Loaders/loader";
import * as THREE from "three";
import { OrbitControls,  ScrollControls, useScroll } from "@react-three/drei";

const Scene = () => {
  return (
    <Canvas className="w-full h-full">
      {/* <Particles /> */}
      <ScrollControls pages={2} damping={1} maxSpeed={1} >
        <Stars />
      </ScrollControls >
      <OrbitControls enableZoom={false}/>
    </Canvas>
  );
};

export default Scene;
const Particles = () => {
  const ref = useRef();

  // useEffect(() => {
  //   fetchData("/assets/cross.buf").then((mesh) => (ref.current.geometry = mesh.geometry));
  // }, []);
  const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
  useEffect(() => {
    console.log(sphereGeometry)
    ref.current.geometry = sphereGeometry
  }, [])

  // useFrame(() => {
  //   if (ref.current) ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z += 0.01;
  // });

  return (
    <points ref={ref} castShadow receiveShadow scale={2}>
      <pointsMaterial size={0.05} attach={"material"} />
    </points>
  );
};
const Stars = () => {
  const ref = useRef();
  const starsGeometry = new THREE.BufferGeometry();
  const initialGeometry = new THREE.SphereGeometry(2, 64, 64);
  const scrollObject = useScroll();
  let  finalGeometry = undefined;
  fetchData('/assets/cross.buf').then(mesh => {
    finalGeometry = mesh.geometry;
  })

  starsGeometry.setAttribute("position", new THREE.Float32BufferAttribute(initialGeometry.attributes.position.array, 3));

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

  let dt = scrollObject.scroll.current 
  const initArray = initialGeometry.attributes.position.array
  const posArray = new Float32Array(initArray.length);
  posArray.set(initArray)
  useFrame((_, delta) => {
    if(finalGeometry !== undefined){
      const finalArray = finalGeometry.attributes.position.array
      let dir = Math.sign(scrollObject.__damp.velocity_offset)
      for(let i = 0; i < initArray.length; ++i){
        if(scrollObject.scroll.current < 0.5){
          posArray[i] += (dir > 0 ? ((finalArray[i] * 2) - posArray[i]) : (initArray[i] - posArray[i])) * scrollObject.scroll.current * 0.5
        }else{
          posArray[i] += (dir > 0 ? (-(finalArray[i] * 2) + posArray[i]) : (initArray[i] - posArray[i])) * scrollObject.scroll.current * 0.5
        }
      }
      starsGeometry.setAttribute("position", new THREE.Float32BufferAttribute(posArray, 3));
    }
    ref.current.rotation.x = -mousePos.current.y 
    ref.current.rotation.y = mousePos.current.x

  });
  return (
    <points ref={ref}>
      <pointsMaterial size={0.02} />
    </points>
  );
};


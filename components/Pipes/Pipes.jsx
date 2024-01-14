"use client";
import { MeshRefractionMaterial, useGLTF, useTexture } from "@react-three/drei";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { CuboidCollider, InstancedRigidBodies } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { MeshReflectorMaterial } from "@react-three/drei/materials/MeshReflectorMaterial";

function Pipes({ itemColor, count }) {
  const [hovered, set] = useState();
  const rigidBodies = useRef(null);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const handleMoueMove = (e) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: (e.clientY / window.innerHeight) * 2 - 1,
    });
  };

  useEffect(() => {
    document.addEventListener("mousemove", (e) => handleMoueMove(e));
    return document.removeEventListener("mousemove", handleMoueMove);
  }, []);

  useEffect(() => {
    jiggle();

    for (let i = 0; i < count; i++) {
      ref.current.setColorAt(i, new THREE.Color(getRandomColor()));
    }
    ref.current.instanceColor.needsUpdate = true;
  }, [itemColor]);

  const centerForceScale = 2;
  const mouseForceScale = 100;
  const jiggle = () => {
    const jiggleScale = 10000;
    for (let i = 0; i < count; i++) {
      rigidBodies.current[i].applyTorqueImpulse({
        x: Math.random() * jiggleScale,
        y: Math.random() * jiggleScale,
        z: Math.random() * jiggleScale,
      });
      rigidBodies.current[i].applyImpulse({
        x: Math.random() * jiggleScale,
        y: Math.random() * jiggleScale,
        z: Math.random() * jiggleScale,
      });
    }
  };
  const ref = useRef();
  const getRandomColor = () => {
    const colors = ["black", "white", itemColor];
    return colors[Math.floor(Math.random() * colors.length)];
  };


  useFrame(() => {

    for (let i = 0; i < count; i++) {
      // console.log(ref.current.material)
      let bodyPosition = rigidBodies.current[i].translation();
      rigidBodies.current[i].applyImpulse({
        x: -bodyPosition.x * centerForceScale,
        y: -bodyPosition.y * centerForceScale,
        // z: -bodyPosition.z * centerForceScale,
        z: 0,
      });
      if (hovered) {
        rigidBodies.current[hovered].applyImpulse(
          {
            x: -mousePosition.x * mouseForceScale,
            y: mousePosition.y * mouseForceScale,
            z: Math.random() * mouseForceScale,
          },
          true,
        );
      }
    }
  });

  let SCALE = 1;

  const randomRange = (limit) =>{
    return (Math.random() * 2 * limit) - limit;
  }
  const instances = useMemo(() => {
    const instances = [];

    for (let i = 0; i < count; i++) {
      instances.push({
        key: "instance_" + Math.random(),
        position: [Math.random() * 9, Math.random() * 9, randomRange(6)],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ],
        scale: [SCALE, SCALE, SCALE],
      });
    }
    return instances;
  }, []);

  const colliderScale = 3;

  const asphalt = useTexture({
    map: '/textures/asphalt/asphalt_01_diff_1k.jpg',
    // displacementMap: '/textures/asphalt/asphalt_01_disp_1k.jpg',
    normalMap : '/textures/asphalt/asphalt_01_nor_gl_1k.jpg',
    roughnessMap : '/textures/asphalt/asphalt_01_rough_1k.jpg',
    metallnessMap : '/textures/asphalt/asphalt_01_arm_1k.jpg',
    aoMap : '/textures/asphalt/asphalt_01_arm_1k.jpg'
  })
  const { nodes } = useGLTF("/pipe.glb");

  return (
    <InstancedRigidBodies
      ref={rigidBodies}
      instances={instances}
      colliderNodes={[
        <CuboidCollider args={[colliderScale, 1, 1]} />,
        <CuboidCollider args={[1, colliderScale, 1]} />,
        <CuboidCollider args={[1, 1, colliderScale]} />,
      ]}
      linearDamping={2}
      angularDamping={1}
      colliders={false}
    >
      <instancedMesh
        ref={ref}
        args={[nodes.Cross.geometry, undefined, count]}
        onPointerMove={(e) => {
          e.stopPropagation();
          set(e.instanceId);
        }}
        onPointerOut={(e) => set(undefined)}
      >
        <meshStandardMaterial  {...asphalt} />
        {/* <meshStandardMaterial/> */}
      </instancedMesh>
    </InstancedRigidBodies>
  );
}

export default Pipes;

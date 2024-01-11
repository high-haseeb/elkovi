"use client";
import { useGLTF } from "@react-three/drei";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  BallCollider,
  CuboidCollider,
  InstancedRigidBodies,
} from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function normalize(value, minValue = -1, maxValue = 1) {
  return ((value - minValue) / (maxValue - minValue)) * 2 - 1;
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
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
  }, [itemColor]);

  const centerForceScale = 2;
  const mouseForceScale = 100;
  const jiggle = () => {
    const jiggleScale = 10000;
    for (let i = 0; i < count; i++) {
      rigidBodies.current[i].applyImpulse({
        x: Math.random() * jiggleScale,
        y: Math.random() * jiggleScale,
        z: Math.random() * jiggleScale,
      });
    }
  };
  useFrame(() => {
    for (let i = 0; i < count; i++) {
      let bodyPosition = rigidBodies.current[i].translation();
      rigidBodies.current[i].applyImpulse({
        x: -bodyPosition.x * centerForceScale,
        y: -bodyPosition.y * centerForceScale,
        // z: -bodyPosition.z * centerForceScale,
        z:0,
      });
      if (hovered == i) {
        rigidBodies.current[i].applyImpulse(
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

  let SCALE = 1.3;
  const instances = useMemo(() => {
    const instances = [];

    // initialize instances
    for (let i = 0; i < count; i++) {
      instances.push({
        key: "instance_" + Math.random(),
        position: [Math.random() * 10, Math.random() * 10, Math.random() * 10],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ],
        scale: [SCALE, SCALE, SCALE],
        color: 'green'
      });
    }
    return instances;
  }, []);

  const { nodes } = useGLTF("/pipe.glb");
  const colliderScale = 2.5;
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
        args={[nodes.Cross.geometry, undefined, count]}
        onPointerMove={(e) => (e.stopPropagation(), set(e.instanceId))}
        onPointerOut={(e) => set(undefined)}
      >

        <meshPhysicalMaterial
          attach={"material"}
          roughness={0.1}
          metalness={0.9}
          color={itemColor}
        />
      </instancedMesh>
    </InstancedRigidBodies>
  );
}

export default Pipes;

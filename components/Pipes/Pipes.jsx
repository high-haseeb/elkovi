"use client";
import { useGLTF } from "@react-three/drei";
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  BallCollider,
  CuboidCollider,
  InstancedRigidBodies,
} from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";


const getRandomColor = () => {
  const colors = ["black", "white", "yellow"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const COUNT = 10;

function Pipes() {
  const [hovered, set] = useState();

  const rigidBodies = useRef(null);

  useEffect(() => {
    if (!rigidBodies.current) {
      return;
    }
    // rigidBodies.current.forEach((api) => {
    //   api.applyImpulse({ x: 0, y: 10, z: 0 }, true);
    // });
  }, []);
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
  useFrame(()=> {
    if (!rigidBodies.current) {
      return;
    }
    for(let i = 0; i < COUNT; i++){
      if(hovered == i){
        let force = getRandomInt(-100, 100)
        console.log(force)
        rigidBodies.current[i].applyImpulse({x:force, y:force,  z:force}, true);
      }
    }
    rigidBodies.current.forEach((api) => {
      // api.applyImpulse({ x: 0, y: 0.5, z: 0 }, true);
    });
  })

  const instances = useMemo(() => {
    const instances = [];

    for (let i = 0; i < COUNT; i++) {
      instances.push({
        key: "instance_" + Math.random(),
        position: [Math.random() * 10, Math.random() * 10, Math.random() * 10],
        rotation: [Math.random(), Math.random(), Math.random()],
      });
    }

    return instances;
  }, []);

  const { nodes } = useGLTF("/pipe.glb");

  return (
    <InstancedRigidBodies ref={rigidBodies} instances={instances} colliderNodes={[
      <CuboidCollider args={ [2,1,1] }/>,
      <CuboidCollider args={ [1,2,1] }/>,
      <CuboidCollider args={ [1,1,2] }/>
    ]}  colliders={false}>
      <instancedMesh args={[nodes.Cross.geometry, undefined, COUNT]}
      onPointerMove={(e) => (e.stopPropagation(), set(e.instanceId))}
      onPointerOut={(e) => set(undefined)}>
        <meshStandardMaterial color={"black"} attach={"material"} />
      </instancedMesh>
    </InstancedRigidBodies>
  );
}

export default Pipes;

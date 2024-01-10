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



function Pipes({itemColor, count}) {
  const [hovered, set] = useState();

  const rigidBodies = useRef(null);

  useEffect(() => {
    if (!rigidBodies.current) {
      return;
    }
    rigidBodies.current.forEach((api) => {
      api.applyImpulse({ x: 0, y: -1, z: 0 }, true);
    });
  }, []);
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
  useFrame(()=> {
    if (!rigidBodies.current) {
      return;
    }
    for(let i = 0; i < count; i++){
      if(hovered == i){
        rigidBodies.current[i].applyImpulse({x:getRandomInt(-100, 100), y:getRandomInt(-100,100),  z:getRandomInt(-100,100)}, true);
      }
    }
  })

  let SCALE = 1.3;
  const instances = useMemo(() => {
    const instances = [];

    for (let i = 0; i < count; i++) {
      instances.push({
        key: "instance_" + Math.random(),
        position: [Math.random() * 10, Math.random() * 10, Math.random() * 10],
        rotation: [Math.random(), Math.random(), Math.random()],
        scale:[SCALE, SCALE, SCALE]
      });
    }

    return instances;
  }, []);


  SCALE *= SCALE;
  const { nodes } = useGLTF("/pipe.glb");

  return (
    <InstancedRigidBodies ref={rigidBodies} instances={instances} colliderNodes={[
      <CuboidCollider args={ [SCALE,1,1] }/>,
      <CuboidCollider args={ [1,SCALE,1] }/>,
      <CuboidCollider args={ [1,1,SCALE] }/>
    ]}  colliders={false} >
      <instancedMesh args={[nodes.Cross.geometry, undefined, count]}
      onPointerMove={(e) => (e.stopPropagation(), set(e.instanceId))}
      onPointerOut={(e) => set(undefined)}>
        <meshPhysicalMaterial color={itemColor} attach={"material"} roughness={0.3} metalness={0.7}/>
      </instancedMesh>
    </InstancedRigidBodies>
  );
}

export default Pipes;

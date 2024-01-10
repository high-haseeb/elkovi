/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.15 character.gltf 
*/

import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations, useScroll } from '@react-three/drei'

export function Amanda(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('Character/character.gltf');
  const { actions } = useAnimations(animations, group);

  useEffect(()=>{
    if(group.current){
      actions.wave.play();
    }
  },[])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh name="Ch03" geometry={nodes.Ch03.geometry} material={materials.Ch03_Body} skeleton={nodes.Ch03.skeleton} />
        </group>
        <group name="Armature001" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips_1} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('Character/character.gltf')

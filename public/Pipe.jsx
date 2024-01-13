/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.15 pipe.glb 
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/pipe.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Cross.geometry} material={nodes.Cross.material} rotation={[-Math.PI / 2, Math.PI / 2, 0]} />
    </group>
  )
}

useGLTF.preload('/pipe.glb')
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/Mixer.glb')
  return (
    <group {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <mesh geometry={nodes.Box001.geometry} material={materials['01 - Default']} />
        <mesh geometry={nodes.Box004.geometry} material={materials['03 - Default']} />
        <mesh geometry={nodes.button1.geometry} material={materials['09 - Default']} />
        <mesh geometry={nodes.Cylinder002.geometry} material={materials['02 - Default']} />
        <mesh geometry={nodes.Cylinder003.geometry} material={materials['01 - Default']} />
        <mesh geometry={nodes.Cylinder005.geometry} material={materials['02 - Default']} />
        <mesh geometry={nodes.Cylinder006.geometry} material={materials['03 - Default']} />
        <mesh geometry={nodes.Cylinder007.geometry} material={materials['03 - Default']} />
        <mesh geometry={nodes.Cylinder008.geometry} material={materials['03 - Default']} />
        <mesh geometry={nodes.Cylinder009.geometry} material={materials['03 - Default']} />
        <mesh geometry={nodes.Line001.geometry} material={materials['02 - Default']} />
        <mesh geometry={nodes.Sphere001.geometry} material={materials['01 - Default']} />
        <mesh geometry={nodes.Sphere002.geometry} material={materials['01 - Default']} />
        <mesh geometry={nodes.Mesh003.geometry} material={materials['01 - Default']} />
        <mesh geometry={nodes.Mesh003_1.geometry} material={materials['04 - Default']} />
        <mesh geometry={nodes.Mesh012.geometry} material={materials['01 - Default']} />
        <mesh geometry={nodes.Mesh012_1.geometry} material={materials['07 - Default']} />
        <mesh geometry={nodes.Mesh016.geometry} material={materials['01 - Default']} />
        <mesh geometry={nodes.Mesh016_1.geometry} material={materials['03 - Default']} />
        <mesh geometry={nodes.Mesh014.geometry} material={materials['03 - Default']} />
        <mesh geometry={nodes.Mesh014_1.geometry} material={materials['08 - Default']} />
        <mesh geometry={nodes.Mesh015.geometry} material={materials['03 - Default']} />
        <mesh geometry={nodes.Mesh015_1.geometry} material={materials['02 - Default']} />
        <mesh geometry={nodes.Mesh004.geometry} material={materials['Material #14']} />
        <mesh geometry={nodes.Mesh004_1.geometry} material={materials['02 - Default']} />
        <mesh geometry={nodes.Mesh004_2.geometry} material={materials['Material #13']} />
      </group>
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <mesh geometry={nodes.Mesh020.geometry} material={materials['02 - Default.001']} />
        <mesh geometry={nodes.Mesh020_1.geometry} material={materials['03 - Default.001']} />
      </group>
    </group>
  )
}

useGLTF.preload('/Mixer.glb')

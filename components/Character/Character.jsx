import React, { useEffect, useRef, useState } from "react";
import { exportToGLTF, fetchData } from "../Loaders/loader";
import { OrbitControls } from "@react-three/drei";
import { TextureLoader } from "three";
import * as THREE from "three";
import { loadAnimationBuffer } from "../Loaders/animationLoader";
import { useFrame } from "@react-three/fiber";

const Astronaut = () => {
  const astronaut = useRef();
  const astronaut_wearpack = useRef();
  const astronaut_body = useRef();
  const astronaut_glove_shoes = useRef();
  const astronaut_helmet = useRef();
  const astronaut_helmet_glass = useRef();

  const [percentageLoaded, setPercentage] = useState(0);

  const bufferPaths = [
    "/assets/astronaut_wearpack/astronaut_wearpack.buf",
    "/assets/astronaut.buf",
    "/assets/astronaut_glove_shoes/astronaut_glove_shoes.buf",
    "/assets/astronaut_helmet/astronaut_helmet.buf",
    "/assets/astronaut_helmet_glass.buf",
  ];

  const texturePaths = [
    {
      base: "/assets/astronaut_glove_shoes/astronaut_glove_shoes_base.webp",
      arm: "/assets/astronaut_glove_shoes/astronaut_glove_shoes_arm.webp",
      nor: "/assets/astronaut_glove_shoes/astronaut_glove_shoes_nor.webp",
    },
    {
      base: "/assets/astronaut_helmet/astronaut_helmet_base.webp",
      arm: "/assets/astronaut_helmet/astronaut_helmet_arm.webp",
      nor: "/assets/astronaut_helmet/astronaut_helmet_nor.webp",
    },
    {
      base: "/assets/astronaut_wearpack/astronaut_wearpack_base.webp",
      arm: "/assets/astronaut_wearpack/astronaut_wearpack_arm.webp",
      nor: "/assets/astronaut_wearpack/astronaut_wearpack_nor.webp",
    },
  ];

  useEffect(() => {
    const loadTexture = (texturePath) => {
      const loader = new TextureLoader();
      return loader.load(texturePath);
    };

    const fetchBuffers = async () => {
      const meshArray = await Promise.all(
        bufferPaths.map((path) => fetchData(path, setPercentage)),
      );

      const textures = await Promise.all(
        texturePaths.map((textures) =>
          Promise.all(
            Object.values(textures).map((texturePath) =>
              loadTexture(texturePath),
            ),
          ),
        ),
      );
      // Assuming that meshArray contains the loaded meshes in order

      astronaut_wearpack.current.geometry = meshArray[0].geometry.clone();
      astronaut_wearpack.current.material = new THREE.MeshStandardMaterial({
        map: textures[2][0],
        normalMap: textures[2][2],
        roughnessMap: textures[2][1],
        metalnessMap: textures[2][1],
        aoMap: textures[2][1],
      });
      astronaut_body.current.geometry = meshArray[1].geometry.clone();

      astronaut_glove_shoes.current.geometry = meshArray[2].geometry.clone();
      astronaut_glove_shoes.current.material = new THREE.MeshStandardMaterial({
        map: textures[0][0],
        normalMap: textures[0][2],
        roughnessMap: textures[0][1],
        metalnessMap: textures[0][1],
        aoMap: textures[0][1],
      });
      astronaut_helmet.current.geometry = meshArray[3].geometry.clone();
      astronaut_helmet.current.material = new THREE.MeshStandardMaterial({
        map: textures[1][0],
        normalMap: textures[1][2],
        roughnessMap: textures[1][1],
        metalnessMap: textures[1][1],
        aoMap: textures[1][1],
      });
      astronaut_helmet_glass.current.geometry = meshArray[4].geometry.clone();
    };

    fetchBuffers();
  }, []);

  useFrame(()=>{
    if(astronaut.current) astronaut.current.rotation.y += 0.01
  })
  return (
    <>
      <OrbitControls />
      <group ref={astronaut} scale={3} position={[0,-4 ,0]}>
        <mesh ref={astronaut_wearpack}></mesh>
        <mesh ref={astronaut_body}></mesh>
        <mesh ref={astronaut_glove_shoes}></mesh>
        <mesh ref={astronaut_helmet}></mesh>
        <mesh ref={astronaut_helmet_glass}></mesh>
      </group>
    </>
  );
};

export default Astronaut;

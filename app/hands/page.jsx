"use client";
import { Model } from "@/components/Mixer";
import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";
import { Box, OrbitControls, Sphere, Torus } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import {
  CuboidCollider,
  InstancedRigidBodies,
  Physics,
  RigidBody,
  vec3,
} from "@react-three/rapier";
import React, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const Hands = () => {
  return (
    <div className="w-screen h-screen">
      <Landmarker />
    </div>
  );
};

const Landmarker = () => {
  const inputVideoRef = useRef(null);
  const handLandmarker = useRef(null);
  const rigidBodyRef = useRef(null);

  // setup
  useEffect(() => {
    // setup mediaPipe
    const setupMediaPipe = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm",
      );
      handLandmarker.current = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
        },
      });
    };
    setupMediaPipe();

    // setup video input (webcam)
    const constraints = {
      video: {
        width: { min: 640, ideal: 1280, max: 1920 },
        height: { min: 480, ideal: 720, max: 1080 },
        facingMode: "user",
      },
    };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        if (inputVideoRef.current) {
          inputVideoRef.current.srcObject = stream;
        }
      })
      .then(() => sendToMediaPipe());
  }, []);
  //
  // process the video input
  const sendToMediaPipe = () => {
    const processFrame = async () => {
      if (
        inputVideoRef.current &&
        handLandmarker.current &&
        inputVideoRef.current.videoWidth > 0 &&
        inputVideoRef.current.videoHeight > 0
      ) {
        const handData = await handLandmarker.current.detect(inputVideoRef.current);
        if (handData.landmarks.length > 0) {
          drawHands(handData.landmarks[0]); // only one hand supported
        }
      }
      requestAnimationFrame(processFrame);
    };

    processFrame();
  };

  const scale = 1;
  const drawHands = (landmarks) => {
    if (!rigidBodies.current || landmarks.length < 0) return;
    landmarks.map((landmark, i) => {
        rigidBodies.current[i]?.setNextKinematicTranslation({
          x: landmark.x * -2 ,
          y: landmark.y * -2,
          z: landmark.z * scale,
        });
    });
  };
  const COUNT = 21;
  const rigidBodies = useRef(null);
  const instances = useMemo(() => {
    const instances = [];

    for (let i = 0; i < COUNT; i++) {
      instances.push({
        key: "instance_" + Math.random(),
        position: [Math.random() * 100, Math.random() * 100, Math.random() * 100],
        rotation: [0, 0, 0],
      });
    }

    return instances;
  }, []);

  return (
    <>
      <video
        autoPlay
        ref={(el) => (inputVideoRef.current = el)}
        className="hidden w-full h-full scale-x-[-1] "
      />
      <Canvas className="w-full h-full bg-[#181818]" camera={{ position: [0, 0, 4] }}>
        <Physics debug>
          <RigidBody restitution={0} mass={3} colliders="cuboid">
            {/* <Model scale={0.2} /> */}
            <Box args={[0.5, 0.5, 1]}/>
          </RigidBody>
          <InstancedRigidBodies
            ref={rigidBodies}
            instances={instances}
            type="kinematicPosition"
            rotation={[0, 0, Math.PI]}
            mass={2}
          >
            <instancedMesh args={[undefined, undefined, COUNT]} count={COUNT}>
              <boxGeometry args={[0.1, 0.1, 0.1]} />
              <meshStandardMaterial color={"white"} />
            </instancedMesh>
          </InstancedRigidBodies>
          <RigidBody type="fixed">
            <mesh position={[0, -2, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <boxGeometry args={[20, 20, 0.1]} />
              <meshBasicMaterial color={"brown"} />
            </mesh>
          </RigidBody>
        </Physics>
        <OrbitControls />
        <ambientLight />
      </Canvas>
    </>
  );
};

export default Hands;

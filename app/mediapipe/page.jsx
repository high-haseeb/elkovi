"use client";
import React, { useEffect, useRef, useState } from "react";
import { HandLandmarker, FilesetResolver, FaceLandmarker } from "@mediapipe/tasks-vision";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Stars } from "@react-three/drei";

const YourComponent = () => {
  const inputVideoRef = useRef();
  const [inputVideoReady, setInputVideoReady] = useState(false);
  const landmarkerRef = useRef(null);
  const [rightHand, setRightHand] = useState(false);
  const meshRef = useRef();

  useEffect(() => {
    const setupMediaPipe = async () => {
      // Load MediaPipe hand landmarker
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm",
      );
      landmarkerRef.current = await FaceLandmarker.createFromModelPath(
        vision,
        "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
      );
    };
    setupMediaPipe();
  }, []);

  useEffect(() => {
    const constraints = {
      video: {
        width: { min: 640, ideal: 1280, max: 1920 },
        height: { min: 480, ideal: 720, max: 1080 },
        facingMode: "environment", // or "user" for front camera
      },
    };
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      if (inputVideoRef.current) {
        inputVideoRef.current.srcObject = stream;
        setInputVideoReady(true);
      }
    });
    if (inputVideoReady) {
      sendToMediaPipe();
    }
  }, [inputVideoReady]);
  const geometry = new THREE.BufferGeometry();
  const sendToMediaPipe = () => {
    const processFrame = async () => {
      if (
        inputVideoRef.current &&
        landmarkerRef.current &&
        inputVideoRef.current.videoWidth > 0 &&
        inputVideoRef.current.videoHeight > 0
      ) {
        const pointsData = [];
        const scale = 1;
        const landmarks = await landmarkerRef.current.detect(inputVideoRef.current);
        if (landmarks.faceLandmarks.length > 0) {
          landmarks.faceLandmarks[0].forEach((landmark) => {
            pointsData.push(landmark.x * scale);
            pointsData.push(landmark.y * scale);
            pointsData.push(landmark.z * scale);
          });
          const vertices = new Float32Array(pointsData);
          geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
          meshRef.current.geometry = geometry;
        }
      }
      requestAnimationFrame(processFrame);
    };

    processFrame();
  };

  return (
    <div className="w-screen h-screen">
      <video
        autoPlay
        style={{ transform: "scaleX(-1)" }} // Flip the video horizontally
        ref={(el) => {
          inputVideoRef.current = el;
        }}
        className="hidden w-full h-full"
      />
      <Canvas className="w-full h-full bg-black">
        <Stars/>
        <points ref={meshRef} scale={6} rotation={[0, 0,Math.PI]} position={[3,3,0]}>
          <pointsMaterial color={"white"} size={0.04}/>
          {/* <meshNormalMaterial/> */}
        </points>
      </Canvas>
    </div>
  );
};

export default YourComponent;

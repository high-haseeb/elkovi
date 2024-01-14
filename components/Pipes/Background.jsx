import { useFrame } from "@react-three/fiber";
import { LayerMaterial, Color, Depth } from "lamina";
import { useRef } from "react";
import { BackSide } from "three";

const Background = ({colorA}) => {
  const ref = useRef();
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
    }
  });
  return (
    <>
      <mesh scale={100} ref={ref}>
        <sphereGeometry args={[1, 64, 64]} />
        <LayerMaterial side={BackSide}>
          <Color color="#444" alpha={1} mode="normal" />
          <Depth
            colorA={colorA}
            colorB="black"
            alpha={0.5}
            mode="normal"
            near={0}
            far={300}
            origin={[100, 100, 100]}
          />
        </LayerMaterial>
      </mesh>
      <pointLight color={colorA} intensity={100} position={[0,0,0]}/>
      {/* <directionalLight color={colorA} intensity={2} ref={ref} /> */}
    </>
  );
};

export default Background;

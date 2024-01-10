import { useFrame } from "@react-three/fiber";
import { EffectComposer, Vignette } from "@react-three/postprocessing";
import { LayerMaterial, Color, Depth } from "lamina";
import { useRef } from "react";
import { BackSide } from "three";

const Background = ({colorA}) => {
  const ref = useRef();
  useFrame((delta) => {
    if (ref.current) {
      ref.current.rotation.x = 0.01;
    }
  });
  return (
    <>
      <EffectComposer>
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
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
    </>
  );
};

export default Background;

import { LayerMaterial, Color, Depth } from "lamina";
import { BackSide } from "three";

const Background = () => {
  return (
    <mesh scale={100}>
      <sphereGeometry args={[1, 64, 64]} />
      <LayerMaterial side={BackSide}>
        <Color color="#444" alpha={1} mode="normal" />
        <Depth
          colorA={"seagreen"}
          colorB="black"
          alpha={0.5}
          mode="normal"
          near={0}
          far={300}
          origin={[100, 100, 100]}
        />
      </LayerMaterial>
    </mesh>
  );
};

export default Background;

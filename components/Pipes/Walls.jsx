import { CuboidCollider } from "@react-three/rapier";

const Walls = () => {
  return (
    <>
      <CuboidCollider position={[0, -10, 0]} args={[20, 0.5, 10]} />
      <CuboidCollider position={[0, 10, 0]} args={[20, 0.5, 10]} />
      <CuboidCollider
        position={[10, -5, 0]}
        args={[20, 0.5, 10]}
        rotation={[0, 0, Math.PI / 2]}
      />
      <CuboidCollider
        position={[-10, -5, 0]}
        args={[20, 0.5, 10]}
        rotation={[0, 0, Math.PI / 2]}
      />
      <CuboidCollider
        position={[0, 0, 10]}
        args={[20, 0.5, 10]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <CuboidCollider
        position={[0, 0, -10]}
        args={[20, 0.5, 10]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </>
  );
};

export default Walls;

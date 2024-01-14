import { CuboidCollider } from "@react-three/rapier";

const Walls = () => {
  const elasticity = 1;
  return (
    <>
      <CuboidCollider
        position={[0, -10, 0]}
        args={[20, 0.5, 10]}
        restitution={elasticity}
      />
      <CuboidCollider
        position={[0, 10, 0]}
        args={[20, 0.5, 10]}
        restitution={elasticity}
      />
      <CuboidCollider
        restitution={elasticity}
        position={[10, -5, 0]}
        args={[20, 0.5, 10]}
        rotation={[0, 0, Math.PI / 2]}
      />
      <CuboidCollider
        restitution={elasticity}
        position={[-10, -5, 0]}
        args={[20, 0.5, 10]}
        rotation={[0, 0, Math.PI / 2]}
      />
      <CuboidCollider
        restitution={elasticity}
        position={[0, 0, 6]}
        args={[20, 0.5, 10]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <CuboidCollider
        restitution={elasticity}
        position={[0, 0, -6]}
        args={[20, 0.5, 10]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </>
  );
};

export default Walls;

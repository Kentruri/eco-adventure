
import { useSelector } from "react-redux";
import { selectAuth } from "@/redux/slices/auth";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, FlyControls } from "@react-three/drei";
import { useRef, useEffect } from "react";

const RotatingBox = () => {
  const meshRef = useRef(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.cos(t);
      meshRef.current.rotation.y = Math.sin(t);
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="purple" />
    </mesh>
  );
};

const Dashboard = () => {
  const { currentUser } = useSelector(selectAuth);

  const flyControlsRef = useRef(null);

  useEffect(() => {
    if (flyControlsRef.current) {
      flyControlsRef.current.movementSpeed = 10;
      flyControlsRef.current.rollSpeed = 0.5;
    }
  }, [flyControlsRef]);

  const getDisplayName = (email) => {
    if (email) {
      const name = email.split('.')[0]; 
      return name;
    }
    return '';
  };


  return (
    <div className="h-screen  mt-32 ">
      <span className="text-lg font-bold w-[500px] text-center   overflow-hidden flex ml-10">
        Hi, {currentUser.displayName || getDisplayName(currentUser.email)} !
      </span>
      <Canvas className="h-[90%] w-[90vw]">
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <FlyControls ref={flyControlsRef} autoForward={false} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <RotatingBox />
      </Canvas>

    </div>
  );
};

export default Dashboard;
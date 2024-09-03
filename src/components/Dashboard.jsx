import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';

// Component to animate the box using a cosine wave
const AnimatedBox = () => {
  const meshRef = useRef(null);

  // Animate the box using cosine wave
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.position.y = Math.cos(time) * 2;
    }
  });

  return (
    <Box ref={meshRef} args={[1, 1, 1]}>
      <meshStandardMaterial attach="material" color="royalblue" />
    </Box>
  );
};

// Component to manage PointerLockControls
const PointerLockControlsWrapper = () => {
  const controlsRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    if (cameraRef.current && rendererRef.current) {
      const controls = new PointerLockControls(cameraRef.current, rendererRef.current.domElement);
      controlsRef.current = controls;
      controls.lock();
      return () => {
        controls.dispose();
      };
    }
  }, []);

  return null;
};

// Dashboard component
const Dashboard = () => {
  return (
    <Canvas>
      <ambientLight />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <AnimatedBox />
      <PointerLockControlsWrapper />
    </Canvas>
  );
};

export default Dashboard;
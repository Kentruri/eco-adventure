import '@/App.css';
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from 'three';

const Model = () => {
  const gltf = useLoader(GLTFLoader, "/models/fishing.glb");

  const mixer = useRef(null);

  useEffect(() => {

    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.DoubleSide;
      }
    });

    mixer.current = new THREE.AnimationMixer(gltf.scene);

    gltf.animations.forEach((clip) => {
      const action = mixer.current.clipAction(clip);
      action.play();
    });
  }, [gltf]);

  useFrame((state, delta) => {
    if (mixer.current) {
      mixer.current.update(delta);
    }
  });

  return <primitive object={gltf.scene} />;
};

const LandingPage = () => {
  return (
    <div className="w-full h-[100vh]">
      <Canvas className="h-[90vh] w-[90vw]" style={{ background: 'white' }}>
        <ambientLight color="blue" intensity={1} />
        <directionalLight color="white" position={[10, 10, 10]} intensity={1} />
        <directionalLight color="white" position={[-10, -10, -10]} intensity={1} />
        <directionalLight color="white" position={[10, -10, 10]} intensity={1} />
        <directionalLight color="white" position={[-10, 10, 10]} intensity={1} />
        <directionalLight color="white" position={[10, 10, -10]} intensity={1} />

        <PerspectiveCamera
          makeDefault
          position={[6, 2, 7]}
          fov={75}
          near={0.5}
          far={1000}
        />

        <Model />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default LandingPage;
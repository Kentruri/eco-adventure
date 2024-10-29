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
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
        <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg max-w-2xl">
          <h1 className="text-4xl font-bold mb-6 text-black">Escasez del Agua</h1>
          <p className="text-lg mb-8 text-black">
            La escasez de agua es un problema global que afecta tanto a comunidades como a ecosistemas enteros.
            Millones de personas carecen de acceso a agua potable, y muchos cuerpos de agua están disminuyendo debido
            a la sobreexplotación y el cambio climático. Esta situación amenaza la seguridad alimentaria, la salud y
            la biodiversidad, y plantea grandes desafíos para el desarrollo sostenible.
          </p>
          <div className="flex justify-center space-x-4 w-full">
            <button
              className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-full transition duration-300"
            >
              Volver atrás
            </button>
            <button
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition duration-300"
            >
              Continuar viaje
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
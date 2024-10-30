import '@/App.css';
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import { gsap } from "gsap";
import { useNavigate } from 'react-router-dom';

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
  const cameraRef = useRef();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [content, setContent] = useState({
    title: "Anímate a conocer más del medio ambiente",
    text: "Descubre cómo puedes contribuir a la preservación del planeta, entender los problemas ambientales y las soluciones que podemos implementar juntos.",
  });

  const handleCameraTransition = (nextStep) => {
    const positions = [
      { x: 1, y: 1, z: 1 },
      { x: 0, y: 5, z: 15 }, 
      { x: -5, y: 3, z: -10 }, 
      { x: 5, y: -4, z: -10 }, 
    ];

    gsap.to(cameraRef.current.position, {
      x: positions[nextStep - 1].x,
      y: positions[nextStep - 1].y,
      z: positions[nextStep - 1].z,
      duration: 2,
      onUpdate: () => {
        cameraRef.current.lookAt(0, 0, 0); 
      },
      onComplete: () => {
        if (nextStep === 1) {
          setContent({
            title: "Anímate a conocer más del medio ambiente",
            text: "Descubre cómo puedes contribuir a la preservación del planeta, entender los problemas ambientales y las soluciones que podemos implementar juntos.",
          });
        } else if (nextStep === 2) {
          setContent({
            title: "Escasez del Agua",
            text: "La escasez de agua es un problema global que afecta tanto a comunidades como a ecosistemas enteros. Millones de personas carecen de acceso a agua potable, y muchos cuerpos de agua están disminuyendo debido a la sobreexplotación y el cambio climático. Esta situación amenaza la seguridad alimentaria, la salud y la biodiversidad, y plantea grandes desafíos para el desarrollo sostenible.",
          });
        } else if (nextStep === 3) {
          setContent({
            title: "Contaminación del Agua",
            text: " La contaminación del agua es uno de los problemas ambientales más graves que enfrentamos hoy en día. Afecta a ecosistemas acuáticos, la vida marina y la salud humana.Las principales fuentes de contaminación incluyen desechos industriales, pesticidas agrícolas y residuos plásticos.",
          });
        } else if (nextStep === 4) {
          setContent({
            title: "Acidificación de los Océanos",
            text: "La acidificación de los océanos es un fenómeno ambiental que ocurre cuando el dióxido de carbono (CO₂) se disuelve en el agua del mar, formando ácido carbónico y reduciendo el pH oceánico.Este proceso altera el equilibrio químico natural de los océanos, afectando gravemente a los ecosistemas marinos, como los corales, moluscos y algunos crustáceos.Todo esto impulsado en gran medida por las emisiones humanas de CO₂",
          });
        }
        setStep(nextStep); 
      },
    });
  };

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
          ref={cameraRef}
          makeDefault
          position={[1,1,1]}
          fov={75}
          near={0.5}
          far={1000}
        />

        <Model />
        <OrbitControls />
      </Canvas>
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
        <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg max-w-2xl fade">
          <h1 className="text-4xl font-bold mb-6 text-black">{content.title}</h1>
          <p className="text-lg mb-8 text-black">{content.text}</p>
          <div className="flex justify-center space-x-4 w-full">
            {step > 1 && (
              <button
                onClick={() => handleCameraTransition(step - 1)}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-full transition duration-300"
              >
                Volver atrás
              </button>
            )}
            {step === 1 ? (
              <button
                onClick={() => handleCameraTransition(step + 1)}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition duration-300"
              >
                Iniciar viaje
              </button>
            ) : step < 4 ? (
              <button
                onClick={() => handleCameraTransition(step + 1)}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition duration-300"
              >
                Continuar viaje
              </button>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition duration-300"
              >
                Ponte a prueba
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
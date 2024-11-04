import '@/App.css';
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { gsap } from "gsap"; 
import contentData from '@/content';
import FishingModel from '@/components/FishingModel';

const LandingPage = () => {
  const cameraRef = useRef();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  const [content, setContent] = useState(contentData.step1);
  const [isExiting, setIsExiting] = useState(false); // Controla la animación de salida
  const [isEntering, setIsEntering] = useState(false); // Controla la animación de entrada
  const [hasInteracted, setHasInteracted] = useState(false); // Marca si ha habido interacción

  const handleCameraTransition = (nextStep) => {
    const positions = [
      { x: 1, y: 1, z: 1 },
      { x: 1, y: 5, z: 15 },
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
    });

    setIsExiting(true); 
    setHasInteracted(true); 

    setTimeout(() => {
      setContent(contentData[`step${nextStep}`]); 
      setStep(nextStep);
      setIsExiting(false); 
      setIsEntering(true); 

      setTimeout(() => setIsEntering(false), 500); 
    }, 500); 
  };

  useEffect(() => {
    const checkCanvas = setInterval(() => {
      if (document.querySelector("canvas")) {
        setIsLoading(false);
        clearInterval(checkCanvas);
      }
    }, 100);

    return () => clearInterval(checkCanvas);
  }, []);

  const boxPositions = [
    "inset-0",      
    "top-20 left-8", 
    "bottom-8 left-8", 
    "inset-0", 
  ];

  const exitAnimation = "transform -translate-y-32 opacity-0 transition-all duration-500 ease-in-out";
  const enterAnimation = "transform translate-y-32 opacity-0 transition-all duration-500 ease-in-out";

  return (
    <div className="w-full h-[100vh] relative">
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
          position={[1, 1, 1]}
          fov={75}
          near={0.5}
          far={1000}
        />

        <FishingModel />
      </Canvas>

      {isLoading ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
          <h2 className="text-3xl font-bold text-slate-700">Cargando...</h2>
        </div>
      ) : (
        <div
          className={`absolute ${boxPositions[step - 1]} flex flex-col items-center justify-center p-8
            ${isExiting ? exitAnimation : ""}
            ${isEntering ? enterAnimation : ""}
            ${!isExiting && !isEntering && "transform translate-y-0 opacity-100 transition-all duration-500 ease-in-out"}
          `}
        >
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
      )}
    </div>
  );
};

export default LandingPage;
import TapWaterModel from "@/components/TapWaterModel";
import { Environment, Html } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";

const Shortage = () => {
  const [cameraPosition, setCameraPosition] = useState({ x: -6, y: 0, z: -1 });
  const [htmlPosition, setHtmlPosition] = useState([1.5, 6, 9]); // Estado para la posición del Html
  const [htmlRotation, setHtmlRotation] = useState([0, 4.5, 0]); // Estado para la rotación del Html
  const [stopAnimation, setStopAnimation] = useState(false);
  const cameraRef = useRef();
  const modelRef = useRef();
  const [step, setStep] = useState(1);

  // Refs para cada cartel
  const stepRefs = [useRef(null), useRef(null), useRef(null)];

  const handleScroll = (direction) => {
    if (direction === "top") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      window.scrollBy({
        top: direction === "down" ? window.innerHeight : -window.innerHeight,
        behavior: "smooth",
      });
    }
  };

  const handleNextStep = () => {
    const currentRef = stepRefs[step - 1].current;
    if (currentRef) {
      gsap.to(currentRef, {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.in",
        onComplete: () => {
          setStep((prevStep) => Math.min(prevStep + 1, 3));
        },
      });
    }
  };

  const handleCloseValve = () => {
    const currentRef = stepRefs[1].current;
    if (currentRef) {
      gsap.to(currentRef, {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.in",
        onComplete: () => {
          gsap.to(cameraRef.current.position, {
            x: -2,
            y: 0,
            z: 4,
            duration: 2,
            onUpdate: () => {
              cameraRef.current.lookAt(0, 0, 0);
            },
          });

          gsap.to(modelRef.current.position, {
            x: -2.1,
            y: -0.4,
            z: 3.58,
            duration: 2,
          });

          // Actualizamos la posición y rotación del Html usando el estado
          setHtmlPosition([10, 7, -2]);
          setHtmlRotation([0, -0.6, 0]);

          setStopAnimation(true);
          setStep(3);
        },
      });
    }
  };

  // Animación de entrada para el cartel actual
  useEffect(() => {
    const currentRef = stepRefs[step - 1].current;
    if (currentRef) {
      gsap.fromTo(
        currentRef,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
    }
  }, [step]);

  // Event listener para las teclas de flecha
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "ArrowLeft") {
        handleCloseValve();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <div className="relative flex flex-col items-center">
      <div className="w-full h-[100vh] flex items-center justify-center bg-gray-200 relative">
        <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg max-w-2xl">
          <h1 className="text-4xl font-bold mb-6 text-black">Introducción</h1>
          <p className="text-lg mb-8 text-black">
            Bienvenidos a esta experiencia de aprendizaje. Explora cada sección para conocer más sobre el tema y su importancia.
          </p>
          <div className="flex justify-center w-full">
            <button
              onClick={() => handleScroll("down")}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition duration-300"
            >
              Continuar leyendo
            </button>
          </div>
        </div>
      </div>

      <div className="relative w-full h-[100vh] min-h-[1000px]">
        <Canvas
          shadows
          onCreated={({ camera }) => {
            cameraRef.current = camera;
            camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
            camera.lookAt(0, 0, 0);
          }}
        >
          <ambientLight intensity={1.5} />
          <pointLight castShadow color="white" position={[0, 2, 0]} intensity={1.5} distance={5} />
          <Environment preset="sunset" background />

          <Html
            position={htmlPosition}
            rotation={htmlRotation}
            transform
            occlude
          >
            <h1 className="text-3xl font-bold text-white" style={{ textShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)' }}>
              Sensibilización
            </h1>
          </Html>

          {/* Modelo con sombras activadas */}
          <TapWaterModel ref={modelRef} position={[-5.1, -0.4, -1.58]} stopAnimation={stopAnimation} />
        </Canvas>

        <div className="absolute right-0 top-[10%] flex flex-col items-center justify-center p-8 space-y-8">
          {/* Cuadro 1 */}
          {step >= 1 && (
            <div
              ref={stepRefs[0]}
              className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg max-w-2xl"
            >
              <p className="text-lg mb-8 text-black">
                Cada gota que se pierde representa una oportunidad desaprovechada de mantener el equilibrio natural y asegurar el bienestar de nuestras comunidades.
              </p>
              <div className="flex justify-center w-full">
                <button
                  onClick={handleNextStep}
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition duration-300"
                >
                  Seguir leyendo
                </button>
              </div>
            </div>
          )}

          {/* Cuadro 2 */}
          {step >= 2 && (
            <div
              ref={stepRefs[1]}
              className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg max-w-2xl ml-[10%]"
            >
              <h1 className="text-4xl font-bold mb-6 text-black">Sabías que...</h1>
              <p className="text-lg mb-8 text-black">
                Un grifo que gotea una gota por segundo puede perder aproximadamente 1,095 litros de agua al año.
                Si hay varios grifos con este problema, la pérdida total puede ser mucho mayor.
              </p>
              <div className="flex justify-center space-x-4 w-full">
                <button
                  onClick={handleCloseValve}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition duration-300"
                >
                  Cerrar llave
                </button>
              </div>
            </div>
          )}

          {/* Cuadro 3 */}
          {step >= 3 && (
            <div
              ref={stepRefs[2]}
              className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg max-w-2xl mr-[10%] absolute top-[100px]"
            >
              <p className="text-lg mb-8 text-black">
                Cerrar la llave y cuidar el agua es un compromiso para asegurar la vida en el planeta. Cada acción cuenta.
              </p>
              <div className="flex justify-center space-x-4 w-full">
                <button
                  onClick={() => handleScroll("down")}
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition duration-300"
                >
                  Seguir leyendo
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="w-full h-[100vh] flex items-center justify-center bg-gray-200 relative">
        <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg max-w-2xl">
          <h1 className="text-4xl font-bold mb-6 text-black">Acciones</h1>
          <p className="text-lg mb-8 text-black">
            En esta última sección, reflexiona sobre lo que has aprendido y cómo puedes aplicar estos conocimientos en tu vida diaria.
          </p>
          <div className="flex justify-center space-x-4 w-full">
            <button
              onClick={() => handleScroll("up")}
              className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-full transition duration-300"
            >
              Volver atrás
            </button>
            <button
              onClick={() => handleScroll("top")}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition duration-300"
            >
              Volver al inicio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shortage;

import TapWaterModel from "@/components/TapWaterModel";
import { Environment, Html } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";

const Shortage = () => {
  const [cameraPosition, setCameraPosition] = useState({ x: -6, y: 0, z: -1 });
  const [htmlPosition, setHtmlPosition] = useState([1.5, 5, 9]);
  const [htmlRotation, setHtmlRotation] = useState([0, 4.5, 0]);
  const [stopAnimation, setStopAnimation] = useState(false);
  const [currentSection, setCurrentSection] = useState(1); // Controla la sección activa
  const [step, setStep] = useState(1);

  const cameraRef = useRef();
  const modelRef = useRef();
  const stepRefs = [useRef(null), useRef(null), useRef(null)];
  const firstSectionRef = useRef(null);
  const secondSectionRef = useRef(null);
  const sensibilizationSectionRef = useRef(null);

  const handleScroll = (direction) => {
    if (direction === "down" && currentSection === 1) {
      gsap.to(firstSectionRef.current, {
        y: "-100%",
        duration: 1,
        ease: "power3.inOut",
        onComplete: () => setCurrentSection(2),
      });
    } else if (direction === "down" && currentSection === 2) {
      gsap.to(secondSectionRef.current, {
        y: "-100%",
        duration: 1,
        ease: "power3.inOut",
        onComplete: () => setCurrentSection(3),
      });
    }
  };

  const handleNextStep = () => {
    if (step < 3) {
      const currentRef = stepRefs[step - 1].current;
      if (currentRef) {
        gsap.to(currentRef, {
          y: -100,
          opacity: 0,
          duration: 0.8,
          ease: "power3.in",
          onComplete: () => {
            const nextStep = step + 1;
            setStep(nextStep);

            const nextRef = stepRefs[nextStep - 1].current;
            if (nextRef) {
              gsap.fromTo(
                nextRef,
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
              );
            }
          },
        });
      }
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      const currentRef = stepRefs[step - 1].current;
      if (currentRef) {
        gsap.to(currentRef, {
          y: 100,
          opacity: 0,
          duration: 0.8,
          ease: "power3.in",
          onComplete: () => {
            const prevStep = step - 1;
            setStep(prevStep);

            const prevRef = stepRefs[prevStep - 1].current;
            if (prevRef) {
              gsap.fromTo(
                prevRef,
                { y: -100, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
              );
            }
          },
        });
      }
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

          setHtmlPosition([10, 5, -2]);
          setHtmlRotation([0, -0.6, 0]);
          setStopAnimation(true);
          setStep(3);
        },
      });
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "ArrowRight") {
        handleNextStep();
      } else if (event.key === "ArrowLeft") {
        handlePreviousStep();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [step]);

  return (
    <div className="relative flex flex-col items-center overflow-hidden">
      {/* Primera sección */}
      <div
        ref={firstSectionRef}
        className={`w-full h-[100vh] flex items-center justify-center relative transition-transform duration-1000 ${currentSection !== 1 ? "hidden" : ""
          }`}
        style={{
          backgroundImage: "url('/shortage.jpg')", 
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 backdrop-blur-sm bg-black bg-opacity-30"></div>

        <div className="relative bg-white bg-opacity-70 px-9 py-5 rounded-sm shadow-lg max-w-2xl z-10">
          <h1 className="text-4xl font-bold mb-6 text-black">Introducción</h1>
          <p className="text-lg mb-8 text-black font-medium text-start">
            Bienvenidos a esta experiencia de aprendizaje. Explora cada sección para conocer más sobre el tema y su importancia, conozcamos un poco mas.
            <br />
            <br />
            El cuidado del agua es esencial para garantizar la vida en el planeta. A medida que enfrentamos una creciente escasez, es vital tomar medidas responsables: reducir el desperdicio, reutilizar siempre que sea posible y proteger nuestras fuentes naturales de agua. 
          </p>
          <div className="flex justify-center w-full">
            <button
              onClick={() => handleScroll("down")}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-none transition duration-300"
            >
              Continuar leyendo
            </button>
          </div>
        </div>
      </div>

      {/* Segunda sección */}
      <div
        ref={secondSectionRef}
        className={`relative w-full h-[100vh] min-h-[1000px] transition-transform duration-1000 ${currentSection !== 2 ? "hidden" : ""
          }`}
      >
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
            <h1 className="text-3xl font-bold text-white" style={{ textShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)" }}>
              Sensibilización
            </h1>
          </Html>

          <TapWaterModel ref={modelRef} position={[-5.1, -0.4, -1.58]} stopAnimation={stopAnimation} />
        </Canvas>

        <div className="absolute right-0 top-[30%] flex flex-col items-center justify-center p-8 space-y-8">
          {/* Cuadro 1 */}
          {step === 1 && (
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
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-none transition duration-300"
                >
                  Seguir leyendo
                </button>
              </div>
            </div>
          )}

          {/* Cuadro 2 */}
          {step === 2 && (
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
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-none transition duration-300"
                >
                  Cerrar llave
                </button>
              </div>
            </div>
          )}

          {/* Cuadro 3 */}
          {step === 3 && (
            <div
              ref={stepRefs[2]}
              className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg max-w-2xl"
            >
              <p className="text-lg mb-8 text-black">
                Cerrar la llave y cuidar el agua es un compromiso para asegurar la vida en el planeta. Cada acción cuenta.
              </p>
              <div className="flex justify-center w-full">
                <button
                  onClick={() => handleScroll("down")}
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-none transition duration-300"
                >
                  Seguir leyendo
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Nueva sección: Sensibilización */}
      <div
        ref={sensibilizationSectionRef}
        className={`relative w-full h-[100vh] flex items-center justify-center bg-blue-100 transition-transform duration-1000 ${currentSection !== 3 ? "hidden" : ""
          }`}
      >
        <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-2xl text-center">
          <h1 className="text-5xl font-bold mb-4 text-black">Sensibilización</h1>
          <p className="text-xl mb-6 text-black">
            Entender la importancia de cuidar los recursos hídricos es fundamental para preservar nuestro planeta.
          </p>
          <p className="text-lg text-black">
            Este espacio está diseñado para ayudarte a reflexionar sobre tus acciones y cómo estas impactan en el medio ambiente.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Shortage;

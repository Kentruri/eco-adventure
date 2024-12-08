import TapWaterModel from "@/components/TapWaterModel";
import { Environment, Html, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import BatModel from "./BatModel";

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
        <Canvas shadows>
          <PerspectiveCamera
            makeDefault
            position={[33, 50, 90]}
            rotation={[-0.51, 0.25, 0]} 
            fov={3}
          />
          <directionalLight
            castShadow
            position={[0, 50, 0]} // Directamente desde arriba
            intensity={1.5} // Intensidad moderada
            shadow-mapSize={[1024, 1024]}
          />
          <directionalLight
            castShadow
            position={[10, 10, 10]}
            intensity={2}
            shadow-mapSize={[1024, 1024]}
          />
          <directionalLight
            castShadow
            position={[-10, -10, -10]}
            intensity={2}
            shadow-mapSize={[1024, 1024]}
          />
          <BatModel position={[3, -1, -1]} />
        </Canvas>
        <div

          className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg max-w-2xl absolute top-[100px] left-[10px] text-start"
        >
          <h1 class="text-2xl">Reduce el consumo de carne</h1>
          <br />

          <span className="text-lg mb-8 text-black">
            Incorpora más días sin carne a tu dieta (como los lunes sin carne).
          </span>

          <span className="text-lg mb-8 text-black">
            Prueba opciones de proteínas vegetales como legumbres, tofu o seitán.

          </span>
          <div className="flex justify-center w-full">
           
          </div>
        </div>

        <div

          className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg max-w-2xl absolute top-[100px] right-[10px] text-start"
        >
          <h1 class="text-2xl">Reduce el consumo de bebidas azucaradas y enlatadas</h1>
          <br />

          <span className="text-lg mb-8 text-black">
            Prefiere bebidas caseras como jugos naturales o infusiones, que no generan residuos de plástico o aluminio.
          </span>

          <span className="text-lg mb-8 text-black">
            Lleva un termo reutilizable y prepara tus propias bebidas en casa.

          </span>
          <div className="flex justify-center w-full">

          </div>
        </div>
        
        <div

          className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg max-w-2xl absolute top-[450px] right-[10px] text-start"
        >
          <h1 class="text-2xl">Evita el fast fashion</h1>
          <br />

          <span className="text-lg mb-8 text-black">
            Compra ropa de segunda mano o intercambia prendas con amigos para reducir la demanda de producción.
          </span>

          <span className="text-lg mb-8 text-black">
            Opta por marcas que garanticen prácticas sostenibles y éticas.
          </span>
          <div className="flex justify-center w-full">

          </div>
        </div>



      </div>
    </div>
  );
};

export default Shortage;

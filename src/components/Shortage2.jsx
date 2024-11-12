import CoralReefModel from "@/components/CoralReefModel";
import { Environment, EnvironmentMap, Html } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";

const Shortage2 = () => {
  const [cameraPosition, setCameraPosition] = useState({
    x: -6.9,
    y: 0.2,
    z: -1,
  });
  const [htmlPosition, setHtmlPosition] = useState([1.8, 3.5, 9]); // Estado para la posición del Html
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
      setStep(1);

      gsap.to(modelRef.current.position, {
        x: -5.2,
        y: -0.3,
        z: -1.55,
        duration: 2,
      });

      gsap.to(cameraRef.current.position, {
        x: -6.9,
        y: 0.2,
        z: -1,
        duration: 2,
        onUpdate: () => {
          cameraRef.current.lookAt(0, 0, 0);
        },
      });
    } else {
      window.scrollBy({
        top: direction === "down" ? window.innerHeight : -window.innerHeight,
        behavior: "smooth",
      });
    }
  };

  const handleCloseValve = () => {
    gsap.to(cameraRef.current.position, {
      x: -2.5,
      y: 0,
      z: 5,
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
    setStep(2);
  };

  const handleCloseValve2 = () => {
    const lookAtTarget = { x: 0, y: 0, z: 0 };

    gsap.to(lookAtTarget, {
      x: 0,
      y: -20,
      z: -10,
      duration: 2,
      onUpdate: () => {
        cameraRef.current.lookAt(
          lookAtTarget.x,
          lookAtTarget.y,
          lookAtTarget.z
        );
      },
    });

    gsap.to(modelRef.current.position, {
      x: -2.3,
      y: -1,
      z: 4.2,
      duration: 2,
    });
    setStep(3);
  };

  // Animación de entrada para el cartel actual
  useEffect(() => {
    const currentRef = stepRefs[step - 1].current;
    const previousRef = stepRefs[step - 2]?.current;

    if (previousRef) {
      gsap.to(previousRef, {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.in",
      });
    }

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
      } else if (event.key === "ArrowRight") {
        handleOpenValve();
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
            Continuemos con esta experiencia de aprendizaje. Explora la
            siguiente sección para conocer más sobre el tema y su importancia.
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

      <div className="relative w-full h-[100vh] min-h-[100px]">
        <Canvas
          shadows
          onCreated={({ camera }) => {
            cameraRef.current = camera;
            camera.position.set(
              cameraPosition.x,
              cameraPosition.y,
              cameraPosition.z
            );
            camera.lookAt(0, 0, 0);
          }}
        >
          <ambientLight intensity={1.5} />
          <pointLight
            castShadow
            color="white"
            position={[0, 2, 0]}
            intensity={1.5}
            distance={5}
          />
          <Environment preset="sunset" background />

          <Html
            position={htmlPosition}
            rotation={htmlRotation}
            transform
            occlude
          >
            <h1
              className="text-3xl font-bold text-black"
              style={{ textShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)" }}
            >
              Sensibilización
            </h1>
          </Html>

          {/* Modelo con sombras activadas */}
          <CoralReefModel
            ref={modelRef}
            position={[-5.1, -0.4, -1.58]}
            stopAnimation={stopAnimation}
          />
        </Canvas>

        <div className="absolute right-0 top-[30%] flex flex-col items-center justify-center p-8 space-y-8">
          {/* Cuadro 1 */}
          {step >= 1 && (
            <div
              ref={stepRefs[0]}
              className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg max-w-3xl"
            >
              <p className="text-lg mb-8 text-black">
                🌊🌿 ¡Cuidemos nuestros océanos! La acidificación de los océanos
                es un problema serio causado por el exceso de CO₂ en la
                atmósfera. Esto afecta la vida marina, desde los corales hasta
                los peces, y pone en riesgo nuestros ecosistemas y fuentes de
                alimentos. 🌍💧Cambiemos nuestros hábitos, reduzcamos nuestra
                huella de carbono y protejamos la salud de nuestros océanos.
                Cada pequeña acción cuenta.🐠🌱
              </p>
              <div className="flex justify-center w-full">
                <button
                  onClick={handleCloseValve}
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition duration-300"
                >
                  Seguir leyendo
                </button>
              </div>
            </div>
          )}
          <div className="absolute right-0 top-[-20%] flex flex-col items-center justify-center p-8 space-y-8">
            {/* Cuadro 2 */}
            {step >= 2 && (
              <div
                ref={stepRefs[1]}
                className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg max-w-3xl"
              >
                <h1 className="text-4xl font-bold mb-6 text-black">
                  Sabías que...
                </h1>
                <p className="text-lg mb-8 text-black">
                  🌊💡Las burbujas de CO₂ en los océanos representan el exceso
                  de dióxido de carbono en la atmósfera que se disuelve en el
                  agua? Este proceso contribuye a la acidificación de los
                  océanos, afectando la vida marina. 🐠🌿Reducir nuestras
                  emisiones de CO₂ y cuidar nuestros océanos es esencial para
                  preservar la biodiversidad y la salud del planeta.🌍🌱
                </p>
                <div className="flex justify-center space-x-4 w-full">
                  <button
                    onClick={handleCloseValve2}
                    className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition duration-300"
                  >
                    Eliminar CO₂
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="absolute right-0 top-[-20%] flex flex-col items-center justify-center p-8 space-y-8">
            {/* Cuadro 3 */}
            {step >= 3 && (
              <div
                ref={stepRefs[2]}
                className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg max-w-3xl"
              >
                <p className="text-lg mb-8 text-black">
                  🌊🌿 Cuidemos nuestros océanos 🌿🌊 Los océanos son el corazón
                  de nuestro planeta, regulan el clima, producen oxígeno y son
                  hogar de una inmensa biodiversidad. 🌍💧 La contaminación por
                  CO₂ no solo contribuye al cambio climático, sino que también
                  acidifica el agua, poniendo en peligro la vida marina y los
                  ecosistemas.🐠🚫 Reducir nuestras emisiones de CO₂ y evitar la
                  contaminación es crucial para preservar la salud de nuestros
                  océanos y asegurar un futuro sostenible. Cada acción cuenta.
                  Juntos, podemos hacer la diferencia. 🌱💙 #CuidadoDelPlaneta
                  #ProtejamosLosOceanos
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
      </div>

      <div className="w-full h-[100vh] flex items-center justify-center bg-gray-200 relative">
        <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg max-w-2xl">
          <h1 className="text-4xl font-bold mb-6 text-black">Acciones</h1>
          <p className="text-lg mb-8 text-black">
            En esta última sección, reflexiona sobre lo que has aprendido y cómo
            puedes aplicar estos conocimientos en tu vida diaria.
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

export default Shortage2;

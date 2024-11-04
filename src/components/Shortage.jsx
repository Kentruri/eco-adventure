import TapWaterModel from "@/components/TapWaterModel";
import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef, useState } from "react";

const Shortage = () => {
  const [cameraPosition, setCameraPosition] = useState({ x: -6, y: 0, z: -1 });
  const cameraRef = useRef();

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

  return (
    <div className="relative flex flex-col items-center">
      {/* <div className="w-full h-[100vh] flex items-center justify-center bg-gray-200 relative">
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
      </div> */}

      <div className="relative w-full h-[100vh]">
        <Canvas
          onCreated={({ camera }) => {
            cameraRef.current = camera;
            camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
            camera.lookAt(0, 0, 0);
          }}
        >
          <ambientLight intensity={1.5} />
          <pointLight color="white" position={[0, 2, 0]} intensity={1.5} distance={5} />
          <Environment preset="sunset" background />
          <TapWaterModel position={[-5.1, -0.4, -1.58]} />
        </Canvas>

        <div className="absolute right-0 top-[20%] flex flex-col items-center justify-center p-8">
          <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg max-w-2xl">
            <h1 className="text-4xl font-bold mb-6 text-black">Sensibilización</h1>
            <p className="text-lg mb-8 text-black">
              Cada gota que se pierde representa una oportunidad desaprovechada de mantener el equilibrio natural y asegurar el bienestar de nuestras comunidades.
            </p>
            <div className="flex justify-center space-x-4 w-full">
              <button
                onClick={() => handleScroll("up")}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-full transition duration-300"
              >
                Volver atrás
              </button>
              <button
                onClick={() => handleScroll("down")}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition duration-300"
              >
                Continuar leyendo
              </button>
            </div>
          </div>
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
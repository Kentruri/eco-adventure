import React from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import TurtleModel from './TurtleModel';

const AboutUs = () => {
  return (
    <div className="relative flex items-center justify-start h-[900px] bg-gray-100 overflow-hidden">


      <div className="relative flex bg-white/50 backdrop-blur-lg ml-[10%] z-10 max-w-4xl w-[500px]  hover:translate-y-[-10px] transition-transform duration-1000 hover:cursor-pointer">
        <div className="flex-1 pr-8 shadow-xl p-8 rounded-xl">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 text-start ">
            Motivacion
          </h1>
          <p className="text-gray-700 mb-6 text-start text-xl ">
            Nos esforzamos por crear experiencias interactivas e inmersivas que no solo educan y concientizan, sino que inspiran a la acción. Desde nuestros inicios, nuestra misión ha sido simple pero poderosa: utilizar la innovación para conectar a las personas con el medio ambiente, para que juntos podamos ser parte de un futuro sostenible.
          </p>
        </div>
      </div>

      <div className="absolute flex-1 right-0 h-[800px] w-full">
        <Canvas>
          <directionalLight color="white" position={[10, 10, 10]} intensity={1} />
          <directionalLight color="white" position={[-10, -10, -10]} intensity={1} />
          <directionalLight color="white" position={[10, -10, 10]} intensity={1} />
          <directionalLight color="white" position={[-10, 10, 10]} intensity={1} />
          <directionalLight color="white" position={[10, 10, -10]} intensity={1} />

          <PerspectiveCamera
            makeDefault
            position={[1, 0, 7]}
            fov={40}
            near={0.1}
            far={10}
          />

          <TurtleModel />
        </Canvas>
      </div>
    </div>
  );
};

export default AboutUs;
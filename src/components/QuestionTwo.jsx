import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrthographicCamera, Text } from "@react-three/drei";
import React, { useRef, useState, useMemo } from "react";
import * as THREE from "three";
import BottleModel from "./BottleModel";
import BananaModel from "./BananaModel";
import BatteryModel from "./BatteryModel";
import OceanModel from "./OceanModel";
import QuestionThree from "./QuestionThree";

function DraggableObject({ name, onDrop, children, ...props }) {
  const ref = useRef();
  const [dragging, setDragging] = useState(false);
  const { get, gl } = useThree();

  const plane = useMemo(
    () => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0),
    []
  );
  const intersection = useMemo(() => new THREE.Vector3(), []);
  const offset = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    if (dragging) {
      if (get().raycaster.ray.intersectPlane(plane, intersection)) {
        ref.current.position.set(
          intersection.x - offset.x,
          intersection.y - offset.y,
          ref.current.position.z
        );
      }
    }
  });

  const onPointerDown = (e) => {
    e.stopPropagation();
    if (e.ray.intersectPlane(plane, intersection)) {
      offset.set(
        intersection.x - ref.current.position.x,
        intersection.y - ref.current.position.y,
        0
      );
    }
    setDragging(true);
    gl.domElement.style.cursor = "grabbing";
  };

  const onPointerUp = () => {
    setDragging(false);
    gl.domElement.style.cursor = "auto";
    onDrop(name, ref.current.position);
  };

  return (
    <group
      ref={ref}
      {...props}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      {children}
    </group>
  );
}

const QuestionTwo = () => {
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showQuestionThree, setShowQuestionThree] = useState(false);

  const handleDrop = (name, position) => {
    const oceanPosition = new THREE.Vector3(4, -2.5, 0);
    const oceanRadius = 2;

    const distanceToOcean = position.distanceTo(oceanPosition);

    if (distanceToOcean > oceanRadius) {
      const industries = {
        banana: "cascaras de alimentos",
        battery: "baterías usadas",
        bottle: "botellas des plastico",
      };

      const isCorrect = name === "battery";

      setShowModal(true);
      setMessage(isCorrect ? "battery" : industries[name]);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (showQuestionThree) {
    return <QuestionThree />;
  }

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: "url('/univalleEnv.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      <div
        className="absolute inset-0 backdrop-blur-md bg-black bg-opacity-30"
        style={{ pointerEvents: "none" }}
      ></div>

      <Canvas
        className="relative"
        style={{ width: "100vw", height: "100vh", pointerEvents: "auto" }}
      >
        <OrthographicCamera
          makeDefault
          position={[0, 0, 10]}
          near={0.1}
          far={100}
          zoom={130}
        />

        <hemisphereLight
          skyColor={"#ffffff"}
          groundColor={"#444444"}
          intensity={0.8}
        />
        <directionalLight color="white" position={[10, 10, 10]} intensity={1} />
        <ambientLight intensity={2} />

        <Text
          position={[-5, 2, 0]}
          fontSize={0.5}
          color="white"
          rotation={[0, 1, -0.05]}
          outlineWidth={0.01}
          outlineColor="black"
          fontWeight="bold"
        >
          Segunda Pregunta
        </Text>

        <Text
          position={[-6.2, 1.5, 0]}
          fontSize={0.25}
          color="white"
          anchorX="left"
          anchorY="top"
        >
          ¿Cuál de estos objetos es el MÁS contaminante para el agua? ¡Sácalo
          del Océano!
          {"\n"}
          {"\n"}• Una botella de plástico.{"\n"}• Una cáscara de fruta.{"\n"}•
          Una batería usada.{"\n"}
          {"\n"}
          Arrastra el objeto MÁS contaminante fuera del agua.
        </Text>

        <DraggableObject name="banana" onDrop={handleDrop}>
          <BananaModel
            position={[4.2, -1.9, 0]}
            scale={[2, 2, 2]}
            rotation={[0.5, 1, 0]}
          />
        </DraggableObject>

        <DraggableObject name="battery" onDrop={handleDrop}>
          <BatteryModel
            position={[1, -2, 0]}
            scale={[0.3, 0.3, 0.3]}
            rotation={[1, Math.PI / 1, 0.5]}
          />
        </DraggableObject>

        <DraggableObject name="bottle" onDrop={handleDrop}>
          <BottleModel
            position={[4, -2.5, 0]}
            rotation={[0, Math.PI / 0.6, 0]}
            scale={[0.5, 0.5, 0.5]}
          />
        </DraggableObject>

        <OceanModel
          position={[4, -2.5, 0]}
          rotation={[0, Math.PI / 0.6, 0]}
          scale={[0.1, 0.3, 0.1]}
        />
      </Canvas>

      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
          onClick={closeModal}
        >
          <div className="text-center text-white max-w-lg mx-auto">
            {message === "battery" ? (
              <>
                <h1 className="text-4xl font-bold">
                  Acertaste, llevas 2/3 respuestas correctas
                </h1>
                <p className="mt-4 text-lg">Falta 1 pregunta más.</p>
              </>
            ) : (
              <>
                <h1 className="text-4xl font-bold">Respuesta incorrecta</h1>
                <p className="mt-4 text-lg">
                  Llevas 1/3 respuestas correctas. Falta 1 más.
                </p>
              </>
            )}
            <p className="mt-6 text-lg">
              • Una botella de plástico: <strong>Contaminante moderado</strong>.
              Tarda siglos en degradarse y daña la fauna.
              <br />• Una cáscara de fruta: <strong>contaminante menor</strong>.
              Biodegradable, pero puede afectar el ecosistema.
              <br />• Una batería usada: <strong>Contaminante severo</strong>.
              Libera metales pesados y sustancias tóxicas.
            </p>
            <button
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
              onClick={() => {
                setShowModal(false);
                setShowQuestionThree(true);
                console.log("Siguiente pregunta");
              }}
            >
              Siguiente pregunta
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionTwo;

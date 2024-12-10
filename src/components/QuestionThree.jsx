import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrthographicCamera, Text } from "@react-three/drei";
import React, { useRef, useState, useMemo } from "react";
import * as THREE from "three";
import FertilizerModel from "./FertilizerModel";
import CrudeOilModel from "./CrudeOilModel";
import PlasticWaterModel from "./PlasticWaterModel";

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

const QuestionThree = () => {
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleDrop = (name, position) => {
    const oceanPosition = new THREE.Vector3(4, -2.5, 0);
    const oceanRadius = 2;

    const distanceToOcean = position.distanceTo(oceanPosition);

    if (distanceToOcean > oceanRadius) {
      const industries = {
        fertilizante: "productos agricolas",
        crude: "combustibles Fosiles",
        plastic: "todo tipo de plasticos",
      };

      const isCorrect = name === "crude";

      setShowModal(true);
      setMessage(isCorrect ? "crude" : industries[name]);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

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
          Tercera Pregunta
        </Text>

        <Text
          position={[-6.2, 1.5, 0]}
          fontSize={0.25}
          color="white"
          anchorX="left"
          anchorY="top"
        >
          ¿Cuál de estos objetos afecta mas en la acidificacion de los oceanos?
          {"\n"}
          {"\n"}• CO2 de la quema de combustibles fósiles.{"\n"}• Plásticos.
          {"\n"}• Productos químicos industriales y agrícolas.{"\n"}
          {"\n"}
          Mueve el objeto que mas afecte el agua!.
        </Text>

        <DraggableObject name="fertilizante" onDrop={handleDrop}>
          <FertilizerModel
            position={[4.2, -1.9, 0]}
            scale={[90, 90, 90]}
            rotation={[0, 1, 0]}
          />
        </DraggableObject>

        <DraggableObject name="crude" onDrop={handleDrop}>
          <CrudeOilModel
            position={[1, -2, 0]}
            scale={[2, 2, 2]}
            rotation={[0, Math.PI / 1, 0]}
          />
        </DraggableObject>

        <DraggableObject name="plastic" onDrop={handleDrop}>
          <PlasticWaterModel
            position={[3.3, -2.5, 0]}
            rotation={[0, Math.PI / 0.6, 0]}
            scale={[0.09, 0.09, 0.09]}
          />
        </DraggableObject>
      </Canvas>

      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
          onClick={closeModal}
        >
          <div className="text-center text-white max-w-lg mx-auto">
            {message === "crude" ? (
              <>
                <h1 className="text-4xl font-bold">
                  Acertaste, llevas 3/3 respuestas correctas
                </h1>
              </>
            ) : (
              <>
                <h1 className="text-4xl font-bold">Respuesta incorrecta</h1>
                <p className="mt-4 text-lg">Llevas 2/3 respuestas correctas.</p>
              </>
            )}
            <p className="mt-6 text-lg">
              El dióxido de carbono (CO₂) emitido por la quema de carbón,
              petróleo y gas natural se disuelve en el agua del océano, formando
              ácido carbónico. Este proceso aumenta la acidez del agua,
              afectando la vida marina, especialmente los corales y moluscos.
              <br />
              los plásticos en los océanos contribuyen indirectamente a la
              acidificación. Al descomponerse, algunos plásticos liberan
              compuestos químicos que pueden alterar la química del agua y
              aumentar la acidez.
              <br />
              El uso de fertilizantes y pesticidas que contienen nitrógeno y
              fósforo contribuye a la contaminación del agua. Estos productos
              químicos pueden fomentar el crecimiento de algas, cuyas
              posteriores descomposiciones aumentan la acidez del agua.
            </p>
            <button
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
              //Logica pregunta 3
              onClick={() => console.log("Siguiente pregunta")}
            >
              Terminar Intento
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionThree;
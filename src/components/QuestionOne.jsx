import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrthographicCamera, Text } from '@react-three/drei'
import React, { useRef, useEffect, useState, useMemo } from 'react'
import * as THREE from 'three'
import CowModel from './CowModel'
import CokeModel from './CokeModel'
import TextileModel from './TextileModel'
import TrashModel from './TrashModel'
import QuestionTwo from './QuestionTwo';

function DraggableObject({ name, onDrop, children, ...props }) {
  const ref = useRef()
  const [dragging, setDragging] = useState(false)
  const { get, gl } = useThree()

  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), [])
  const intersection = useMemo(() => new THREE.Vector3(), [])
  const offset = useMemo(() => new THREE.Vector3(), [])

  useFrame(() => {
    if (dragging) {
      if (get().raycaster.ray.intersectPlane(plane, intersection)) {
        ref.current.position.set(
          intersection.x - offset.x,
          intersection.y - offset.y,
          ref.current.position.z
        )
      }
    }
  })

  const onPointerDown = (e) => {
    e.stopPropagation()
    if (e.ray.intersectPlane(plane, intersection)) {
      offset.set(
        intersection.x - ref.current.position.x,
        intersection.y - ref.current.position.y,
        0
      )
    }

    setDragging(true)
    gl.domElement.style.cursor = 'grabbing'
  }

  const onPointerUp = () => {
    setDragging(false)
    gl.domElement.style.cursor = 'auto'

    const pos = ref.current.position
    const trashPos = new THREE.Vector3(4, -2.5, 0)
    const distance = pos.distanceTo(trashPos)
    if (distance < 2) {
      onDrop(name)
    }
  }

  return (
    <group ref={ref} {...props} onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
      {children}
    </group>
  )
}

const QuestionOne = () => {
  const [cokeVisible, setCokeVisible] = useState(true)
  const [textileVisible, setTextileVisible] = useState(true)
  const [cowVisible, setCowVisible] = useState(true)
  const [message, setMessage] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [showQuestionTwo, setShowQuestionTwo] = useState(false);


  const handleDrop = (name) => {
    // Mapear nombres a industrias
    const industries = {
      coke: "industria de bebidas",
      textile: "industria textil",
      cow: "industria ganadera",
    };

    // Establecer visibilidad en falso para el objeto seleccionado
    if (name === "coke") setCokeVisible(false);
    if (name === "textile") setTextileVisible(false);
    if (name === "cow") setCowVisible(false);

    // Determinar si la respuesta es correcta
    const selectedIndustry = industries[name];
    const isCorrect = name === "cow"; // La respuesta correcta es "cow"

    // Mostrar modal con el mensaje adecuado
    setShowModal(true);
    if (isCorrect) {
      setMessage("industria ganadera"); // Mensaje para la respuesta correcta
    } else {
      setMessage(selectedIndustry); // Mostrar la industria seleccionada
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (showQuestionTwo) {
    return <QuestionTwo />;
  }

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundImage: "url('/univalleEnv.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: 'relative'
      }}
    >
      <div className="absolute inset-0 backdrop-blur-md bg-black bg-opacity-30" style={{ pointerEvents: 'none' }}></div>

      <Canvas
        className="relative"
        style={{ width: '100vw', height: '100vh', pointerEvents: 'auto' }}
      >
        <OrthographicCamera
          makeDefault
          position={[0, 0, 10]}
          near={0.1}
          far={100}
          zoom={130}
        />

        <hemisphereLight skyColor={"#ffffff"} groundColor={"#444444"} intensity={0.8} position={[0, 50, 0]} />
        <directionalLight color="white" position={[10, 10, 10]} intensity={1} />
        <directionalLight color="white" position={[1, 10, 0]} intensity={10} />
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
          primera pregunta
        </Text>

        <Text
          position={[-6.2, 1, 0]}
          fontSize={0.3}
          color="white"
          anchorX="left"
          anchorY="top"
        >
          Echa a la basura la{"\n"}
          industria que más agua{"\n"}
          desperdicia al año
          {"\n"}
          {"\n"}
          • industria de bebidas{"\n"}
          • industria ganadera{"\n"}
          • industria textil
        </Text>

        {cokeVisible && (
          <DraggableObject name="coke" onDrop={handleDrop}>
            <CokeModel position={[0, 1.5, 0]} scale={[30, 30, 30]} rotation={[0, Math.PI / 1, 0]} />
          </DraggableObject>
        )}
        {textileVisible && (
          <DraggableObject name="textile" onDrop={handleDrop}>
            <TextileModel position={[0, -1.9, 0]} scale={[2, 2, 2]} rotation={[1, Math.PI / 1, 0]} />
          </DraggableObject>
        )}
        {cowVisible && (
          <DraggableObject name="cow" onDrop={handleDrop}>
            <CowModel position={[0, -.001, 0]} rotation={[0, Math.PI / 0.6, 0]} />
          </DraggableObject>
        )}
        <TrashModel position={[4, -2.5, 0]} rotation={[0, Math.PI / 0.6, 0]} scale={[0.005, 0.005, 0.005]} />
      </Canvas>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
          onClick={closeModal}
        >
          <div className="text-center text-white max-w-lg mx-auto">
            {message === "industria ganadera" ? (
              <>
                <h1 className="text-4xl font-bold">
                  Acertaste, llevas 1/1 respuestas correctas
                </h1>
                <p className="mt-4 text-lg">Faltan 2 preguntas más.</p>
              </>
            ) : (
              <>
                <h1 className="text-4xl font-bold">Respuesta incorrecta</h1>
                <p className="mt-4 text-lg">Llevas 0/1 respuestas correctas. Faltan 2 más.</p>
              </>
            )}
            <p className="mt-6 text-lg">
              La industria ganadera consume <strong>3000 billones</strong> de litros al año. <br />
              La industria textil consume <strong>100 billones</strong> de litros al año. <br />
              La industria de bebidas consume <strong>450,000 millones</strong> de litros al año.
            </p>
            <button
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
              onClick={() => {
                setShowModal(false);  // Cierra el modal actual
                setShowQuestionTwo(true);  // Activa la segunda pregunta
                console.log("Siguiente pregunta");
              }}
            >
              Siguiente pregunta
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default QuestionOne

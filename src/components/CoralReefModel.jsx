import React, { useRef, useEffect, useState } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { gsap } from "gsap";

const CoralReefModel = React.forwardRef(
  (
    { position, stopAnimation, animationSpeed = 1, showBubbles = true },
    ref
  ) => {
    const gltf = useLoader(GLTFLoader, "/models/coral_reef.glb");
    const mixer = useRef(null);
    const [bubbles, setBubbles] = useState([]);

    useEffect(() => {
      // Carga del modelo y configuración de sombras
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.material.side = THREE.DoubleSide;
        }
      });

      mixer.current = new THREE.AnimationMixer(gltf.scene);
      gltf.animations.forEach((clip) => {
        const action = mixer.current.clipAction(clip);
        action.play();
      });
      mixer.current.timeScale = animationSpeed;
    }, [gltf, animationSpeed]);

    useEffect(() => {
      if (mixer.current) {
        if (stopAnimation) {
          mixer.current.stopAllAction();
        } else {
          gltf.animations.forEach((clip) => {
            const action = mixer.current.clipAction(clip);
            action.play();
          });
        }
      }
    }, [stopAnimation, gltf]);

    useFrame((state, delta) => {
      if (mixer.current && !stopAnimation) {
        mixer.current.update(delta);
      }

      // Actualizar la posición de las burbujas en cada frame
      setBubbles((prevBubbles) =>
        prevBubbles.map((bubble) => {
          const newY = bubble.position.y + bubble.velocity * delta;
          return {
            ...bubble,
            position: new THREE.Vector3(
              bubble.position.x,
              newY > 2 ? 0 : newY, // Reiniciar la posición si supera el límite
              bubble.position.z
            ),
          };
        })
      );
    });

    // Función para crear burbujas
    const createBubbles = () => {
      const newBubbles = [];
      for (let i = 0; i < 10; i++) {
        const bubble = {
          position: new THREE.Vector3(
            Math.random() * 8 - 5, // Posición aleatoria en X
            Math.random() * 3, // Posición aleatoria en Y (debajo del arrecife)
            Math.random() * 4 - 2 // Posición aleatoria en Z
          ),
          radius: Math.random() * 0.5 + 0.01, // Tamaño aleatorio de la burbuja
          velocity: Math.random() * 0.5 + 0.5, // Velocidad aleatoria de la burbuja
        };
        newBubbles.push(bubble);
      }
      setBubbles(newBubbles);
    };

    useEffect(() => {
      if (showBubbles) {
        createBubbles(); // Genera las burbujas cuando se debe mostrar
      } else {
        setBubbles([]); // Elimina las burbujas cuando no se deben mostrar
      }
    }, [showBubbles]);

    return (
      <>
        <primitive object={gltf.scene} ref={ref} position={position} />
        {showBubbles &&
          bubbles.map((bubble, index) => (
            <mesh key={index} position={bubble.position}>
              <sphereGeometry args={[bubble.radius, 16, 16]} />
              <meshStandardMaterial
                color="white"
                opacity={0.7}
                transparent={true}
              />
            </mesh>
          ))}
      </>
    );
  }
);

export default CoralReefModel;

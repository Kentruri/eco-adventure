import React, { useRef, useEffect } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

const CoralReefModel = React.forwardRef(
  ({ position, stopAnimation, animationSpeed = 1 }, ref) => {
    const gltf = useLoader(GLTFLoader, "/models/coral_reef.glb");
    const mixer = useRef(null);

    useEffect(() => {
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          // Activar sombras en cada malla del modelo
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
    });

    return <primitive object={gltf.scene} ref={ref} position={position} />;
  }
);

export default CoralReefModel;

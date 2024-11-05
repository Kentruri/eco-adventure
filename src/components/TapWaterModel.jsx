import React, { useRef, useEffect } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from 'three';

const TapWaterModel = React.forwardRef(({ position, stopAnimation, animationSpeed = 8 }, ref) => {
  const gltf = useLoader(GLTFLoader, "/models/tap_water_dripping.glb");
  const mixer = useRef(null);
  const hiddenObjects = useRef([]);

  useEffect(() => {
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        // Activar sombras en cada malla del modelo
        child.castShadow = true;
        child.receiveShadow = true;

        if (
          child.name === "pPipe4_water_0" ||
          child.name === "pCylinder1_water_0" ||
          child.name === "pPlane1_water_cover_0"
        ) {
          hiddenObjects.current.push(child);
        }

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
        hiddenObjects.current.forEach((object) => {
          object.visible = false;
        });
      } else {
        gltf.animations.forEach((clip) => {
          const action = mixer.current.clipAction(clip);
          action.play();
        });
        hiddenObjects.current.forEach((object) => {
          object.visible = true;
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
});

export default TapWaterModel;

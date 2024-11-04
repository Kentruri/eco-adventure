import React, { useRef, useEffect } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from 'three';

const TapWaterModel = ({ position = [0, 0, 0] }) => { 
  const gltf = useLoader(GLTFLoader, "/models/tap_water_dripping.glb");
  const mixer = useRef(null);

  useEffect(() => {
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        // Ocultar elementos de agua
        if (
          child.name === "pPipe4_water_0" ||
          child.name === "pCylinder1_water_0" ||
          child.name === "pPlane1_water_cover_0"
        ) {
          child.visible = false;
        }
        child.material.side = THREE.DoubleSide;
      }
    });

    mixer.current = new THREE.AnimationMixer(gltf.scene);

    gltf.animations.forEach((clip) => {
      const action = mixer.current.clipAction(clip);
      action.play();
    });
  }, [gltf]);

  useFrame((state, delta) => {
    if (mixer.current) {
      mixer.current.update(delta);
    }
  });

  return <primitive object={gltf.scene} position={position} />; 
};

export default TapWaterModel;
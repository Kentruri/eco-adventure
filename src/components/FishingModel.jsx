import React, { useRef, useEffect } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from 'three';

const FishingModel = () => {
  const gltf = useLoader(GLTFLoader, "/models/fishing.glb");
  const mixer = useRef(null);

  useEffect(() => {
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
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

  return <primitive object={gltf.scene} />;
};

export default FishingModel;
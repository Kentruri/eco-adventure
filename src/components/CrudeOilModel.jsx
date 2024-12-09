import React, { useRef, useEffect } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

const CrudeOilModel = React.forwardRef(
  (
    {
      position,
      stopAnimation,
      animationSpeed = 1,
      rotation = [0, 0, 0],
      ...props
    },
    ref
  ) => {
    const gltf = useLoader(GLTFLoader, "/models/crude_oil_barrel.glb");
    const mixer = useRef(null);
    const hiddenObjects = useRef([]);

    useEffect(() => {
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

    return (
      <primitive
        object={gltf.scene}
        ref={ref}
        position={position}
        rotation={rotation}
        {...props}
      />
    );
  }
);

export default CrudeOilModel;

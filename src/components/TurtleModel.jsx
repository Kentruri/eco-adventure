import { useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const TurtleModel = () => {
  const gltf = useLoader(GLTFLoader, '/models/turtle.glb');
  const turtleRef = useRef(); 
  const mixer = useRef(null); 

  const [direction, setDirection] = useState(1);
  const isRotating = useRef(false); 
  const rotationProgress = useRef(0); 

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

    if (turtleRef.current) {
      if (!isRotating.current) {
        turtleRef.current.position.x += 0.01 * direction;

        if (turtleRef.current.position.x > 4 || turtleRef.current.position.x < 0) {
          isRotating.current = true; 
          rotationProgress.current = 0; 
        }
      }

      if (isRotating.current) {
        turtleRef.current.rotation.y += 0.01; 
        rotationProgress.current += 0.01;

        if (rotationProgress.current >= (200 * Math.PI) / 180) { 
          isRotating.current = false; 
          setDirection(direction * -1); 
          rotationProgress.current = 0;
        }
      }
    }
  });

  return <primitive ref={turtleRef} object={gltf.scene} scale={0.5} />;
};

export default TurtleModel;
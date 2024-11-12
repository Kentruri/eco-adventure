import React, { useRef, useEffect } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

const WaterPollutionModel = ({ position }) => {
    // Cargar el modelo GLB de forma síncrona
    const gltf = useLoader(GLTFLoader, '/models/water_pollution.glb');
    const mixer = useRef(null);

    useEffect(() => {
        // Configuración de materiales y sombras
        gltf.scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material.side = THREE.DoubleSide;
            }
        });

        // Configuración del mixer para animaciones
        mixer.current = new THREE.AnimationMixer(gltf.scene);

        gltf.animations.forEach((clip) => {
            const action = mixer.current.clipAction(clip);
            action.play();
        });
    }, [gltf]);

    // Actualización del mixer en cada frame
    useFrame((state, delta) => {
        if (mixer.current) {
            mixer.current.update(delta);
        }
    });

    return <primitive object={gltf.scene} position={position} />;
};

export default WaterPollutionModel;

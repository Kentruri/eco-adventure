import React, { useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

const WaterPollutionModel = ({ position }) => {
    // Cargar el modelo GLB de forma síncrona
    const gltf = useLoader(GLTFLoader, '/models/water_pollution.glb');

    useEffect(() => {
        gltf.scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material.side = THREE.DoubleSide;
            }
        });
    }, [gltf]);

    return <primitive object={gltf.scene} position={position} />;
};

export default WaterPollutionModel;
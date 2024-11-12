import React, { useEffect, useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

const WaterPollutionModel = React.forwardRef(({ position }, ref) => {
    // Cargar el modelo GLB
    const gltf = useLoader(GLTFLoader, '/models/water_pollution.glb');

    // Configurar sombras y lado del material
    useEffect(() => {
        gltf.scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material.side = THREE.DoubleSide;
            }
        });
    }, [gltf]);

    // Renderizar el modelo
    return <primitive object={gltf.scene} ref={ref} position={position} />;
});

export default WaterPollutionModel;

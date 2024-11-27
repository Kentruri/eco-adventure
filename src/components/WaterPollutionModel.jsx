import React, { useRef, useEffect, useState } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

const WaterPollutionModel = ({ position }) => {
    const gltf = useLoader(GLTFLoader, '/models/water_pollution.glb');
    const mixer = useRef(null);
    const bagsRef = useRef(); // Referencia al nodo de las bolsas
    const bottlesRef = useRef(); // Referencia al nodo de las botellas

    // Estado para controlar la posición de las bolsas y las botellas
    const [bagsPosition, setBagsPosition] = useState({ y: 5 }); // Bolsas comienzan desde y = 5
    const [bottlesPosition, setBottlesPosition] = useState({ y: 5 }); // Botellas comienzan desde y = 5

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

        // Referenciar los nodos de las bolsas y las botellas
        bagsRef.current = gltf.scene.getObjectByName('bags');
        bottlesRef.current = gltf.scene.getObjectByName('bottles');
    }, [gltf]);

    useFrame((state, delta) => {
        // Actualizar el mixer si existe
        if (mixer.current) {
            mixer.current.update(delta);
        }

        // Animar las bolsas
        if (bagsRef.current) {
            setBagsPosition((prev) => {
                const newY = prev.y - delta * 2; // Baja a velocidad controlada por delta
                return { y: newY < -5 ? 5 : newY }; // Reinicia cuando llega a y = -5
            });

            // Aplicar la posición animada
            bagsRef.current.position.y = bagsPosition.y;
        }

        // Animar las botellas
        if (bottlesRef.current) {
            setBottlesPosition((prev) => {
                const newY = prev.y - delta * 2.5; // Baja más rápido que las bolsas
                return { y: newY < -5 ? 5 : newY }; // Reinicia cuando llega a y = -5
            });

            // Aplica la posición animada
            bottlesRef.current.position.y = bottlesPosition.y;
        }
    });

    return <primitive object={gltf.scene} position={position} />;
};

export default WaterPollutionModel;
import React, { useRef, useEffect } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

const BottleModel = React.forwardRef(
    (
        {
            position,
            stopAnimation,
            animationSpeed = 1,
            rotation = [0, 0, 0],
            opacity = 1, // Agregado para el efecto de desvanecimiento
            ...props
        },
        ref
    ) => {
        const gltf = useLoader(GLTFLoader, "/models/bottle.glb");
        const mixer = useRef(null);

        useEffect(() => {
            // Configuración de materiales
            gltf.scene.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    child.material.side = THREE.DoubleSide;
                    child.material.transparent = true;
                    child.material.opacity = opacity; // Aplica opacidad
                }
            });

            // Configuración de la animación
            mixer.current = new THREE.AnimationMixer(gltf.scene);
            gltf.animations.forEach((clip) => {
                const action = mixer.current.clipAction(clip);
                action.play();
            });

            mixer.current.timeScale = animationSpeed;
        }, [gltf, animationSpeed, opacity]);

        useEffect(() => {
            if (mixer.current) {
                if (stopAnimation) {
                    mixer.current.stopAllAction();
                    gltf.scene.visible = false; // Oculta el objeto
                } else {
                    gltf.animations.forEach((clip) => {
                        const action = mixer.current.clipAction(clip);
                        action.play();
                    });
                    gltf.scene.visible = true; // Muestra el objeto
                }
            }
        }, [stopAnimation, gltf]);

        // Actualización de la animación
        useFrame((_, delta) => {
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

export default BottleModel;
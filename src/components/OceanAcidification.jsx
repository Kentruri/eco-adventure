import React, { useEffect, useRef } from 'react'
import { Canvas, useLoader, useFrame } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { Provider, useDispatch } from 'react-redux'
import { configureStore, createSlice } from '@reduxjs/toolkit'
import * as THREE from 'three'

const navigationSlice = createSlice({
    name: 'navigation',
    initialState: { currentStep: 0 },
    reducers: {
        goBack: (state) => {
            state.currentStep -= 1
        },
        continueJourney: (state) => {
            state.currentStep += 1
        },
    },
})

const store = configureStore({
    reducer: {
        navigation: navigationSlice.reducer,
    },
})

export const { goBack, continueJourney } = navigationSlice.actions

function Model() {
    const gltf = useLoader(GLTFLoader, "/models/fishing.glb")
    const mixer = useRef(null)

    useEffect(() => {
        gltf.scene.traverse((child) => {
            if (child.isMesh) {
                child.material.side = THREE.DoubleSide
            }
        })

        mixer.current = new THREE.AnimationMixer(gltf.scene)

        gltf.animations.forEach((clip) => {
            const action = mixer.current.clipAction(clip)
            action.play()
        })
    }, [gltf])

    useFrame((state, delta) => {
        if (mixer.current) {
            mixer.current.update(delta)
        }
    })

    return <primitive object={gltf.scene} />
}

function OceanAcidificationContent() {
    const dispatch = useDispatch()

    return (
        <div className="relative h-screen w-full overflow-hidden bg-white">
            <Canvas className="h-full w-full">
                <ambientLight color="blue" intensity={1} />
                <directionalLight color="white" position={[10, 10, 10]} intensity={1} />
                <directionalLight color="white" position={[-10, -10, -10]} intensity={1} />
                <directionalLight color="white" position={[10, -10, 10]} intensity={1} />
                <directionalLight color="white" position={[-10, 10, 10]} intensity={1} />
                <directionalLight color="white" position={[10, 10, -10]} intensity={1} />

                <PerspectiveCamera
                    makeDefault
                    position={[12, 6, 19]}
                    fov={75}
                    near={0.5}
                    far={1000}
                />

                <Model />
                <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
            </Canvas>

            <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg max-w-4xl">
                    <h1 className="text-4xl font-bold mb-6 text-black">Acidificación de los Oceanos</h1>
                    <p className="text-lg mb-8 text-black">
                    La acidificación de los océanos es un fenómeno ambiental que ocurre cuando el dióxido de carbono (CO₂) se disuelve en el agua del mar, 
                    formando ácido carbónico y reduciendo el pH oceánico. Este proceso altera el equilibrio químico natural de los océanos, 
                    afectando gravemente a los ecosistemas marinos, como los corales, moluscos y algunos crustáceos. Todo esto impulsado en gran medida por 
                    las emisiones humanas de CO₂
                    </p>
                    <div className="flex justify-center space-x-4 w-full">
                        <button
                            onClick={() => dispatch(goBack())}
                            className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-full transition duration-300"
                        >
                            Volver atrás
                        </button>
                        <button
                            onClick={() => dispatch(continueJourney())}
                            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition duration-300"
                        >
                            Continuar viaje
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function OceanAcidification() {
    return (
        <Provider store={store}>
            <OceanAcidificationContent />
        </Provider>
    )
}
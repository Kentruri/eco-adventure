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

function WaterPollutionContent() {
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
                    position={[6, 2, 7]}
                    fov={75}
                    near={0.5}
                    far={1000}
                />

                <Model />
                <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
            </Canvas>

            <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg max-w-2xl">
                    <h1 className="text-4xl font-bold mb-6 text-black">Contaminación del Agua</h1>
                    <p className="text-lg mb-8 text-black">
                        La contaminación del agua es uno de los problemas ambientales más graves que enfrentamos hoy en día.
                        Afecta a ecosistemas acuáticos, la vida marina y la salud humana. Las principales fuentes de contaminación
                        incluyen desechos industriales, pesticidas agrícolas y residuos plásticos.
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

export default function WaterPollution() {
    return (
        <Provider store={store}>
            <WaterPollutionContent />
        </Provider>
    )
}
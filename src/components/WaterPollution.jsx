import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Provider, useDispatch } from 'react-redux'
import { configureStore, createSlice } from '@reduxjs/toolkit'

// Create a simple navigation slice
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

// Create the store
const store = configureStore({
    reducer: {
        navigation: navigationSlice.reducer,
    },
})

// Export the action creators
export const { goBack, continueJourney } = navigationSlice.actions

function WaterPollutionModel() {
    return (
        <mesh>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color="teal" opacity={0.7} transparent />
        </mesh>
    )
}

function WaterPollutionContent() {
    const dispatch = useDispatch()

    return (
        <div className="relative h-screen w-full overflow-hidden bg-teal-900">
            <Canvas className="absolute inset-0">
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <WaterPollutionModel />
                <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
                <h1 className="text-4xl font-bold mb-6">Contaminación del Agua</h1>
                <p className="text-lg mb-8 max-w-2xl text-center">
                    La contaminación del agua es uno de los problemas ambientales más graves que enfrentamos hoy en día.
                    Afecta a ecosistemas acuáticos, la vida marina y la salud humana. Las principales fuentes de contaminación
                    incluyen desechos industriales, pesticidas agrícolas y residuos plásticos.
                </p>
                <div className="flex space-x-4">
                    <button
                        onClick={() => dispatch(goBack())}
                        className="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-full transition duration-300"
                    >
                        Volver atrás
                    </button>
                    <button
                        onClick={() => dispatch(continueJourney())}
                        className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-full transition duration-300"
                    >
                        Continuar viaje
                    </button>
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
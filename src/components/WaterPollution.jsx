import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import WaterPollutionModel from './WaterPollutionModel';

const WaterPollution = () => {
    const cameraRef = useRef();
    const controlsRef = useRef(); // Reference to OrbitControls
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [content, setContent] = useState({
        title: "La contaminación del agua: un problema global",
        text: "La contaminación del agua afecta a millones de personas en todo el mundo. Desde plásticos hasta productos químicos tóxicos, los cuerpos de agua están siendo destruidos, poniendo en peligro la vida de muchas especies, incluida la nuestra. Es esencial que comprendamos la magnitud de este problema para poder actuar de manera efectiva.",
    });
    const [isExiting, setIsExiting] = useState(false);
    const [isEntering, setIsEntering] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    const handleCameraTransition = (nextStep) => {
        const positions = [
            { x: 1, y: 1, z: 1 },
            { x: 1, y: 5, z: 15 },
            { x: -5, y: 3, z: -10 },
            { x: 5, y: -4, z: -10 },
        ];

        gsap.to(cameraRef.current.position, {
            x: positions[nextStep - 1].x,
            y: positions[nextStep - 1].y,
            z: positions[nextStep - 1].z,
            duration: 2,
            onUpdate: () => {
                cameraRef.current.lookAt(0, 0, 0);
            },
        });

        setIsExiting(true);
        setHasInteracted(true);

        // Cambia el contenido según el paso
        const contents = [
            {
                title: "La contaminación del agua: un problema global",
                text: "La contaminación del agua afecta a millones de personas en todo el mundo. Desde plásticos hasta productos químicos tóxicos, los cuerpos de agua están siendo destruidos, poniendo en peligro la vida de muchas especies, incluida la nuestra. Es esencial que comprendamos la magnitud de este problema para poder actuar de manera efectiva."
            },
            {
                title: "Causas de la contaminación del agua",
                text: "Las causas de la contaminación del agua son variadas. Desde el vertido industrial hasta el uso excesivo de pesticidas y fertilizantes en la agricultura, todo contribuye a la degradación de nuestros recursos hídricos. Esto no solo afecta a la fauna y la flora acuática, sino también a los seres humanos, que dependen de este recurso para su supervivencia."
            },
            {
                title: "Soluciones para la contaminación del agua",
                text: "Existen soluciones para mitigar la contaminación del agua. El reciclaje de plásticos, el tratamiento adecuado de aguas residuales y la reducción de la contaminación industrial son pasos cruciales. Además, la educación y la conciencia pública son fundamentales para fomentar un uso más responsable y sostenible del agua."
            },
            {
                title: "¡Actúa ahora! Protege el agua",
                text: "El futuro de nuestros ecosistemas acuáticos y nuestra salud dependen de las acciones que tomemos hoy. Involúcrate en la conservación del agua, apoya políticas públicas que promuevan la sostenibilidad y reduce tu propio impacto en el medio ambiente. Cada pequeña acción cuenta para hacer un cambio global."
            }
        ];

        setContent(contents[nextStep - 1]);

        setTimeout(() => {
            setStep(nextStep);
            setIsExiting(false);
            setIsEntering(true);
            setTimeout(() => setIsEntering(false), 500);
        }, 500);
    };

    useEffect(() => {
        const checkCanvas = setInterval(() => {
            if (document.querySelector('canvas')) {
                setIsLoading(false);
                clearInterval(checkCanvas);
            }
        }, 100);

        return () => clearInterval(checkCanvas);
    }, []);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowRight' && step < 4) {
                handleCameraTransition(step + 1);
            } else if (event.key === 'ArrowLeft' && step > 1) {
                handleCameraTransition(step - 1);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [step]);

    const boxPositions = [
        'inset-0',
        'top-20 left-8',
        'bottom-8 left-8',
        'inset-0',
    ];

    const exitAnimation = 'transform -translate-y-32 opacity-0 transition-all duration-500 ease-in-out';
    const enterAnimation = 'transform translate-y-32 opacity-0 transition-all duration-500 ease-in-out';

    return (
        <div className="w-full h-[100vh] relative">
            <Canvas className="h-[90vh] w-[90vw]" style={{ background: 'white' }}>
                <ambientLight color="white" intensity={1} />
                <directionalLight color="white" position={[10, 10, 10]} intensity={1} />
                <PerspectiveCamera
                    ref={cameraRef}
                    makeDefault
                    position={[1, 1, 1]}
                    fov={75}
                    near={0.5}
                    far={1000}
                />
                <OrbitControls ref={controlsRef} />
                <WaterPollutionModel position={[0, 0, 0]} />
            </Canvas>

            {isLoading ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                    <h2 className="text-3xl font-bold text-slate-700">Cargando...</h2>
                </div>
            ) : (
                <div
                    className={`absolute ${boxPositions[step - 1]} flex flex-col items-center justify-center p-8
                        ${isExiting ? exitAnimation : ""}
                        ${isEntering ? enterAnimation : ""}
                        ${!isExiting && !isEntering && "transform translate-y-0 opacity-100 transition-all duration-500 ease-in-out"}
                    `}
                >
                    <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg max-w-2xl fade">
                        <h1 className="text-4xl font-bold mb-6 text-black">{content.title}</h1>
                        <p className="text-lg mb-8 text-black">{content.text}</p>
                        <div className="flex justify-center space-x-4 w-full">
                            {step > 1 && (
                                <button
                                    onClick={() => handleCameraTransition(step - 1)}
                                    className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-full transition duration-300"
                                >
                                    Volver atrás
                                </button>
                            )}
                            {step === 1 ? (
                                <button
                                    onClick={() => handleCameraTransition(step + 1)}
                                    className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition duration-300"
                                >
                                    Iniciar viaje
                                </button>
                            ) : step < 4 ? (
                                <button
                                    onClick={() => handleCameraTransition(step + 1)}
                                    className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition duration-300"
                                >
                                    Continuar viaje
                                </button>
                            ) : (
                                <button
                                    onClick={() => navigate('/login')}
                                    className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition duration-300"
                                >
                                    Ponte a prueba
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WaterPollution;
import React from 'react';
import { Canvas } from '@react-three/fiber';
import WaterPollutionModel from './WaterPollutionModel';

function WaterPollution() {
    return (
        <div className="h-[100vh]">
        <Canvas>
        <ambientLight intensity={1.5} />
          <pointLight castShadow color="white" position={[0, 2, 0]} intensity={1.5} distance={5} />
            <WaterPollutionModel position={[0, 0, 0]} />
        </Canvas>
        </div>
    );
}

export default WaterPollution;
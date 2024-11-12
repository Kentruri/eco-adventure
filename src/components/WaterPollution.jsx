import React from 'react';
import WaterPollutionModel from '@/components/WaterPollutionModel.jsx';

export default function WaterPollution() {
    return (
        <WaterPollutionModel position={[0, 0, 0]} stopAnimation={false} animationSpeed={1} />
    );
}

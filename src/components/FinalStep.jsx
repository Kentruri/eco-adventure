import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";

const FinalStep = ({ correctAnswers = 0, totalQuestions = 0 }) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(true);
    }, 50); 

    return () => clearTimeout(timer); 
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      {showConfetti && <Confetti />}
      <h1 className="text-4xl font-bold mb-4">
        ¡Felicidades!
      </h1>
      <p className="text-lg">
        Has obtenido <strong>{correctAnswers}</strong> respuestas correctas de{" "}
        <strong>{totalQuestions}</strong>.
      </p>
    </div>
  );
};

export default FinalStep;
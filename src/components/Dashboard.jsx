
import { useSelector } from "react-redux";
import { selectAuth } from "@/redux/slices/auth";
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { currentUser } = useSelector(selectAuth);

  const flyControlsRef = useRef(null);

  useEffect(() => {
    if (flyControlsRef.current) {
      flyControlsRef.current.movementSpeed = 10;
      flyControlsRef.current.rollSpeed = 0.5;
    }
  }, [flyControlsRef]);

  const getDisplayName = (email) => {
    if (email) {
      const name = email.split('.')[0]; 
      return name;
    }
    return '';
  };


  return (
    <div className="h-screen flex">
      <div className="flex flex-col items-start justify-center space-y-6 w-1/2 p-8 bg-slate-100 z-10 ">
      <div class="flex flex-col items-start gap-4 ml-4 bg-opacity-[40%] bg-slate-100 shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 ">
          Hola, {currentUser.displayName || getDisplayName(currentUser.email)}!
        </h1>
        <p className="text-[20px] text-gray-700 text-left w-[550px]">
          ¿Qué te parece si ponemos a prueba tus habilidades y testeamos tu
          conocimiento en cuanto al cuidado del medio ambiente? ¡Anímate!
        </p>
        {/* Botones */}
        <div className="flex space-x-4">
            <Link to="/problems">
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-none transition duration-300">
                Aprender más
              </button>
            </Link>
            <Link to="/quiz">
              <button className="px-6 py-2 bg-purple-700 hover:bg-purple-600 text-white rounded-none transition duration-300">
                Comenzar prueba
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="w-1/2 h-full relative">
        <img
          src="/turtle.jpg"
          alt="Tortuga"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-slate-100 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );

};

export default Dashboard;
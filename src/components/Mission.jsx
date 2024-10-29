import React from 'react';

const Mision = () => {
  return (
    <div className="relative overflow-hidden bg-gray-100 h-[500px] flex items-center justify-center p-8 rounded-lg  mx-auto">
      <div className="text-center relative z-10 w-[50%]">
        <h3 className="text-5xl font-medium text-gray-500 italic mb-4">Misión</h3>
        
        <p className="text-4xl font-light text-gray-900">
          Nuestra misión es proteger y preservar los recursos hídricos del planeta, promoviendo prácticas sostenibles que aseguren agua limpia y accesible para todos. Nos esforzamos por innovar en soluciones que combatan la contaminación, impulsen la conservación y fomenten la educación ambiental, con el objetivo de inspirar a comunidades y empresas a tomar acciones responsables en favor del agua y del medio ambiente.
          <img

            src="https://images.vexels.com/content/204948/preview/quotation-marks-punctuation-stroke-53431d.png"
            alt="Quotation Marks"
            className="absolute bottom-[-30px] right-[-30px] w-[150px] h-[150px] opacity-20"
          />
        </p>
      </div>

    </div>
  );
};

export default Mision;
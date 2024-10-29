import React from 'react';
import { FaTwitter, FaFacebook, FaLinkedin, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center border-b border-gray-600 pb-4">
          <div className="flex items-center space-x-2">
              <img src="/logo/gitRD.png" alt="Logo" className="h-[150px] w-[150px]" />
          </div>

          <div className="flex space-x-16 text-start">
            <div>
              <h4 className="font-semibold text-white ">Registrate gratis</h4>
              <a href="#" className="text-gray-400 hover:text-gray-100">Sign Up</a>
            </div>
            <div>
              <h4 className="font-semibold text-white ">Compañía</h4>
              <a href="#" className="text-gray-400 hover:text-gray-100">Mas información</a>
            </div>
            <div>
              <h4 className="font-semibold text-white ">Síguenos</h4>
              <div className="flex space-x-4 mt-2 ">
                <a href="#" className="text-gray-400 hover:text-gray-100"><FaTwitter /></a>
                <a href="#" className="text-gray-400 hover:text-gray-100"><FaFacebook /></a>
                <a href="#" className="text-gray-400 hover:text-gray-100"><FaLinkedin /></a>
                <a href="#" className="text-gray-400 hover:text-gray-100"><FaYoutube /></a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center pt-4">
          <p className="text-gray-500">© 2024</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
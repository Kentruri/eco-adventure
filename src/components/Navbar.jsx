import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth, signOut } from '@/redux/slices/auth';

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { userLoggedIn } = useSelector(selectAuth);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full bg-white  bg-opacity-[30%] bg-slate-100 backdrop-blur-[12px] shadow-md z-50">
      <div className="container mx-auto flex items-center justify-between xs:p-4 md:px-4">
        <Link className="flex items-center" to="/">
          <img src="logo/side.png" width={200} alt="EcoAdventureLogo" />
        </Link>

        <div>
          <>
            
          </>
        </div>
        <div className="flex space-x-4 items-center">
          <Link
            to="/problems"
            className={`text-lg font-semibold bg-transparent ${isActive('/problems') ? 'text-dark-blue' : 'text-gray-700'
              } hover:text-dark-blue transition-colors`}
          >
            <button class=" focus:outline-none focus:ring-0 bg-transparent text-black hover:text-gray-600">
              Problemas ambientales
            </button>
          </Link>
          {!userLoggedIn ? (
            <>
              <Link
                to="/about-us"
                className={`text-lg font-semibold ${isActive('/about-us') ? 'text-dark-blue' : 'text-gray-700'
                  } hover:text-dark-blue transition-colors`}
              >
                About us
              </Link>
              <Link
                to="/login"
                className={`text-lg font-semibold ${isActive('/login') ? 'text-dark-blue' : 'text-gray-700'
                  } hover:text-dark-blue transition-colors`}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className={`text-lg font-semibold ${isActive('/signup') ? 'text-dark-blue' : 'text-gray-700'
                  } hover:text-dark-blue transition-colors`}
              >
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={() => dispatch(signOut())}
              className="text-lg font-semibold text-gray-700 hover:text-dark-blue transition-colors bg-transparent"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
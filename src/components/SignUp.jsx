import React from 'react';
import UserAuth from '@/hooks/UserAuth';

const SignUp = () => {
  const {
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
    handleSignUpWithEmail,
    handleLoginWithGoogle,
  } = UserAuth();

  return (
    <div className="w-full h-[100vh] min-h-[900px] flex justify-center items-center bg-white dark:bg-gray-900">
      <div className="max-w-md mx-auto p-4 border rounded-md shadow-md w-2/3 h-[500px] flex flex-col justify-center bg-white dark:bg-gray-800 dark:border-gray-700">
        <h1 className="text-2xl font-bold mb-4 text-black dark:text-white">Sign Up</h1>
        <div className="space-y-4 flex flex-col items-center">
          <div className="w-[90%] flex justify-center flex-col items-start">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="mt-1 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-md p-2"
              placeholder="Enter your email"
            />
          </div>
          <div className="w-[90%] flex justify-center flex-col items-start">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="mt-1 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-md p-2"
              placeholder="Enter your password"
            />
          </div>
          <button
            onClick={handleSignUpWithEmail}
            className="w-[90%] bg-slate-800 text-white py-2 rounded-md hover:bg-slate-900 transition-colors dark:bg-slate-700 dark:hover:bg-slate-800"
          >
            Sign Up
          </button>
          <p className="mt-2 text-black dark:text-gray-300">OR</p>
          <button
            onClick={handleLoginWithGoogle}
            className="w-[90%] bg-transparent shadow-xl text-black dark:text-gray-300 flex items-center justify-center border rounded-md py-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <img src="https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png" width={30} />
            Sign Up with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
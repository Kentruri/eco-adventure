import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from '@/redux/store';
import PrivateRoute from '@/components/PrivateRoute';
import AuthRoute from '@/components/AuthRoute';
import { initializeAuth, selectAuth } from '@/redux/slices/auth';
import Login from "@/components/Login.jsx";
import Dashboard from '@/components/Dashboard';
import LadingPage from '@/components/LandingPage';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SignUp from '@/components/SignUp';
import AboutUs from '@/components/AboutUs';
import Mission from '@/components/Mission';
import Problems from '@/components/Problems';

function App() {
  const dispatch = useDispatch();
  const { userLoggedIn } = useSelector(selectAuth);

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  if (userLoggedIn === null) return <></>

  return (
    <Router>
      <Navbar/>

      <Routes className="mt-[120px]">
        <Route
          path="/problems"
          element={
            <Problems/>
          }

        />
        <Route
          path="/login"
          element={
            userLoggedIn ? <Navigate to="/dashboard" /> : (
              <AuthRoute>
                <Login />
              </AuthRoute>
            )
          }
        />
        <Route
          path="/signup"
          element={
            <AuthRoute>
              <SignUp/>
            </AuthRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>

              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/about-us"
          element={
            <AuthRoute>

              <AboutUs />
              <Mission/>
            </AuthRoute>
          }
        />
        <Route
          path="/"
          element={
            <AuthRoute>
              <LadingPage/>
            </AuthRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
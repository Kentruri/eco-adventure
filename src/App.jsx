import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import store from '@/redux/store';
import PrivateRoute from './components/PrivateRoute';
import AuthRoute from './components/AuthRoute';
import { initializeAuth } from '@/redux/slices/auth';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <AuthRoute>
              {/* <LoginPage /> */}
            </AuthRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthRoute>
              {/* <SignUpPage /> */}
            </AuthRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              {/* <Dashboard /> */}
            </PrivateRoute>
          }
        />

        <Route
          path="/"
          element={
            <div style={{ display: "flex", width: "100vw", justifyContent: "center" }}>
              Hi there
            </div>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
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
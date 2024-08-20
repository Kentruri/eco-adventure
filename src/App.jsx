import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import PrivateRoute from './components/PrivateRoute';
import AuthRoute from './components/AuthRoute';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <AuthRoute>
                {/* <Component/> */}
              </AuthRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthRoute>
                {/* <Component/> */}
              </AuthRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                {/* <Component/> */}
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
    </Provider>
  );
}

export default App;
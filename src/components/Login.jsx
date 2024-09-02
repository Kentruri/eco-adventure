import React from 'react';
import UserAuth from "@/components/UserAuth";
import "@/App.css";

const Login = () => {
    const { handleLogin } = UserAuth();

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Iniciar sesión</h2>
                <button className="login-button" onClick={handleLogin}>
                    Iniciar sesión con Google
                </button>
            </div>
        </div>
    );
};

export default Login;

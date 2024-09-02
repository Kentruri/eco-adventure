import { useState } from "react";
import { useDispatch } from "react-redux";
import { signInWithGoogle } from "../redux/slices/auth";

const UserAuth = () => {

    const [isAuth, setIsAuth] = useState(false);
    const dispatch = useDispatch();

    const handleLogin = () => {
        dispatch(signInWithGoogle())
    }

    return {
        handleLogin,
        isAuth,
        setIsAuth
    }
};

export default UserAuth;
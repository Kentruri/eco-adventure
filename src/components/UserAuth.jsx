import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth, signInWithGoogle } from "@/redux/slices/auth";
import { useNavigate } from "react-router-dom";

const UserAuth = () => {

    const { userLoggedIn } = useSelector(selectAuth)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin = () => {
        dispatch(signInWithGoogle())
    }

    useEffect(() => {
        if (userLoggedIn) {
            navigate("/dashboard");
        }
    }, [userLoggedIn, navigate]);

    return {
        handleLogin,

    }
};

export default UserAuth;
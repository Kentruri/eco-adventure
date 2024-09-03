import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth, doSignInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithGoogle } from "@/redux/slices/auth";
import { useNavigate } from "react-router-dom";

const UserAuth = () => {
    const { userLoggedIn } = useSelector(selectAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleLoginWithEmail = () => {
        dispatch(doSignInWithEmailAndPassword({ email, password }));
    };

    const handleSignUpWithEmail = () => {
        dispatch(createUserWithEmailAndPassword({ email, password }));
    };

    const handleLoginWithGoogle = () => {
        dispatch(signInWithGoogle());
    };



    useEffect(() => {
        if (userLoggedIn) {
            navigate("/dashboard");
        }
    }, [userLoggedIn, navigate]);

    return {
        email,
        password,
        handleEmailChange,
        handlePasswordChange,
        handleLoginWithEmail,
        handleSignUpWithEmail,
        handleLoginWithGoogle,
    };
};

export default UserAuth;
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { loginUser } from "../../redux/auth/operations";
import css from "./LoginModal.module.css";
import { toast, Toaster } from 'react-hot-toast';

const LoginModal = ({ onSuccess }) => {
    const dispatch = useDispatch();

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email address").required("*Required"),
        password: Yup.string().min(6, "Too Short!").required("*Required"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    
    const onSubmit = async (values) => {
        const result = await dispatch(loginUser(values));
        
        if (result.meta.requestStatus === "fulfilled") {
            toast.success("Login successful!");
            if (onSuccess) onSuccess();
        } else if (result.meta.requestStatus === "rejected") {
            toast.error("Invalid email or password. Please try again.");
        }
    };

    const [showPassword, setShowPassword] = useState(false);
    
    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <div className={css.loginModal}>
                <Toaster position="top-center" />
                <h1>Log In</h1>
                <p>Welcome back! Please enter your credentials to access your account and continue your search for a psychologist.</p>
                <form className={css.loginForm} onSubmit={handleSubmit(onSubmit)}>
                    <div className={css.inputLogin}>
                        <label htmlFor="email">Email</label>
                        <input id="email" {...register("email")} placeholder="Email" />
                        {errors.email && <p>{errors.email.message}</p>}
                    </div>
                    <div className={css.inputLogin}>
                        <label htmlFor="password">Password</label>
                        <input id="password" {...register("password")} type={showPassword ? "text" : "password"} placeholder="Password" />
                        <img onClick={togglePassword} src={showPassword ? "/icons/eye.svg" : "/icons/eye-off.svg"} alt="show" />
                        {errors.password && <p>{errors.password.message}</p>}
                    </div>
                    <button className={css.loginButton} type="submit">Log In</button>
                </form>    
            </div>
        </>
    );
};

export default LoginModal;
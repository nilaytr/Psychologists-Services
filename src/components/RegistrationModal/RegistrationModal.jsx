import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { registerUser } from "../../redux/auth/operations";
import css from "./RegistrationModal.module.css";

const RegistrationModal = ({ onSuccess }) => {
    const dispatch = useDispatch();

    const validationSchema = Yup.object({
        name: Yup.string().min(3, "Too Short!").max(50, 'Too Long!').required("Required"),
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
            name: "",
            email: "",
            password: "",
        },
    });
    
    const onSubmit = async (values) => {
        const result = await dispatch(registerUser(values));
        if (result.meta.requestStatus === "fulfilled") {
            if (onSuccess) onSuccess();
        }
    };

    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <div>
                <h1>Registration</h1>
                <p>Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information.</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input id="name" {...register("name")} placeholder="Name" />
                        {errors.name && <p className={css.error}>{errors.name.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input id="email" {...register("email")} placeholder="Email" />
                        {errors.email && <p className={css.error}>{errors.email.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input id="password" {...register("password")} type={showPassword ? "text" : "password"} placeholder="Password" />
                        <img onClick={togglePassword} src={showPassword ? "/icons/eye.svg" : "/icons/eye-off.svg"} alt="show" />
                        {errors.password && <p className={css.error}>{errors.password.message}</p>}
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </>
    );
};

export default RegistrationModal;
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/auth/slice";

const LoginModal = () => {
    const dispatch = useDispatch();

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email address").required("*Required"),
        password: Yup.string().min(6, "Must be at least 6 characters").required("*Required"),
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

    const onSubmit = (values) => {
        dispatch(loginUser(values));
    };

    return (
        <>
            <div>
                <h1>Log In</h1>
                <p>Welcome back! Please enter your credentials to access your account and continue your search for a psychologist.</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input id="email" {...register("email")} placeholder="Email" />
                        {errors.email && <p>{errors.email.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input id="password" {...register("password")} placeholder="Password" />
                        {errors.password && <p>{errors.password.message}</p>}
                    </div>
                    <button type="submit">Log In</button>
                </form>    
            </div>
        </>
    );
};

export default LoginModal;
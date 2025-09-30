import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/auth/operations";

const RegistrationModal = ({ onSuccess }) => {
    const dispatch = useDispatch();

    const validationSchema = Yup.object({
        name: Yup.string().min(3, 'Must be at least 3 characters').required("*Required"),
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

    return (
        <>
            <div>
                <h1>Registration</h1>
                <p>Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information.</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input id="name" {...register("name")} placeholder="Name" name="name" error={errors.name} />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input id="email" {...register("email")} placeholder="Email" name="email" error={errors.email} />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input id="password" {...register("password")} placeholder="Password" name="password" error={errors.password} />
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </>
    );
};

export default RegistrationModal;
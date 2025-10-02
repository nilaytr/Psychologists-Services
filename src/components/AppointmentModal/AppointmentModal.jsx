import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import css from "./AppointmentModal.module.css";

const AppointmentModal = ({ psychologist, onSuccess }) => {
    const validationSchema = Yup.object({
        name: Yup.string().min(3, "Too Short!").max(50, "Too Long!").required("Required"),
        phone: Yup.string().matches(/^\+380\d{9}$/, "Invalid phone number. Format: +380XXXXXXXXX").required("*Required"),
        time: Yup.string().required("*Required"),
        email: Yup.string().email("Invalid email address").required("*Required"),
        comment: Yup.string().min(3, "Too Short!").required("Required"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = (data) => {
        console.log("Appointment form submitted:", data);
        if (onSuccess) onSuccess();
        reset();
    };

    return (
        <>
            <div >
                <h2>Make an appointment with a psychologists</h2>
                <p>You are on the verge of changing your life for the better. Fill out the short form below to book your personal appointment with a professional psychologist. We guarantee confidentiality and respect for your privacy.</p>
                <div>
                    <img src={psychologist.avatar_url} className={css.avatarImg} alt="avatar" />
                    <p>Your psychologists</p>
                    <h4>{psychologist.name}</h4>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input id="name" {...register("name")} placeholder="Name" />
                        {errors.name && <p>{errors.name.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="phone">Phone</label>
                        <input id="phone" {...register("phone")} placeholder="+380" />
                        {errors.phone && <p>{errors.phone.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="time">Time</label>
                        <input id="time" {...register("time")} placeholder="Time" />
                        {errors.time && <p>{errors.time.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input id="email" {...register("email")} placeholder="Email" />
                        {errors.email && <p>{errors.email.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="comment">Comment</label>
                        <textarea id="comment" {...register("comment")} placeholder="Comment" />
                        {errors.comment && <p>{errors.comment.message}</p>}
                    </div>
                    <button type="submit">Send</button>
                </form>
            </div>
        </>
    );
};

export default AppointmentModal;
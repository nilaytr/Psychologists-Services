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
            <div className={css.overlay}>
                <div className={css.appointmentModal}>
                    <h1>Make an appointment with a psychologists</h1>
                    <p>You are on the verge of changing your life for the better. Fill out the short form below to book your personal appointment with a professional psychologist. We guarantee confidentiality and respect for your privacy.</p>
                    <div className={css.appointmentInfo}>
                        <img src={psychologist.avatar_url} className={css.avatarImg} alt="avatar" />
                        <p>Your psychologists</p>
                        <h4>{psychologist.name}</h4>
                    </div>
                    <form className={css.appointmentForm} onSubmit={handleSubmit(onSubmit)}>
                        <div className={css.inputAppointment}>
                            <label htmlFor="name">Name</label>
                            <input id="name" {...register("name")} placeholder="Name" />
                            {errors.name && <p>{errors.name.message}</p>}
                        </div>
                        <div className={css.phoneAndTime}>
                            <div className={css.inputAppointment}>
                                <label htmlFor="phone">Phone</label>
                                <input id="phone" {...register("phone")} placeholder="+380" />
                                {errors.phone && <p>{errors.phone.message}</p>}
                            </div>
                            <div className={css.inputAppointment}>
                                <label htmlFor="time">Time</label>
                                <input id="time" className={css.timeInput} {...register("time")} placeholder="Time" />
                                {errors.time && <p>{errors.time.message}</p>}
                            </div>
                        </div>
                        <div className={css.inputAppointment}>
                            <label htmlFor="email">Email</label>
                            <input id="email" {...register("email")} placeholder="Email" />
                            {errors.email && <p>{errors.email.message}</p>}
                        </div>
                        <div className={css.inputAppointment}>
                            <label htmlFor="comment">Comment</label>
                            <textarea id="comment" {...register("comment")} placeholder="Comment" />
                            {errors.comment && <p>{errors.comment.message}</p>}
                        </div>
                        <button className={css.sendButton} type="submit">Send</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AppointmentModal;
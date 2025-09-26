import { useState } from "react";
import { useSelector } from "react-redux";
import { AppointmentModal } from "../AppointmentModal/AppointmentModal";
import { selectUser } from "../../redux/auth/selectors";
import Swal from 'sweetalert2';

const ReadMore = ({ psychologist }) => {
    const user = useSelector(selectUser);
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        if (!user) {
            Swal.fire({
                title: "Oops...",
                text: "Please Log In to make an appointment.",
                icon: "error",
                confirmButtonColor: "#54BE96",
            });
            return;
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <div>
                <ul>
                    {psychologist.reviews.map((review, reviewIndex) => (
                        <li key={reviewIndex}>
                            <div>{review.reviewer ? review.reviewer[0].toUpperCase() : "?"}</div>
                            <div>{review.reviewer}</div>
                            <div>
                                <img src="/icons/Star.svg" alt="star" />
                                <p>{review.rating}</p>
                            </div>
                            <div>{review.comment}</div>
                        </li>
                    ))}
                </ul>
                <button onClick={handleShowModal}>Make an appointment</button>
                {showModal && (
                    <AppointmentModal psychologist={psychologist} onClose={closeModal} />
                )}
            </div>
        </>
    );
};

export default ReadMore;
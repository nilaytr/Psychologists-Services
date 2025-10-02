import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import AppointmentModal from "../AppointmentModal/AppointmentModal";
import Modal from "../Modal/Modal";
import Swal from "sweetalert2";

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

    const closeModal = () => setShowModal(false);

    return (
        <div className="read-more-content">
            <h3>Reviews</h3>
            <ul>
                {psychologist?.reviews?.length > 0 ? (
                    psychologist.reviews.map((review, index) => (
                        <li key={review.id || index}>
                            <div>
                                {review.reviewer ? review.reviewer[0].toUpperCase() : "?"}
                            </div>
                            <div>{review.reviewer || "Anonymous"}</div>
                            <div>
                                <img src="/icons/Star.svg" alt="star" />
                                <p>{review.rating}</p>
                            </div>
                            <div>{review.comment}</div>
                        </li>
                    ))
                ) : (
                    <li>No reviews available.</li>
                )}
            </ul>
            <button onClick={handleShowModal}>Make an appointment</button>
            <Modal isOpen={showModal} onClose={closeModal}>
                <AppointmentModal psychologist={psychologist} onSuccess={closeModal} />
            </Modal>
        </div>
    );
};

export default ReadMore;
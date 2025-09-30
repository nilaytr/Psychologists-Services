import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import { addFavorite, removeFavorite } from "../../redux/favorites/slice";
import { selectFavorites } from "../../redux/favorites/selectors";
import { selectUser } from "../../redux/auth/selectors";
import ReadMore from "../ReadMore/ReadMore";
import Swal from "sweetalert2";

const PsychologistItem = ({ psychologist }) => {
    const {
        id,
        name,
        avatar_url,
        rating,
        price_per_hour,
        experience,
        license,
        specialization,
        initial_consultation,
        about,
    } = psychologist;
    
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const favorites = useSelector(selectFavorites);

    const [isFavorite, setIsFavorite] = useState(false);
    const [showReadMore, setShowReadMore] = useState(false);
    
    useEffect(() => {
        setIsFavorite(favorites.some(f => f.id === id));
    }, [favorites, id]);

    const handleAddFavorite = useCallback((item) => {
        dispatch(addFavorite(item));
    }, [dispatch]);
    
    const handleRemoveFavorite = useCallback((id) => {
        dispatch(removeFavorite({ id }));
    }, [dispatch]);

    const handleFavorite = () => {
        if (!user) {
            Swal.fire({
                title: "Oops...",
                text: "Please Log In to save psychologists to your favorites.",
                icon: "error",
                confirmButtonColor: "#54BE96",
            });
            return;
        }
        
        if (isFavorite) {
            handleRemoveFavorite(id);
        } else {
            handleAddFavorite(psychologist);
        }
    };

    const handleReadMore = () => {
        setShowReadMore(!showReadMore);
    };
    
    return (
        <div>
            <img src={avatar_url} alt={name} />
            <h2>{name}</h2>
            <p>Rating: {rating}</p>
            <p>Price / 1 hour: {price_per_hour}</p>
            <button onClick={handleFavorite}>
                <img src={`/icons/${isFavorite ? "filledHeart" : "emptyHeart"}.svg`} alt="Favourite" />
            </button>
            <ul>
                <li>Experience: {experience}</li>
                <li>License: {license}</li>
                <li>Specialization: {specialization}</li>
                <li>Initial consultation: {initial_consultation}</li>
            </ul>
            <div>{about}</div>
            {!showReadMore && (
                <button onClick={handleReadMore}>
                    Read more
                </button>
            )}
            {showReadMore && (
                <ReadMore psychologist={psychologist} />
            )}
        </div>
    );
};

export default PsychologistItem;
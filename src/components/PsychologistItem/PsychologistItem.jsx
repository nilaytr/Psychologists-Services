import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import { addFavorite, removeFavorite } from "../../redux/favorites/slice";
import { selectFavorites } from "../../redux/favorites/selectors";
import { ReadMore } from "../ReadMore/ReadMore";
import Swal from 'sweetalert2';

const PsychologistItem = ({ psychologist }) => {
    const { id, name, avatar_url, rating, } = psychologist;

    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const favorites = useSelector(selectFavorites);

    const [isFavorite, setIsFavorite] = useState(false);
    const [showReadMore, setShowReadMore] = useState(false);

    useEffect(() => {
        setIsFavorite(favorites.some(f => f.id === id));
    }, [favorites, id]);

    const addFavorite = useCallback((item) => {
        dispatch(addFavorite(item));
    }, [dispatch]);

    const removeFavorite = useCallback((id) => {
        dispatch(removeFavorite(id))
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
            removeFavorite(id);
        } else {
            addFavorite(psychologist);
        }
    };

    return (
        <>
            <ul>
                <li>
                    <div>
                        <img src={avatar_url} alt={name} />
                    </div>
                    <div>
                        <p>Psychologist</p>
                        <h2>{name}</h2>
                    </div>
                    <div>
                        <img src="/icons/Star.svg" alt="star" />
                        <p>Rating: {rating}</p>
                    </div>
                </li>
            </ul>
            
        </>

    )
};

export default PsychologistItem;
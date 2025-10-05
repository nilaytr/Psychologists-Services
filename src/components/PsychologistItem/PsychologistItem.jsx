import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import { addFavorite, removeFavorite } from "../../redux/favorites/slice";
import { selectFavorites } from "../../redux/favorites/selectors";
import { selectUser } from "../../redux/auth/selectors";
import ReadMore from "../ReadMore/ReadMore";
import Swal from "sweetalert2";
import css from "./PsychologistItem.module.css";

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
        <li  className={`${css.psychologistItem} ${showReadMore ? css.expanded : ""}`}>
            <div className={css.avatarWrapper}>
                <img src={avatar_url} alt={name} />
            </div>
            <div className={css.infoWrapper}>
                <div className={css.nameWrapper}>
                    <p>Psychologist</p>
                    <h2>{name}</h2>
                </div>
                <div className={css.rightWrapper}>
                    <div className={css.ratingWrapper}>
                        <img src="/icons/Star.svg" alt="star" />
                        <p>Rating: {rating}</p>
                    </div>
                    <div className={css.buttonWrapper}>
                        <p className={css.price}>Price / 1 hour: <span>{price_per_hour}$</span></p>
                        <button onClick={handleFavorite} className={css.buttonFav}>
                            <img src={`/icons/${isFavorite ? "filledHeart" : "emptyHeart"}.svg`} alt="Favourite" />
                        </button>
                    </div>
                </div>
                <div className={css.descWrapper}>
                    <ul className={css.listWrapper}>
                        <li>Experience: <span>{experience}</span></li>
                        <li>License: <span>{license}</span></li>
                        <li>Specialization: <span>{specialization}</span></li>
                        <li>Initial consultation: <span>{initial_consultation}</span></li>
                    </ul>
                    <div className={css.aboutWrapper}>{about}</div>
                    {!showReadMore && (
                        <button onClick={handleReadMore} className={css.readMoreBtn}>Read more</button>
                    )}
                    {showReadMore && (
                        <ReadMore psychologist={psychologist} />
                    )}
                </div>
            </div>
        </li>
    );
};

export default PsychologistItem;
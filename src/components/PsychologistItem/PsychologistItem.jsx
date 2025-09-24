import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite, clearFavorites } from "../../redux/favorites/slice";
import { selectFavorites } from "../../redux/favorites/selectors";

const PsychologistItem = ({ psychologist }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const favorites = useSelector(selectFavorites);
}
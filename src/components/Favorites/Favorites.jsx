import { useDispatch, useSelector } from "react-redux";
import { selectFavorites } from "../../redux/favorites/selectors";
import { selectCurrentPage, selectPerPage, selectFilter } from "../../redux/psychologists/selectors";
import { setPage } from "../../redux/psychologists/slice";
import PsychologistItem from "../PsychologistItem/PsychologistItem";
import Filter from "../Filter/Filter";
import css from "./Favorites.module.css";

const Favorites = () => {
    const dispatch = useDispatch();
    const favorites = useSelector(selectFavorites);
    const currentPage = useSelector(selectCurrentPage);
    const perPage = useSelector(selectPerPage);
    const filter = useSelector(selectFilter);

    const filterOptions = (favorites, filter) => {
        switch (filter) {
            case "A to Z":
                return favorites.slice().sort((a, b) => a.name.localeCompare(b.name));
            case "Z to A":
                return favorites.slice().sort((a, b) => b.name.localeCompare(a.name));
            case "Less to greater":
                return favorites.slice().sort((a, b) => a.price_per_hour - b.price_per_hour);
            case "Greater to less":
                return favorites.slice().sort((a, b) => b.price_per_hour - a.price_per_hour);
            case "Popular":
                return favorites.slice().sort((a, b) => b.rating - a.rating);
            case "Not popular":
                return favorites.slice().sort((a, b) => a.rating - b.rating);
            default:
                return favorites;
        }
    };

    const filteredFavorites = filterOptions(favorites, filter);

    const visibleFavorites = filteredFavorites.slice(0, currentPage * perPage);

    const needVisibleFavorites = visibleFavorites.length < favorites.length;

    const handleLoadMore = () => {
        dispatch(setPage());
    };

    return (
        <>
            <div>
                <Filter />
                {favorites.length === 0 && <p className={css.empty}>No favorite psychologists.</p>}
                {visibleFavorites.map((psychologist) => (
                    <PsychologistItem
                        key={psychologist.id}
                        psychologist={psychologist}
                    />
                ))}
            </div>
            {needVisibleFavorites && (
                <button onClick={handleLoadMore}>Load more</button>
            )}
        </>
    );
};

export default Favorites;
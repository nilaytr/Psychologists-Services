import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPsychologists, selectCurrentPage, selectPerPage, selectFilter } from "../../redux/psychologists/selectors";
import { setPage, resetPage } from "../../redux/psychologists/slice";
import { fetchPsychologists } from "../../redux/psychologists/operations";
import Filter from "../Filter/Filter";
import PsychologistItem from "../PsychologistItem/PsychologistItem";
import css from "./Psychologists.module.css";

const Psychologists = () => {
    const dispatch = useDispatch();
    const psychologists = useSelector(selectPsychologists);
    const currentPage = useSelector(selectCurrentPage);
    const perPage = useSelector(selectPerPage);
    const filter = useSelector(selectFilter);

    const filterOptions = (psychologists, filter) => {
        switch (filter) {
            case "A to Z":
                return psychologists.slice().sort((a, b) => a.name.localeCompare(b.name));
            case "Z to A":
                return psychologists.slice().sort((a, b) => b.name.localeCompare(a.name));
            case "Less to greater":
                return psychologists.slice().sort((a, b) => a.price_per_hour - b.price_per_hour);
            case "Greater to less":
                return psychologists.slice().sort((a, b) => b.price_per_hour - a.price_per_hour);
            case "Popular":
                return psychologists.slice().sort((a, b) => b.rating - a.rating);
            case "Not popular":
                return psychologists.slice().sort((a, b) => a.rating - b.rating);
            default:
                return psychologists;
        }
    };

    useEffect(() => {
        dispatch(fetchPsychologists());
    }, [dispatch]);

    useEffect(() => {
        return () => {
            dispatch(resetPage());
        };
    }, [dispatch]);

    const filteredPsychologists = filterOptions(psychologists, filter);

    const visiblePsychologists = filteredPsychologists.slice(0, currentPage * perPage);

    const needVisiblePsychologists = visiblePsychologists.length < psychologists.length;

    const handleLoadMore = () => {
        dispatch(setPage());
    };

    return (
        <>
            <div className={css.psyWrapper}>
                <div>
                    <Filter />
                    {visiblePsychologists.map((psychologist) => (
                        <PsychologistItem
                            key={psychologist.id}
                            psychologist={psychologist}
                        />
                    ))}
                </div>
                {needVisiblePsychologists && (
                    <button onClick={handleLoadMore} className={css.loadMore}>Load more</button>
                )}
            </div>
        </>
    );
};

export default Psychologists;
import { useDispatch, useSelector } from "react-redux";
import { selectPsychologists, selectCurrentPage, selectPerPage, selectFilter } from "../../redux/psychologists/selectors";
import { setPage, resetPage } from "../../redux/psychologists/slice";
import Filter from "../Filter/Filter";
import PsychologistItem from "../PsychologistItem/PsychologistItem";

const Psychologists = () => {
    const dispatch = useDispatch();
    const psychologists = useSelector(selectPsychologists);
    const currentPage = useSelector(selectCurrentPage);
    const perPage = useSelector(selectPerPage);
    const filter = useSelector(selectFilter);
}



import { useDispatch } from "react-redux";
import { setFilter } from "../../redux/psychologists/slice";
import css from "./Filter.module.css";

const Filter = () => {
    const dispatch = useDispatch();
    const defaultOption = "Show all";
    const options = [
        "A to Z",
        "Z to A",
        "Less to greater",
        "Greater to less",
        "Popular",
        "Not popular",
        "Show all",
    ];
    
    const handleFilterChange = (e) => {
        dispatch(setFilter(e.target.value));
    };

    return (
        <>
            <span>Filters</span>
            <select onChange={handleFilterChange} defaultValue={defaultOption} className={css.filterDropdown}>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </>
    );
};

export default Filter;
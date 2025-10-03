import { RingLoader } from "react-spinners";
import css from "./Loader.module.css";

export const Loader = () => {
    return (
        <div className={css.loaderWrapper}>
            <RingLoader size={50} color="#54BE96" />
        </div>
    );
};
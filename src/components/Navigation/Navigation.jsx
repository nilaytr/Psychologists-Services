import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/servicesLogo.png";
import css from "./Navigation.module.css";

const Navigation = () => {
    const location = useLocation();
    const isPsy = location.pathname === "/psychologists";

    return (
        <div className={`${css.navigation} ${isPsy ? css.psyColor : ""}`}>
            <nav>
                <NavLink to="/">
                    <img src={logo} alt="psychologists services logo" />
                </NavLink>
                <ul>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/psychologists">Psychologists</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navigation;
import { NavLink, useLocation, Outlet } from "react-router-dom";
import { Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginModal from "../LoginModal/LoginModal";
import RegistrationModal from "../RegistrationModal/RegistrationModal";
import Modal from "../Modal/Modal";
import { logoutUser } from "../../redux/auth/operations";
import { clearFavorites } from "../../redux/favorites/slice";
import { selectUser } from "../../redux/auth/selectors";
import { Loader } from "../Loader/Loader";
import logo from "../../assets/servicesLogo.png";
import css from "./Navigation.module.css";

const Navigation = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    
    const location = useLocation();
    const isPsy = location.pathname === "/psychologists";
    
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
    
    const closeModal = () => {
        setLoginModalOpen(false);
        setRegisterModalOpen(false);
    };
    
    const handleLoginClick = () => {
        setLoginModalOpen(true);
    };
    
    const handleRegisterClick = () => {
        setRegisterModalOpen(true);
    };
    
    const handleLogoutClick = () => {
        dispatch(logoutUser());
        dispatch(clearFavorites());
    };
    
    return (
        <>
            <div className={css.navContainer}>
                <div className={`${css.navigation} ${isPsy ? css.psyColor : ""}`}>
                    <nav>
                        <div className={css.navLeft}>
                            <NavLink to="/" className={css.logo}>
                                <img src={logo} alt="psychologists services logo" />
                            </NavLink>
                        </div>
                        <ul className={css.navList}>
                            <li>
                                <NavLink to="/"
                                    className={({ isActive }) =>
                                        isActive ? `${css.navLink} ${css.active}` : css.navLink}>Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/psychologists"
                                    className={({ isActive }) => isActive ? `${css.navLink} ${css.active}` : css.navLink}>Psychologists
                                </NavLink>
                            </li>
                            {user && (
                                <li>
                                    <NavLink to="/favorites"
                                        className={({ isActive }) => isActive ? `${css.navLink} ${css.active}` : css.navLink}>Favorites
                                    </NavLink>
                                </li>
                            )}
                        </ul>
                        <div className={css.userContainer}>
                            {user ? (
                                <div className={css.userBlock}>
                                    <img src="/icons/image.svg" alt="user avatar" />
                                    <span>{user.displayName}</span>
                                    <button className={css.buttonOut} onClick={handleLogoutClick}>Log out</button>
                                </div>
                            ) : (
                                    <div className={css.buttonContainer}>
                                        <button className={css.buttonLog} onClick={handleLoginClick}>Log In</button>
                                        <button className={css.buttonReg} onClick={handleRegisterClick}>Registration</button>
                                </div>
                            )}
                        </div>
                    </nav>
                </div>
            </div>
            <main>
                <Suspense fallback={<Loader />}>
                    <Outlet />
                </Suspense>
            </main>
            {isLoginModalOpen && (
                <Modal isOpen={isLoginModalOpen} onClose={closeModal}>
                    <LoginModal onSuccess={closeModal} />
                </Modal>
            )}
            {isRegisterModalOpen && (
                <Modal isOpen={isRegisterModalOpen} onClose={closeModal}>
                    <RegistrationModal onSuccess={closeModal} />
                </Modal>
            )}
        </>
    );
};

export default Navigation;
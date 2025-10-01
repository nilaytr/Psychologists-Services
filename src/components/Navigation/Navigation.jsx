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
                        {user && (
                            <li>
                                <NavLink to="/favorites">Favorites</NavLink>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
            <div>
                {user ? (
                    <div>
                        <img src="/icons/image.svg" alt="user avatar" />
                        <span>{user.displayName}</span>
                        <button onClick={handleLogoutClick}>Log Out</button>
                    </div>
                ) : (
                        <div>
                            <button onClick={handleLoginClick}>Log In</button>
                            <button onClick={handleRegisterClick}>Registration</button>
                    </div>
                )}
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
                <Modal  isOpen={isRegisterModalOpen} onClose={closeModal}>
                    <RegistrationModal onSuccess={closeModal} />
                </Modal>
            )}
        </>
    );
};

export default Navigation;
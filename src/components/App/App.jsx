import { Route, Routes } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { Loader } from "../Loader/Loader";
import PrivateRoute from "../../routes/PrivateRoute";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "../../redux/auth/slice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const PsychologistsPage = lazy(() => import('../../pages/PsychologistsPage/PsychologistsPage'));
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage/NotFoundPage'));
const FavoritesPage = lazy(() => import('../../pages/FavoritesPage/FavoritesPage'));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(clearUser());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);


  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/psychologists' element={<PsychologistsPage />} />
        <Route path='/favorites' element={
          <PrivateRoute>
            <FavoritesPage />
          </PrivateRoute>
        }/>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default App;
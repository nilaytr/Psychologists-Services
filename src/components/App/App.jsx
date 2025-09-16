import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Loader } from "../Loader/Loader";

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const PsychologistsPage = lazy(() => import('../../pages/PsychologistsPage/PsychologistsPage'));
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage/NotFoundPage'));
const FavoritesPage = lazy(() => import('../../pages/FavoritesPage/FavoritesPage'));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/psychologists' element={<PsychologistsPage />} />
        <Route path='/favorites' element={<FavoritesPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default App;
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage.jsx';
import DetailPage from '../pages/DetailPage/DetailPage.jsx';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage.jsx';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/games/:gameId" element={<DetailPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;

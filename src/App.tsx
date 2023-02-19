import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainLayout } from './app/layouts/MainLayout/MainLayout';
import { NewsPage, MainPage } from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<MainPage />} />
          <Route path=':newsId' element={<NewsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { Form } from 'features/auth/ui/AuthForm';
import { AuthWrapper } from 'features/auth/ui/AuthWrapper/AppWrapper';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainLayout } from './app/layouts/MainLayout/MainLayout';
import { NewsPage, MainPage } from './pages';

const App = () => {
  return (
    <AuthWrapper>
      <Form />
    </AuthWrapper>
  );
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
};

export default App;

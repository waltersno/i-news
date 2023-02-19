import { AuthContext } from 'app/providers/auth-provider';
import { Form } from 'features/auth/ui/AuthForm';
import { AuthWrapper } from 'features/auth/ui/AuthWrapper/AppWrapper';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { IUser } from 'shared/types/user';
import { MainLayout } from './app/layouts/MainLayout/MainLayout';
import { NewsPage, MainPage } from './pages';

const App = () => {
  const [user, setUser] = useState<IUser | null>(null);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ user, setUser }}>
      {!user ? (
        <AuthWrapper>
          <Form />
        </AuthWrapper>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route index element={<MainPage />} />
              <Route path=':newsId' element={<NewsPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      )}
    </AuthContext.Provider>
  );
};

export default App;

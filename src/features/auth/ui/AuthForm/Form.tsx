import { MouseEventHandler, useState } from 'react';

import { Button } from 'shared/ui/Button';
import { Spin } from 'shared/ui/Spin';
import { useForm } from 'shared/hooks/useForm';
import { loginApi } from 'features/auth/api/auth.api';

import { useAuth } from 'shared/hooks/useAuth';
import { FormItem } from '../FormItem/FormItem';

import classes from './Form.module.css';

export const Form = () => {
  const { handleChange, values, errors } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const loginHandle = () => {
    loginApi(values.login as string)
      .then((data) => {
        if (data[0].password === values.password) {
          login(data[0]);
        } else {
          alert('Не правильный логин или пароль');
        }
      })
      .catch(() => {
        alert('Пользователь не найден!');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const signUpHandle = () => {
    console.log('sdsa');
  };

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    if (Object.keys(errors).length !== 0 || Object.keys(values).length === 0) {
      return;
    }

    setIsLoading(true);
    if (event.currentTarget.name === 'login-submit') {
      loginHandle();
    }
  };

  return (
    <div className={classes.formContainer}>
      {isLoading && (
        <div className={classes.loadingOverlay}>
          <Spin />
        </div>
      )}

      <h4 className={classes.formHead}>Добро пожаловать</h4>

      <form className={classes.form}>
        <FormItem
          validateInfo={errors.login}
          onChange={handleChange}
          type='text'
          placeholder='Логин'
          name='login'
        />
        <FormItem
          validateInfo={errors.password}
          onChange={handleChange}
          type='password'
          placeholder='Пароль'
          name='password'
        />
        <div className={classes.formButtonWrapper}>
          <div className={classes.topSubmitButtons}>
            <Button name='login-submit' type='submit' onClick={handleSubmit}>
              Войти
            </Button>

            <Button name='registration-submit' onClick={handleSubmit} type='submit'>
              Регистрация
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

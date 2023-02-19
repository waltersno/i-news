import { ChangeEvent, useState } from 'react';

interface IFormValues {
  login: string;
  password: string;
}

export const useForm = () => {
  const [values, setValues] = useState<IFormValues>({
    login: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<IFormValues>>({});

  const validate = (name: string, value: string) => {
    switch (name) {
      case 'login':
        if (value.length <= 2) {
          setErrors({
            ...errors,
            login: 'Логин должен содержать как минимум 3 символа',
          });
        } else {
          const { login, ...restErrors } = errors;
          setErrors(restErrors);
        }
        break;

      case 'password':
        if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(value)) {
          setErrors({
            ...errors,
            password:
              'Пароль должен содержать не менее 8 символов и содержать прописные и строчные буквы, а также цифры',
          });
        } else {
          const { password, ...restErrors } = errors;
          setErrors(restErrors);
        }
        break;

      default:
        break;
    }
  };

  const handleChange = (event: ChangeEvent<any>) => {
    event.persist();

    const { name } = event.target;
    const val = event.target.value;

    validate(name, val);

    setValues({
      ...values,
      [name]: val,
    });
  };

  return {
    values,
    errors,
    handleChange,
  };
};

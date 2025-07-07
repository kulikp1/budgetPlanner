import { useEffect } from 'react';
import axios from 'axios';

export default function useRealTimeValidation({ values, setFieldError }) {
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (!values.login || values.login.length < 3) return;

      try {
        const { data } = await axios.get(
          'https://68646b9e5b5d8d03397d2d1d.mockapi.io/user'
        );
        const found = data.find(
          (u) => u.login === values.login || u.email === values.login
        );
        if (!found) {
          setFieldError('login', 'User not found');
        }
      } catch (err) {
        console.error(err);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [values.login, setFieldError]);
}

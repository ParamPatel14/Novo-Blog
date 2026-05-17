import { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';

export interface CurrentUser {
  email: string;
  name?: string;
}

export const useCurrentUser = () => {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setUser(null);
      return;
    }

    setLoading(true);
    axios
      .get(`${BACKEND_URL}/api/v1/user/me`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        setUser(response.data.user);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  return { user, loading, setUser };
};

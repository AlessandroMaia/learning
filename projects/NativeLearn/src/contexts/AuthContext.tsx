import axios from 'axios';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { createContext, PropsWithChildren, useEffect, useState } from 'react';

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onLogin?: (username: string, password: string) => Promise<User | { error: boolean; message: string }>;
  onLogout?: () => Promise<void>;
  isLoading: boolean;
}

const TOKEN_KEY = 'token_jwt';
const AuthContext = createContext<AuthProps>({
  isLoading: false
});

export const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (!context)
    throw new Error('useAuth deve estar dentro de AuthProvider');

  return context;
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);

      if (token) {
        setAuthState({
          token,
          authenticated: true,
        });

        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      }
    };

    loadToken();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      setIsLoading(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result: any = await new Promise((res) => {
        setTimeout(
          () => res({ data: { token: btoa(`${username}--${password}`) } }),
          1000
        );
      });

      setAuthState({
        token: result.data.token,
        authenticated: true,
      });

      axios.defaults.headers.common.Authorization = `Bearer ${result.data.token}`;

      await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);

      setIsLoading(false);

      router.replace('/');

      return { id: '1', name: 'John Doe', email: 'johndoe@gmail.com' };
    } catch {
      return { error: true, message: 'Invalid credentials' };
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);

    axios.defaults.headers.common.Authorization = '';

    setAuthState({
      token: null,
      authenticated: false,
    });
  };

  const value: AuthProps = {
    authState,
    onLogin: login,
    onLogout: logout,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

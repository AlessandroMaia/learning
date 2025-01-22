import { ILogin } from '@@types/Login';
import { IToken } from '@@types/Token';
import { IUsuario } from '@@types/Usuario';
import { apiConfig, IApiResponse, IApiResponseError } from '@configs/apiConfig';
import { AxiosError } from 'axios';
import * as SecureStore from 'expo-secure-store';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

const TOKEN_KEY = 'rh_token';
const USER_KEY = 'rh_user';

export interface IError {
  error?: boolean | null;
  message?: string | null;
}

interface AuthProps {
  auth?: {
    infos: {
      token?: IToken | null;
      user?: IUsuario | null;
    };
    authenticated?: boolean | null;
    mfaValid?: boolean | null;
  };
  onLogin?: (
    username: string,
    password: string
  ) => Promise<IApiResponseError | IApiResponse<ILogin>>;
  onMfa?: (
    login: string,
    code: string
  ) => Promise<IApiResponseError | IApiResponse<ILogin>>;
  onLogout?: () => Promise<void>;
}

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }: PropsWithChildren) {
  const [authState, setAuthState] = useState<{
    infos: {
      token?: IToken | null;
      user?: IUsuario | null;
    };
    authenticated?: boolean | null;
    mfaValid?: boolean | null;
  }>({
    infos: {
      token: null,
      user: null,
    },
    authenticated: null,
    mfaValid: null,
  });

  useEffect(() => {
    const load = async () => {
      try {
        const token = await SecureStore.getItemAsync(TOKEN_KEY);
        const user = await SecureStore.getItemAsync(USER_KEY);

        if (token && user) {
          const jsonToken = JSON.parse(token) as IToken;
          const jsonUser = JSON.parse(user) as IUsuario;

          const tokenExpirationDate = new Date(jsonToken.DataExpiracao);
          const currentDate = new Date();

          if (
            !jsonToken.TokenAcesso ||
            tokenExpirationDate < currentDate ||
            ![3, 4].includes(jsonUser.SituacaoMFA!)
          ) {
            logout();
            return;
          }

          setAuthState({
            infos: {
              token: jsonToken,
              user: jsonUser,
            },
            authenticated: true,
            mfaValid: true,
          });
    
          apiConfig.defaults.headers.common['TFK2'] = jsonToken.TokenAcesso;
        }
      } catch {
        logout();
      }
    };

    load();
  }, []);

  const login = async (login: string, password: string): Promise<IApiResponse<ILogin> | IApiResponseError> => {
    try {
      const res = await apiConfig.post<IApiResponse<ILogin>>('/login', {
        usuario: login,
        senha: password,
      });

      if(res.status === 500)
        throw res;
      
      setAuthState({
        infos: {
          token: res.data.resultado.Auth,
          user: res.data.resultado.Usuario,
        },
        authenticated: true,
        mfaValid: ![3, 4].includes(res.data.resultado.Usuario.SituacaoMFA!),
      });
      
      apiConfig.defaults.headers.common['TFK2'] = res.data.resultado.Auth.TokenAcesso;
      
      await SecureStore.setItemAsync(
        TOKEN_KEY,
        JSON.stringify(res.data.resultado.Auth)
      );
      await SecureStore.setItemAsync(
        USER_KEY,
        JSON.stringify(res.data.resultado.Usuario)
      );
      
      return res.data;
    } catch (e) {
      const error = e as AxiosError<IApiResponseError>;

      return error?.response?.data as IApiResponseError || {
        type: 'error',
        mensagem: 'Ocorreu um erro, entre em contato com o suporte técnico.'
      };
    }
  };

  const mfa = async (login: string, code: string): Promise<IApiResponse<ILogin> | IApiResponseError> => {
    try {
      const res = await apiConfig.post<IApiResponse<ILogin>>(
        '/login/ValidarMFA',
        {
          usuario: login,
          codigo: code,
        }
      );

      setAuthState({
        infos: {
          token: res.data.resultado.Auth,
          user: res.data.resultado.Usuario,
        },
        authenticated: true,
        mfaValid: true,
      });

      apiConfig.defaults.headers.common['TFK2'] =
        res.data.resultado.Auth.TokenAcesso;

      await SecureStore.setItemAsync(
        TOKEN_KEY,
        JSON.stringify(res.data.resultado.Auth)
      );
      await SecureStore.setItemAsync(
        USER_KEY,
        JSON.stringify(res.data.resultado.Usuario)
      );

      return res.data;
    } catch (e) {
      const error = e as AxiosError<IApiResponseError>;

      return error.response?.data as IApiResponseError || {
        type: 'error',
        mensagem: 'Ocorreu um erro, entre em contato com o suporte técnico.'
      };
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync(USER_KEY);

    apiConfig.defaults.headers.common['TFK2'] = '';

    setAuthState({
      infos: {
        token: null,
        user: null,
      },
      authenticated: false,
      mfaValid: false,
    });
  };

  const value: AuthProps = {
    onLogin: login,
    onMfa: mfa,
    onLogout: logout,
    auth: authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// export function SessionProvider({ children }: PropsWithChildren) {
//   const [[isLoading, session], setSession] = useStorageState('session');

//   return (
//     <AuthContext.Provider
//       value={{
//         signIn: () => {
//           setSession('xxx');
//         },
//         signOut: () => {
//           setSession(null);
//         },
//         session,
//         isLoading,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

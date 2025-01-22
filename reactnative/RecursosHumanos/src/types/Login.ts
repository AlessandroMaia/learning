import { IToken } from './Token';
import { IUsuario } from './Usuario';

export interface ILogin {
  Auth: IToken;
  Usuario: IUsuario
}
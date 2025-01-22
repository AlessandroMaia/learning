export interface IUsuario {
  Id?: number | null;
  IdPessoa?: number | null;
  Login: string;
  Nome: string;
  Matricula: string;
  Cargo: string;
  Foto: string;
  IdArea?: number | null;
  NomeArea: string;
  NomeDiretoria: string;
  CodigoSituacao: string;
  Situacao: string;
  Email: string;
  Documento: string;
  TipoGestor: string;
  SegredoMFA: string;
  ValidadeMFA?: Date | null;
  SituacaoMFA?: number | null;

}
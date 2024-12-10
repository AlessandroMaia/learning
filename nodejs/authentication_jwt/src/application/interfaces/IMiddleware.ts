export interface IRequest {
  headers: Record<string, string>;
}

export interface IRespose {
  statusCode: number;
  body: Record<string, any> | null;
}

export interface IData {
  data: Record<string, any>;
}

export interface IMiddleware {
  handle(request: IRequest): Promise<IRespose | IData>
}

export interface IRequest {
  body: Record<string, any>;
  accountId: string | undefined;
}

export interface IRespose {
  statusCode: number;
  body: Record<string, any> | null;
}

export interface IController {
  handle(request: IRequest): Promise<IRespose>
}

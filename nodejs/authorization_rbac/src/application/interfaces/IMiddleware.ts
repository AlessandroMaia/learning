import { IRequest } from './IRequest';
import { IRespose } from './IRespose';

export interface IData {
  data: Record<string, any>;
}

export interface IMiddleware {
  handle(request: IRequest): Promise<IRespose | IData>
}

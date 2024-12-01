import { IRequest } from './IRequest';
import { IRespose } from './IRespose';

export interface IController {
  handle(request: IRequest): Promise<IRespose>
}

import { IController } from '../interfaces/IController';
import { IRespose } from '../interfaces/IRespose';
import { IRequest } from '../interfaces/IRequest';

export class ListLeadsController implements IController {
  async handle(request: IRequest): Promise<IRespose> {
    console.log('🚀 ~ ListLeadsController ~ handle ~ request:', request);

    return {
      statusCode: 200,
      body: {
        leads: [
          { id: 1, name: 'Alessandro'},
          { id: 2, name: 'Alessandro2'},
          { id: 3, name: 'Alessandro3'}
        ]
      }
    };
  }
}

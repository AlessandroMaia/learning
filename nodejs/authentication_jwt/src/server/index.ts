import express from 'express';

import { makeSignUpController } from '../factories/SignUp/makeSignUpController';
import { makeSignInController } from '../factories/SignIn/makeSignInController';
import { routeAdapter } from './adapters/routeAdapter';
import { makeListLeadsController } from '../factories/Leads/makeListLeadsController';
import { makeAuthenticationMiddleware } from '../factories/Authentication/makeAuthenticationMiddleware';
import { middlewareAdapter } from './adapters/middlewareAdapter';

const app = express();

app.use(express.json());

app.post('/sign-up', routeAdapter(makeSignUpController()));
app.post('/sign-in', routeAdapter(makeSignInController()));

app.get('/leads',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeListLeadsController())
);

app.listen(3001, () => {
  console.log('🚀 Server stated at http://localhost:3001');
});

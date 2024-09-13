import { Router } from 'express';

// * Handlers
import SignInHandler from './handlers/SignIn';
import RegisterHandler from './handlers/Register';

const AuthRouter = Router();

AuthRouter.post('/signIn', SignInHandler);
AuthRouter.post('/signUp', RegisterHandler);


export { AuthRouter }
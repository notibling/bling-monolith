import { Router } from 'express';

// * Handlers
import GetCurrentUserHandler from './handlers/GetCurrentUser';
import UpdateUserHandler from './handlers/UpdateUser';


const UserRouter = Router();


UserRouter.get('/current', GetCurrentUserHandler);
UserRouter.put('/', UpdateUserHandler);


export { UserRouter }
import * as dotenv from 'dotenv';
dotenv.config();
import { Server } from './Server';



// * Routers
import { AuthRouter } from './domains/auth';
import { UserRouter } from './domains/user';
import { ProductRouter } from './domains/products';
// * Middlewares
import AuthMiddleware from './domains/auth/AuthMiddleware';
import { GeoRouter } from './domains/geo';
import { FilesRouter } from './domains/files';
import { CmsRouter } from './domains/cms';
import { MetricsRouter } from './domains/metrics';

// * Routers
Server.app.use('/auth', AuthRouter);
Server.app.use('/user', AuthMiddleware, UserRouter);
Server.app.use('/products', ProductRouter);
Server.app.use('/geo', AuthMiddleware, GeoRouter);
Server.app.use('/files', AuthMiddleware, FilesRouter);
Server.app.use('/cms', CmsRouter);
Server.app.use('/metrics', AuthMiddleware, MetricsRouter);


Server.listen(5001);
import { Router } from 'express';

import { AuthMiddlewareByRole } from '../auth/AuthMiddleware';
// * Handlers
import GetGeneralMetrics from './handlers/GetGeneralMetrics';

const MetricsRouter = Router();

MetricsRouter.get('/general', AuthMiddlewareByRole(['admin']), GetGeneralMetrics);


export { MetricsRouter }
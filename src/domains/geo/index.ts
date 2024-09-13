import { Router } from 'express';

// * Handlers
import GetGeoFileHandler from './handlers/GetGeoFileHandler';

const GeoRouter = Router();

GeoRouter.get('/', GetGeoFileHandler);


export { GeoRouter }
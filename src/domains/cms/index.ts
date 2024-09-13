import { Router } from 'express';

// * Handlers
import FetchSingleTypes from './handlers/FetchSingleTypes';

const CmsRouter = Router();

CmsRouter.get('/single-type', FetchSingleTypes);


export { CmsRouter }
import { Router } from 'express';

import AuthMiddleware, { AuthMiddlewareByRole } from '../auth/AuthMiddleware';
// * Handlers
import CreateProductHandler from './handlers/CreateProduct';
import FetchProductsHandler from './handlers/FetchProducts';

import FetchAttributesHandler from './handlers/attributes/FetchAttributes';
import CreateAttributeHandler from './handlers/attributes/CreateAttribute';

import FetchCategories from './handlers/categories/FetchCategories';
import CreateCategoryHandler from './handlers/categories/CreateCategory';
import UpdateCategoryHandler from './handlers/categories/UpdateCategory';
import FetchProductDisplays from './handlers/FetchProductDisplays';


const ProductRouter = Router();

ProductRouter.post('/', AuthMiddleware, CreateProductHandler);
ProductRouter.get('/', FetchProductsHandler);
// * Attributes
ProductRouter.get('/attributes', FetchAttributesHandler);
ProductRouter.post('/attributes', AuthMiddlewareByRole(['admin']), CreateAttributeHandler);
// * Categories
ProductRouter.get('/categories', FetchCategories);
ProductRouter.post('/categories', AuthMiddlewareByRole(['admin']), CreateCategoryHandler);
ProductRouter.put('/categories', AuthMiddlewareByRole(['admin']), UpdateCategoryHandler);

ProductRouter.get('/displays', FetchProductDisplays);


// * V2 Handlers
import FetchProductsHandlerV2 from './handlers/v2/FetchProductsV2';
import FetchProductsDisplaysHandlerV2 from './handlers/v2/FetchProductDisplaysV2';
import DeleteProductDisplaysHandlerV2 from './handlers/v2/DeleteProductDisplayV2';
import GetProductDisplayV2 from './handlers/v2/GetProductDisplayV2';
import GetCategoryV2 from './handlers/v2/GetCategoryV2';

//  * V2 Endpoints
ProductRouter.get('/v2/', FetchProductsHandlerV2);
ProductRouter.get('/v2/displays', FetchProductsDisplaysHandlerV2);
ProductRouter.delete('/v2/displays/:displayId', DeleteProductDisplaysHandlerV2);
ProductRouter.get('/v2/displays/:id', GetProductDisplayV2);
ProductRouter.get('/v2/categories/:id', GetCategoryV2);


export { ProductRouter }
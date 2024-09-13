import { Model } from 'objection';
import { objectionKnex } from '@/common/KnexObjection';
import { ICategory } from './Category';



interface IEntityCategory {
  id: number;
  categoryId: number;
  entityId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  entity: string;

  category: ICategory;
}

class EntityCategoryObjectionModel extends Model {
  id!: number;
  productId!: number;


  static get tableName() {
    return 'entity_category';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        categoryId: { type: 'integer' },
        entityId: { type: 'integer' },
        createdAt: { type: "string" },
        updatedAt: { type: "string" },
        deletedAt: { type: "string" },
        entity: { type: "string", enum: ["product", "service", "vehicle"] },
      }
    };
  }

  static get relationMappings() {
    const { ProductObjectionModel } = require('../Product/ProductObjectionModel');
    const { CategoryObjectionModel } = require('./CategoryObjectionModel');
    return {
      product: {
        relation: Model.BelongsToOneRelation,
        modelClass: ProductObjectionModel,
        join: {
          from: 'entity_category.productId',
          to: 'products.id'
        }
      },

      category: {
        relation: Model.BelongsToOneRelation,
        modelClass: CategoryObjectionModel,
        join: {
          from: 'entity_category.categoryId',
          to: 'categories.id'
        }
      }

    }
  }
}

EntityCategoryObjectionModel.knex(objectionKnex);

export { EntityCategoryObjectionModel, type IEntityCategory }
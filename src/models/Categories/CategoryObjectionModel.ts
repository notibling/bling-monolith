import { Model } from 'objection';
import { objectionKnex } from '@/common/KnexObjection';

class CategoryObjectionModel extends Model {
  id!: number;
  productId!: number;


  static get tableName() {
    return 'categories';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        parentId: { type: 'integer' },
        name: { type: 'string' },
        description: { type: 'string' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
        deletedAt: { type: 'string' },
      }
    };
  }

  static get relationMappings() {
    return {
      children: {
        relation: Model.HasManyRelation,
        modelClass: CategoryObjectionModel,
        join: {
          from: 'categories.id',
          to: 'categories.parentId',
        },
      },
      parent: {
        relation: Model.BelongsToOneRelation,
        modelClass: CategoryObjectionModel,
        join: {
          from: 'categories.parentId',
          to: 'categories.id',
        },
      },
    }
  }
}

CategoryObjectionModel.knex(objectionKnex);

export { CategoryObjectionModel }
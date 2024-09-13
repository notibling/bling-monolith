import { Model } from 'objection';
import { objectionKnex } from '@/common/KnexObjection';


class ServiceObjectionModel extends Model {
  static get tableName() {
    return 'services';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        title: { type: 'string' },
        description: { type: 'string' },
        shortDescription: { type: 'string' },
        price: { type: 'integer' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
        deletedAt: { type: 'string' },
        userId: { type: 'integer' }
      }
    };
  }
}

ServiceObjectionModel.knex(objectionKnex);

export { ServiceObjectionModel }
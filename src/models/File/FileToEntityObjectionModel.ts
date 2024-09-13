import { Model } from 'objection';
import { objectionKnex } from '@/common/KnexObjection';


class FileToEntityObjectionModel extends Model {
  static tableName: string = 'file_to_entity';

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        fileId: { type: 'integer' },
        entityId: { type: 'integer' },
        entity: { type: 'string', enum: ['product', 'product_variant'] },
        userId: { type: 'integer' },

        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
        deletedAt: { type: 'string', format: 'date-time' },
      }
    };
  }

  static get relationMappings() {
    const { FileObjectionModel } = require('./FileObjectionModel');
    return {
      file: {
        relation: Model.BelongsToOneRelation,
        modelClass: FileObjectionModel,
        join: {
          from: 'file_to_entity.fileId',
          to: 'files.id'
        }
      }
    }
  }
}

FileToEntityObjectionModel.knex(objectionKnex);

export { FileToEntityObjectionModel }
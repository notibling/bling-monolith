import { Model } from 'objection';
import { objectionKnex } from '@/common/KnexObjection';


class FileObjectionModel extends Model {
  static tableName: string = 'files';


  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        path: { type: 'string' },
        mimeType: { type: 'string' },
        status: { type: 'string' },
        provider: { type: 'string', enum: ['local', 's3'] },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
        deletedAt: { type: 'string' },
      }
    };
  }
}

FileObjectionModel.knex(objectionKnex);

export { FileObjectionModel }
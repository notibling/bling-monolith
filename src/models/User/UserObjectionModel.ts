import { Model } from 'objection';
import { objectionKnex } from '@/common/KnexObjection';


class UserObjectionModel extends Model {
  static tableName: string = 'users';

  
  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        firstName: { type: 'string' },
        email: { type: 'string' },
        passwor: { type: 'string' },
        type: { type: 'string', enum: ['client', 'business', 'admin'] },
        sex: { type: 'string' },
        lastName: { type: 'string' },
        birth: { type: 'string', },
        country: { type: 'string' },
        residenceCountry: { type: 'string' },
        legalIdentification: { type: 'string' },
        profileImage: { type: 'string' },

        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
        deletedAt: { type: 'string' }
      }
    };
  }
}

UserObjectionModel.knex(objectionKnex);

export { UserObjectionModel }
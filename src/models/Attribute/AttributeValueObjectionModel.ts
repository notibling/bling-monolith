import { Model } from 'objection';
import { objectionKnex } from '@/common/KnexObjection';


class AttributeValueObjectionModel extends Model {
  static get tableName() {
    return 'attribute_values';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        value: { type: 'string' }
      }
    };
  }
}

AttributeValueObjectionModel.knex(objectionKnex);

export { AttributeValueObjectionModel };
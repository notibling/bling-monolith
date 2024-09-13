import { Model } from 'objection';
import { objectionKnex } from '@/common/KnexObjection';


class AttributeObjectionModel extends Model {
  static get tableName() {
    return 'attributes';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        description: { type: 'string' },
        format: { type: 'string', enum: ['string', 'number', 'boolean', 'json', 'json_array'] },
        type: { type: 'object' },
      }
    };
  }

  static get relationMappings() {
    const { AttributeValueObjectionModel } = require('./AttributeValueObjectionModel');

    return {
      values: {
        relation: Model.ManyToManyRelation,
        modelClass: AttributeValueObjectionModel,
        join: {
          from: 'attributes.id',
          through: {
            from: 'attribute_value_mapping.attributeId',
            to: 'attribute_value_mapping.attributeValueId'
          },
          to: 'attribute_values.id'
        }
      }
    };
  }

}

AttributeObjectionModel.knex(objectionKnex);

export { AttributeObjectionModel }
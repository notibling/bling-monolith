import { Model } from 'objection';
import { objectionKnex } from '@/common/KnexObjection';

class ProductAttributeObjectionModel extends Model {
  id!: number;
  productId!: number;


  static get tableName() {
    return 'product_attributes';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        productId: { type: 'integer' },
        attributeId: { type: 'integer' },
        attributeName: { type: 'string' },
        attributeValue: { type: 'string' },
      }
    };
  }

  static get relationMappings() {
    const { AttributeObjectionModel } = require('../Attribute/AttributeObjectionModel');

    return {
      attribute: {
        relation: Model.BelongsToOneRelation,
        modelClass: AttributeObjectionModel,
        join: {
          from: 'product_attributes.attributeId',
          to: 'attributes.id',
        },
      },

    }
  }
}

ProductAttributeObjectionModel.knex(objectionKnex);

export { ProductAttributeObjectionModel }
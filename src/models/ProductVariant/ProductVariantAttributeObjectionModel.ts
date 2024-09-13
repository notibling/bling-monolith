import { Model } from 'objection';
import { objectionKnex } from '@/common/KnexObjection';


class ProductVariantAttributeObjectionModel extends Model {
  static get tableName() {
    return 'product_variant_attributes';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        attributeId: { type: 'integer' },
        attributeValue: { type: 'string' },
        variantId: { type: 'integer' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
        deletedAt: { type: 'string' }
      }
    };
  }
  static get relationMappings() {
    const { AttributeObjectionModel } = require('../Attribute/AttributeObjectionModel');
    return {
      attribute: {
        relation: Model.HasOneRelation,
        modelClass: AttributeObjectionModel,
        join: {
          from: 'product_variant_attributes.attributeId',
          to: 'attributes.id'
        }
      }
    }
  }
}

ProductVariantAttributeObjectionModel.knex(objectionKnex);

export { ProductVariantAttributeObjectionModel }
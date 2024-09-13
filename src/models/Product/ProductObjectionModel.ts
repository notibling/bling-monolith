import Objection, { Model } from 'objection';

import { objectionKnex } from '@/common/KnexObjection';

import { IFileToEntity } from '../File';
import { IEntityCategory } from '../Categories/EntityCategoryObjectionModel';


class ProductObjectionModel extends Model {
  images!: IFileToEntity[];
  categories!: IEntityCategory[];
  static get tableName() {
    return 'products';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        title: { type: 'string' },
        description: { type: 'string' },
        shortDescription: { type: 'string' },
        category: { type: 'string' },
        price: { type: 'integer' },
        priceBefore: { type: 'integer' },
        sku: { type: 'string' },
        upc: { type: 'string' },
        hasShipping: { type: 'boolean' },
        shippingCost: { type: 'integer' },
        pickupLocation: { type: 'string' },
        legalAge: { type: 'boolean' },
        hasRefund: { type: 'boolean' },
        refundCost: { type: 'integer' },
        userId: { type: 'integer' },
        sellingZone: { type: 'object' },
        paymentMethods: { type: 'object' },
        condition: { type: 'string', enum: ['new', 'used', 'refurbished'] },
      }
    };
  }

  static get virtualAttributes() {
    return ['images']
  }

  static get relationMappings(): Objection.RelationMappings {
    const { ProductVariantsObjectionModel } = require('../ProductVariant/ProductVariantObjectionModel');
    const { ProductAttributeObjectionModel } = require('../ProductAttribute/ProductAttributeObjectionModel');
    const { FileToEntityObjectionModel } = require('../File/FileToEntityObjectionModel');
    const { EntityCategoryObjectionModel } = require('../Categories/EntityCategoryObjectionModel');

    return {
      variants: {
        relation: Model.HasManyRelation,
        modelClass: ProductVariantsObjectionModel,
        join: {
          from: 'products.id',
          to: 'product_variants.productId'
        }
      },
      categories: {
        relation: Model.HasManyRelation,
        modelClass: EntityCategoryObjectionModel,
        join: {
          from: 'products.id',
          to: 'entity_category.entityId'
        },
        filter: (query) =>
          query.where('entity', 'product')
      },
      attributes: {
        relation: Model.HasManyRelation,
        modelClass: ProductAttributeObjectionModel,
        join: {
          from: 'products.id',
          to: 'product_attributes.productId'
        }
      },
      images: {
        relation: Model.HasManyRelation,
        modelClass: FileToEntityObjectionModel,
        join: {
          from: 'products.id',
          to: 'file_to_entity.entityId',
        },
        filter: (query) =>
          query.where('entity', 'product')

      }
    }
  }
  get formattedImages() {
    if (!Array.isArray(this.images)) return [];
    return this.images.filter((image) => image?.file).map((image) => ({
      ...(image?.file ?? {})
    }))
  }
  get formattedCategories() {
    console.log(this.categories);
    if (!Array.isArray(this.categories)) return [];

    return this.categories.filter(entityCategory => entityCategory.category).map((entityCategory) => ({
      ...(entityCategory.category ?? {})
    }))
  }

  $formatJson(json: Objection.Pojo): Objection.Pojo {
    json = super.$formatJson(json);
    json.images = this.formattedImages;
    json.categories = this.formattedCategories;
    return json;
  }
}

ProductObjectionModel.knex(objectionKnex);

export { ProductObjectionModel }
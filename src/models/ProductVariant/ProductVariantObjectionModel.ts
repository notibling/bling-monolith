import Objection, { Model } from 'objection';
import { objectionKnex } from '@/common/KnexObjection';
import { IFileToEntity } from '../File';


class ProductVariantsObjectionModel extends Model {
  public id!: number;
  public price!: number;
  public stock!: number;
  public skuSuffix!: string;
  public productId!: number;
  public main!: boolean;
  public createdAt!: string;
  public updatedAt!: string;
  public deletedAt!: string;
  public images!: IFileToEntity[];

  static get tableName() {
    return 'product_variants';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        price: { type: 'integer' },
        priceBefore: { type: 'integer' },
        stock: { type: 'integer' },
        skuSuffix: { type: 'string' },
        productId: { type: 'integer' },
        main: { type: 'boolean' },
        // * Join
        // variantAttributes: IRawProductVariantAttribute[] | null,

        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
        deletedAt: { type: 'string' },
      }
    };
  }


  static get relationMappings() {
    const { ProductVariantAttributeObjectionModel } = require('./ProductVariantAttributeObjectionModel');
    const { FileToEntityObjectionModel } = require('../File/FileToEntityObjectionModel');
    return {
      variantAttributes: {
        relation: Model.HasManyRelation,
        modelClass: ProductVariantAttributeObjectionModel,

        join: {
          from: 'product_variants.id',
          to: 'product_variant_attributes.variantId'
        }
      },

      images: {
        relation: Model.HasManyRelation,
        modelClass: FileToEntityObjectionModel,

        join: {
          from: 'product_variants.id',
          to: 'file_to_entity.entityId',
        },

        filter: (query: Objection.QueryBuilder<any>) =>
          query.where('entity', 'product_variant')
      }
    }
  }


  get formattedImages() {
    if (!Array.isArray(this.images)) return [];
    return this.images.filter((image) => image?.file).map((image) => ({
      ...(image?.file ?? {})
    }))
  }

  $formatJson(json: Objection.Pojo): Objection.Pojo {
    json = super.$formatJson(json);
    json.images = this.formattedImages;
    return json;
  }
}

ProductVariantsObjectionModel.knex(objectionKnex);

export { ProductVariantsObjectionModel }
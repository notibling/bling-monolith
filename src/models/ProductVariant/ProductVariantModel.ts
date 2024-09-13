import { QueryModel } from "@/common/Database";
import { knex } from "@/common/Knex";
import { Knex } from "knex";
import { ProductVariantAttributeModel } from "./ProductVariantAttributeModel";
import { IRawProductVariant } from "./ProductVariant";
import { MySQLUtils } from "@/utils";

class ProductVariantModelClass extends QueryModel {
  static tableName: string = 'product_variants';

  protected columns = {
    id: new QueryModel.Column('id'),
    images: new QueryModel.Column('images'),
    price: new QueryModel.Column('price'),
    stock: new QueryModel.Column('stock'),
    skuSuffix: new QueryModel.Column('skuSuffix'),
    productId: new QueryModel.Column('productId'),

    createdAt: new QueryModel.Column('createdAt'),
    updatedAt: new QueryModel.Column('updatedAt'),
    deletedAt: new QueryModel.Column('deletedAt'),
  }

  availableJoinColumns = {
    attributes: knex.raw(`JSON_ARRAYAGG(JSON_OBJECT(${ProductVariantAttributeModel.fields()}))`)
  }

  constructor() {
    super(ProductVariantModelClass.tableName)
  }

  async create(productVariant: Partial<IRawProductVariant> | Partial<IRawProductVariant>[]) {
    const insertData = Array.isArray(productVariant) ? productVariant : [productVariant];

    const [lastId] = await this.knex().insert(insertData);

    return MySQLUtils.returningIds(lastId, insertData.length);
  }
}

const ProductVariantModel = new ProductVariantModelClass()

export { ProductVariantModel }
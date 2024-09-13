import { QueryModel } from "@/common/Database";
import { IRawProductVariantAttribute } from "./ProductVariantAttribute";
import { MySQLUtils } from "@/utils";

class ProductVariantAttributeModelClass extends QueryModel {
  static tableName: string = 'product_variant_attributes';

  protected columns = {
    id: new QueryModel.Column('id'),
    attributeId: new QueryModel.Column('attributeId'),
    attributeValue: new QueryModel.Column('attributeValue'),
    variantId: new QueryModel.Column('variantId'),
    createdAt: new QueryModel.Column('createdAt'),
    updatedAt: new QueryModel.Column('updatedAt'),
    deletedAt: new QueryModel.Column('deletedAt'),
  }

  constructor() {
    super(ProductVariantAttributeModelClass.tableName)
  }

  async create(productVariantAttribute: Partial<IRawProductVariantAttribute> | Partial<IRawProductVariantAttribute>[]) {
    const insertData = Array.isArray(productVariantAttribute) ? productVariantAttribute : [productVariantAttribute];
    const [lastId] = await this.knex().insert(insertData);

    return MySQLUtils.returningIds(lastId, insertData.length);
  }
}

const ProductVariantAttributeModel = new ProductVariantAttributeModelClass()

export { ProductVariantAttributeModel }
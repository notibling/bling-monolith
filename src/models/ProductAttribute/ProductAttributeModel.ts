import { QueryModel } from "@/common/Database";
import { IProductAttribute } from "./ProductAttribute";
import { MySQLUtils } from "@/utils";

class ProductAttributeModelClass extends QueryModel {
  static tableName: string = 'product_attributes';

  protected override columns = {
    id: new QueryModel.Column('id'),
    productId: new QueryModel.Column('productId'),
    attributeId: new QueryModel.Column('attributeId'),
    attributeName: new QueryModel.Column('attributeName'),
    attributeValue: new QueryModel.Column('attributeValue'),
  }

  constructor() {
    super(ProductAttributeModelClass.tableName)
  }

  async create(attribute: Partial<IProductAttribute> | Partial<IProductAttribute>[]) {
    const insertData = Array.isArray(attribute) ? attribute : [attribute];
    const [lastId] = await this.knex().insert(insertData);

    return MySQLUtils.returningIds(lastId, insertData.length);
  }
}

const ProductAttributeModel = new ProductAttributeModelClass();

export { ProductAttributeModel }
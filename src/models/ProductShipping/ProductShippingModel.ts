import { QueryModel } from "@/common/Database";
import { MySQLUtils } from "@/utils";
import { IRawProductShipping } from "./ProductShipping";

class ProductShippingModelClass extends QueryModel {
  static tableName = 'product_shipping';
  protected override columns = {
    id: new QueryModel.Column('id'),
    productId: new QueryModel.Column('productId'),
    value: new QueryModel.Column('value'),
    price: new QueryModel.Column('price'),

    createdAt: new QueryModel.Column('createdAt'),
    updatedAt: new QueryModel.Column('updatedAt'),
    deletedAt: new QueryModel.Column('deletedAt'),
  }


  constructor() {
    super(ProductShippingModelClass.tableName);
  }

  async create(productShipping: Partial<IRawProductShipping> | Partial<IRawProductShipping>[]) {
    const insertData = Array.isArray(productShipping) ? productShipping : [productShipping];
    const [firstId] = await this.knex().insert(insertData).into(ProductShippingModelClass.tableName);

    return MySQLUtils.returningIds(firstId, insertData.length);
  }
  
}

const ProductShippingModel = new ProductShippingModelClass();

export { ProductShippingModel }
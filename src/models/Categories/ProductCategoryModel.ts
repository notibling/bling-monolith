import { QueryModel } from "@/common/Database";
import { IProductCategory } from "./ProductCategory";
import { knex } from "@/common/Knex";

class ProductCategoryModelClass extends QueryModel {
  static tableName: string = 'product_category';
  protected override columns = {
    id: new QueryModel.Column('id'),
    categoryId: new QueryModel.Column('categoryId'),
    productId: new QueryModel.Column('productId'),
  }

  constructor() {
    super(ProductCategoryModelClass.tableName)
  }


  async fetch(nested = false) {
    const query = await this.knex().select(this.columns);

    return query
  }

  create(productCategory: Partial<IProductCategory> | Partial<IProductCategory>[]) {
    return this.knex().insert(productCategory);
  }
}

const ProductCategoryModel = new ProductCategoryModelClass();

export { ProductCategoryModel };
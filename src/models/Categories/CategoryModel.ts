import { QueryModel } from "@/common/Database";
import { ICategory } from "./Category";
import { MySQLUtils, ObjectUtils } from "@/utils";

class CategoryModelClass extends QueryModel {
  static tableName: string = 'categories';
  protected override columns = {
    id: new QueryModel.Column('id'),
    name: new QueryModel.Column('name'),
    description: new QueryModel.Column('description'),
    parentId: new QueryModel.Column('parentId'),
    createdAt: new QueryModel.Column('createdAt'),
    updatedAt: new QueryModel.Column('updatedAt'),
    deletedAt: new QueryModel.Column('deletedAt'),
  }

  constructor() {
    super(CategoryModelClass.tableName)
  }

  async fetch(nested = false) {
    const query: ICategory[] = await this.knex().select(this.columnsForSelect);

    if (nested) return ObjectUtils.nestRecursively<ICategory>('id', 'parentId', query);

    return query;
  }
  
  async create(productCategory: Partial<ICategory> | Partial<ICategory>[]) {
    const insertData = Array.isArray(productCategory) ? productCategory : [productCategory];
    const created = await this.knex().insert(insertData);

    return MySQLUtils.returningIds(created[0], created.length);
  }

  update(id: number, productCategory: Partial<ICategory> | Partial<ICategory>[]) {
    return this.knex().update(productCategory).where('id', id);
  }
}

const CategoryModel = new CategoryModelClass();

export { CategoryModel };
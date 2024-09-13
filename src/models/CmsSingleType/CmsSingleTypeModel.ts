import { QueryModel } from "@/common/Database";
import { QueryWhere } from "@/common/Database/Database.types";
import { CmsSingleType, ICmsSingleType } from "./CmsSingleType";

class CmsSingleTypeModelClass extends QueryModel {
  static tableName: string = 'cms_single_type';

  protected override columns = {
    id: new QueryModel.Column('id'),
    key: new QueryModel.Column('key'),
    value: new QueryModel.Column('value'),

    createdAt: new QueryModel.Column('createdAt'),
    updatedAt: new QueryModel.Column('updatedAt'),
    deletedAt: new QueryModel.Column('deletedAt'),
  };


  constructor() {
    super(CmsSingleTypeModelClass.tableName)
  }

  async fetch<T>(...where: QueryWhere<ICmsSingleType<T>>[]): Promise<CmsSingleType<T>[]> {
    const select = this
      .knex()
      .select({
        ...this.columnsForSelect,
      });

    const whereQuery = new QueryModel.WhereQuery<ICmsSingleType<T>>(select);

    const query = whereQuery.where(...where).run();

    const singleTypes: ICmsSingleType<T>[] = await query;

    return singleTypes.map((_singleType) => new CmsSingleType(_singleType))
  }
}

const CmsSingleTypeModel = new CmsSingleTypeModelClass();
export { CmsSingleTypeModel };
import { QueryModel } from "@/common/Database";
import { FileType, IFile } from "./File";
import { QueryWhere } from "@/common/Database/Database.types";

class FileModelClass extends QueryModel {
  static tableName: string = 'files';

  protected override columns = {
    id: new QueryModel.Column('id'),
    path: new QueryModel.Column('path'),
    mimeType: new QueryModel.Column('mimeType'),
    status: new QueryModel.Column('status'),

    createdAt: new QueryModel.Column('createdAt'),
    updatedAt: new QueryModel.Column('updatedAt'),
    deletedAt: new QueryModel.Column('deletedAt'),
  }

  constructor() {
    super(FileModelClass.tableName)
  }

  create(file: Partial<IFile> | Partial<IFile>[]) {
    return this.knex().insert(file);
  }

  async fetch(...where: QueryWhere<IFile>[]): Promise<FileType[]> {
    const select = this.knex().select({ ...this.columnsForSelect });
    const whereQuery = new QueryModel.WhereQuery<IFile>(select);

    const query = whereQuery.where(...where).run();

    const files: IFile[] = await query;

    return files.map((_file) => new FileType(_file))
  }

  async fetchById(ids: IFile['id'][]): Promise<FileType[]> {
    const select = this.knex().select({ ...this.columnsForSelect });

    const files: IFile[] = await select.whereIn('id', ids);

    return files.map((_file) => new FileType(_file))
  }

  delete(fileId: IFile['id']) {
    return this.knex().delete().where('id', '=', fileId);
  }
}

const FileModel = new FileModelClass();
export { FileModel };
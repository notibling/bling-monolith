import { PlainObject } from "@/common/PlainObject";

interface IFile {
  id: number;
  path: string;
  mimeType: string;
  status: 'active' | 'inactive';
  ownerId: number;

  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}

interface IFileToEntity {
  id: number;
  fileId: number;
  entityId: number;
  entity: 'product' | 'product_variant';
  userId: number;

  file: IFile;

  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}

class FileType implements IFile {
  public id: number;
  public path: string;
  public mimeType: string;
  public status: 'active' | 'inactive';
  public ownerId: number;

  public createdAt: Date;
  public updatedAt: Date | null;
  public deletedAt: Date | null;

  constructor(user: PlainObject<FileType> | IFile) {
    this.id = user.id;
    this.path = user.path;
    this.mimeType = user.mimeType;
    this.status = user.status;
    this.ownerId = user.ownerId;

    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.deletedAt = user.deletedAt;
  }


  toJSON(): Omit<PlainObject<FileType>, 'password'> {
    return {
      id: this.id,
      path: this.path,
      mimeType: this.mimeType,
      status: this.status,
      ownerId: this.ownerId,

      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    }
  }
}


export { FileType, IFile, IFileToEntity };
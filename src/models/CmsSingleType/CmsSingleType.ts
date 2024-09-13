interface ICmsSingleType<T> {
  id: number;
  key: string;
  value: T;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}



class CmsSingleType<T> {
  id: number;
  key: string;
  value: T;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;


  constructor({ id, key, value, createdAt, updatedAt, deletedAt }: ICmsSingleType<T>) {
    this.id = id;
    this.key = key;
    this.value = value;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  toJSON() {
    return {
      id: this.id,
      key: this.key,
      value: this.value,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt
    };
  }
}


export { CmsSingleType, type ICmsSingleType }
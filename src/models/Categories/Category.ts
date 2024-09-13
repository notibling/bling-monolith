interface ICategory {
  id: number;
  name: string;
  description: string;
  parentId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}


class Category {
  public id: number;
  public name: string;
  public description: string;
  public parentId: number;
  public createdAt: string;
  public updatedAt: string;
  public deletedAt: string | null;


  constructor(category: ICategory) {
    this.id = category.id;
    this.name = category.name;
    this.description = category.description;
    this.parentId = category.parentId;
    this.createdAt = category.createdAt;
    this.updatedAt = category.updatedAt;
    this.deletedAt = category.deletedAt;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      parentId: this.parentId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt
    }
  }
}


export { Category, type ICategory };
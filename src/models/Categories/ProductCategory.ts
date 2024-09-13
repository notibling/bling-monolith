interface IProductCategory {
  id: number;
  categoryId: number;
  productId: number;
}


class ProductCategory {
  public id: number;
  public categoryId: number;
  public productId: number;

  constructor(productCategory: IProductCategory) {
    this.id = productCategory.id;
    this.categoryId = productCategory.categoryId;
    this.productId = productCategory.productId;
  }


  toJSON() {
    return {
      id: this.id,
      categoryId: this.categoryId,
      productId: this.productId
    }
  }
}

export { ProductCategory, type IProductCategory }
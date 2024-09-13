interface IRawProductShipping {
  id: number;
  productId: number;
  value: string;
  price: number;

  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}


class ProductShipping {
  public id: number;
  public productId: number;
  public value: string;
  public price: number;

  public createdAt: string;
  public updatedAt: string;
  public deletedAt: string;

  constructor(productShipping: IRawProductShipping) {
    this.id = productShipping.id;
    this.productId = productShipping.productId;
    this.value = productShipping.value;
    this.price = productShipping.price;
    this.createdAt = productShipping.createdAt;
    this.updatedAt = productShipping.updatedAt;
    this.deletedAt = productShipping.deletedAt;
  }

  toJSON() {
    return {
      id: this.id,
      productId: this.productId,
      value: this.value,
      price: this.price,

      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt
    }
  }
}

export { ProductShipping, type IRawProductShipping }
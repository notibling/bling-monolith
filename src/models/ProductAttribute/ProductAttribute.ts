interface IProductAttribute {
  id: number;
  productId: number;
  attributeId: number | null;
  attributeName: string;
  attributeValue: string;
}



class ProductAttribute implements IProductAttribute {
  public id: number;
  public productId: number;
  public attributeId: number | null;
  public attributeName: string;
  public attributeValue: string;

  constructor(productAttribute: IProductAttribute) {
    this.id = productAttribute.id;
    this.productId = productAttribute.productId;
    this.attributeId = productAttribute.attributeId;
    this.attributeName = productAttribute.attributeName;
    this.attributeValue = productAttribute.attributeValue;
  }


  toJSON() {
    return {
      id: this.id,
      productId: this.productId,
      attributeId: this.attributeId,
      attributeName: this.attributeName,
      attributeValue: this.attributeValue,
    }
  }
}


export { ProductAttribute, type IProductAttribute };


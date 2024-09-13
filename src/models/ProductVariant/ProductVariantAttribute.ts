import { Attribute, IRawAttribute } from "../Attribute";

interface IRawProductVariantAttribute {
  id: number;
  attributeId: number;
  attributeValue: string;
  variantId: number;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;

  attribute?: IRawAttribute;
}

class ProductVariantAttribute {
  public id: number;
  public attributeId: number;
  public attributeValue: string;
  public variantId: number;

  public attribute: Attribute | null = null;

  public createdAt: Date;
  public updatedAt: Date | null;
  public deletedAt: Date | null;


  constructor(variantAttribute: IRawProductVariantAttribute) {
    this.id = variantAttribute.id;
    this.attributeId = variantAttribute.attributeId;
    this.attributeValue = variantAttribute.attributeValue;
    this.variantId = variantAttribute.variantId;

    this.attribute = variantAttribute.attribute ?
      new Attribute(variantAttribute.attribute) : null;

    this.createdAt = variantAttribute.createdAt;
    this.updatedAt = variantAttribute.updatedAt;
    this.deletedAt = variantAttribute.deletedAt;
  }

  toJSON() {
    return {
      id: this.id,
      attributeId: this.attributeId,
      attributeValue: this.attributeValue,
      variantId: this.variantId,
      attribute: this.attribute,

      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt
    }
  }
}

export { ProductVariantAttribute, IRawProductVariantAttribute }
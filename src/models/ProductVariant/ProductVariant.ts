import { IRawProductVariantAttribute, ProductVariantAttribute } from "./ProductVariantAttribute";

interface IRawProductVariant {
  id: number;
  images: number[];
  price: number;
  stock: number;
  skuSuffix: string;
  productId: number;
  main: boolean;
  // * Join
  variantAttributes: IRawProductVariantAttribute[] | null;

  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

class ProductVariant {
  public id: number;
  public images: number[];
  public price: number;
  public stock: number;
  public productId: number;
  public skuSuffix: string;
  public variantAttributes: ProductVariantAttribute[] | null = null;

  public createdAt: Date;
  public updatedAt: Date | null;
  public deletedAt: Date | null;

  constructor(variant: IRawProductVariant) {
    this.id = variant.id;
    this.images = variant.images;
    this.price = variant.price;
    this.stock = variant.stock;
    this.productId = variant.productId;
    this.skuSuffix = variant.skuSuffix
    this.variantAttributes = variant.variantAttributes ?
      variant.variantAttributes
        .map((variantAttribute: IRawProductVariantAttribute) =>
          new ProductVariantAttribute(variantAttribute))
      : null;

    this.createdAt = new Date(variant.createdAt);
    this.updatedAt = variant.updatedAt ? new Date(variant.updatedAt) : null;
    this.deletedAt = variant.deletedAt ? new Date(variant.deletedAt) : null;

  }

  toJSON() {
    return {
      id: this.id,
      images: this.images,
      price: this.price,
      stock: this.stock,
      productId: this.productId,
      variantAttributes: this.variantAttributes ? this.variantAttributes.map((vA) => vA.toJSON()) : null,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    }
  }
}

export { ProductVariant, IRawProductVariant }
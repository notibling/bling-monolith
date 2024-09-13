import { IRawProductShipping, ProductShipping } from "../ProductShipping";
import { IRawProductVariant, ProductVariant } from "../ProductVariant/";


interface IRawProduct {
  id: number;
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  price: number;
  sku: string;
  upc: string;
  hasShipping: boolean;
  shippingCost: number | null;
  pickupLocation: string;
  legalAge: boolean;
  hasRefund: boolean;
  refundCost: number;
  images: number[];
  userId: number;
  variants: IRawProductVariant[] | null;
  shipping: IRawProductShipping[] | null;
  sellingZone: string[];
  paymentMethods: string[];
  condition: 'new' | 'used' | 'refurbished';
}


class Product {
  public id: number;
  public title: string;
  public description: string;
  public shortDescription: string;
  public category: string;
  public price: number;
  public sku: string;
  public upc: string;
  public hasShipping: boolean;
  public shippingCost: number | null;
  public pickupLocation: string;
  public legalAge: boolean;
  public hasRefund: boolean;
  public refundCost: number;
  public images: number[];
  public userId: number;
  public sellingZone: string[];
  public paymentMethods: string[];
  public condition: 'new' | 'used' | 'refurbished' = 'new';
  public variants: ProductVariant[] | null = null;
  public shipping: ProductShipping[] | null = null;

  constructor(product: IRawProduct) {
    this.id = product.id;
    this.title = product.title;
    this.description = product.description;
    this.shortDescription = product.shortDescription;
    this.category = product.category;
    this.price = product.price;
    this.sku = product.sku;
    this.upc = product.upc;
    this.hasShipping = product.hasShipping;
    this.shippingCost = product.shippingCost;
    this.pickupLocation = product.pickupLocation;
    this.legalAge = product.legalAge;
    this.hasRefund = product.hasRefund;
    this.refundCost = product.refundCost;
    this.images = product.images;
    this.userId = product.userId;
    this.condition = product.condition;
    this.sellingZone = product.sellingZone;
    this.paymentMethods = product.paymentMethods;
    this.variants =
      product.variants ? product.variants.map((rawProductVariant) => new ProductVariant(rawProductVariant)) : null;

    this.shipping = product.shipping ?
      product.shipping.map((rawProductShipping) => new ProductShipping(rawProductShipping))
      : null;

  }


  setVariants(variants: ProductVariant[]) {
    this.variants = variants;
    return this;
  }


  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      shortDescription: this.shortDescription,
      category: this.category,
      price: this.price,
      sku: this.sku,
      upc: this.upc,
      hasShipping: this.hasShipping,
      shippingCost: this.shippingCost,
      pickupLocation: this.pickupLocation,
      legalAge: this.legalAge,
      hasRefund: this.hasRefund,
      refundCost: this.refundCost,
      images: this.images,
      userId: this.userId,
      condition: this.condition,
      sellingZone: this.sellingZone,
      paymentMethods: this.paymentMethods,
      variants: this.variants ?
        this.variants.map((productVariant) => productVariant.toJSON()) : null,

      shipping: this.shipping ?
        this.shipping.map((productShipping) => productShipping.toJSON()) : null
    }
  }
}


export { Product, IRawProduct };
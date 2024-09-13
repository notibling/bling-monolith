import { IRawProduct, Product } from "../Product/Product";
import { IService } from "../Service/Service";
import { IVehicle } from "../Vehicle/Vehicle";

interface IRawProductDisplay {
  id: number;
  productId: number;
  displayOwner: number;
  revenuePercentage: number;

  expirationDate: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  entity: 'product' | 'service' | 'vehicle';
  product?: IRawProduct;
  service?: IService;
  vehicle?: IVehicle;
}


class ProductDisplay {

  public id: number;
  public productId: number;
  public displayOwner: number;
  public revenuePercentage: number;

  public expirationDate: string | null;
  public createdAt: string;
  public updatedAt: string;
  public deletedAt: string;

  public product: Product | null = null;


  constructor(productDisplay: IRawProductDisplay) {
    this.id = productDisplay.id;
    this.productId = productDisplay.productId;
    this.displayOwner = productDisplay.displayOwner;
    this.revenuePercentage = productDisplay.revenuePercentage;
    this.expirationDate = productDisplay.expirationDate;

    if (productDisplay.product) {
      this.product = new Product(productDisplay.product);
    }

    this.createdAt = productDisplay.createdAt;
    this.updatedAt = productDisplay.updatedAt;
    this.deletedAt = productDisplay.deletedAt;
  }


  toJSON() {
    return {
      id: this.id,
      productId: this.productId,
      displayOwner: this.displayOwner,
      revenuePercentage: this.revenuePercentage,
      expirationDate: this.expirationDate,

      product: this.product?.toJSON() ?? null,

      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt
    }
  }
}


export { ProductDisplay, type IRawProductDisplay };
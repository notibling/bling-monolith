import { PlainObject } from "@/common/PlainObject";

interface IUserShipping {
  id: number;
  userId: number;
  country: string;
  province: string;
  description: string;
  city: string;
  postalCode: string;
  street1: string;
  street2: string;
  streetCorner: string;
  solar: string;
  doorNumber: string;
  apartmentNumber: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

class UserShipping implements IUserShipping {
  public id: number;
  public userId: number;
  public country: string;
  public province: string;
  public description: string;
  public city: string;
  public postalCode: string;
  public street1: string;
  public street2: string;
  public streetCorner: string;
  public solar: string;
  public doorNumber: string;
  public apartmentNumber: string;
  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt: Date;

  constructor(userShipping: PlainObject<UserShipping> | IUserShipping) {
    this.id = userShipping?.id;
    this.userId = userShipping?.userId;
    this.country = userShipping?.country;
    this.province = userShipping?.province;
    this.description = userShipping?.description;
    this.city = userShipping?.city;
    this.postalCode = userShipping?.postalCode;
    this.street1 = userShipping?.street1;
    this.street2 = userShipping?.street2;
    this.streetCorner = userShipping?.streetCorner;
    this.solar = userShipping?.solar;
    this.doorNumber = userShipping?.doorNumber;
    this.apartmentNumber = userShipping?.apartmentNumber;
    this.createdAt = userShipping?.createdAt;
    this.updatedAt = userShipping?.updatedAt;
    this.deletedAt = userShipping?.deletedAt;
  }


  toJSON(): PlainObject<UserShipping> {
    return {
      id: this.id,
      userId: this.userId,
      country: this.country,
      province: this.province,
      description: this.description,
      city: this.city,
      postalCode: this.postalCode,
      street1: this.street1,
      street2: this.street2,
      streetCorner: this.streetCorner,
      solar: this.solar,
      doorNumber: this.doorNumber,
      apartmentNumber: this.apartmentNumber,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    }
  }
}

export { IUserShipping, UserShipping };
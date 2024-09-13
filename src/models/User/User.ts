import { PlainObject } from "@/common/PlainObject";


type Sex = 'male' | 'female' | null;
type UserType = 'client' | 'business' | 'admin' | null;

interface IUser {
  id: number;
  firstName: string;
  lastName: string | null;
  email: string;
  password: string;

  type: UserType;
  sex: Sex;
  birth: Date | null;
  country: string | null;
  residenceCountry: string | null;
  legalIdentification: string | null;
  profileImage: string | null;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}

class User implements IUser {
  public id: number;
  public firstName: string;
  public lastName: string | null;
  public email: string;
  public password: string;

  public type: UserType;
  public sex: Sex;
  public birth: Date | null;
  public country: string | null;
  public residenceCountry: string | null;
  public legalIdentification: string | null;
  public profileImage: string | null;
  public createdAt: Date;
  public updatedAt: Date | null;
  public deletedAt: Date | null;

  constructor(user: PlainObject<User> | IUser) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.password = user.password;
    this.type = user.type;

    this.sex = user.sex;
    this.birth = user.birth;
    this.country = user.country;
    this.residenceCountry = user.residenceCountry;
    this.legalIdentification = user.legalIdentification;
    this.profileImage = user.profileImage;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.deletedAt = user.deletedAt;
  }


  toJSON(): Omit<PlainObject<User>, 'password'> {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      type: this.type,

      sex: this.sex,
      birth: this.birth,
      country: this.country,
      residenceCountry: this.residenceCountry,
      legalIdentification: this.legalIdentification,
      profileImage: this.profileImage,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    }
  }
}


export { User, IUser };
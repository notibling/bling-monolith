import { QueryModel } from "@/common/Database";
import { QueryWhere } from "@/common/Database/Database.types";
import { IUserShipping, UserShipping } from "./UserShipping";

class UserShippingModelClass extends QueryModel {
  static tableName: string = 'user_shipping';

  protected override columns = {
    id: new QueryModel.Column('id'),
    userId: new QueryModel.Column('userId'),
    country: new QueryModel.Column('country'),
    province: new QueryModel.Column('province'),
    description: new QueryModel.Column('description'),
    city: new QueryModel.Column('city'),
    postalCode: new QueryModel.Column('postalCode'),
    street1: new QueryModel.Column('street1'),
    street2: new QueryModel.Column('street2'),
    streetCorner: new QueryModel.Column('streetCorner'),
    solar: new QueryModel.Column('solar'),
    doorNumber: new QueryModel.Column('doorNumber'),
    apartmentNumber: new QueryModel.Column('apartmentNumber'),
    createdAt: new QueryModel.Column('createdAt'),
    updatedAt: new QueryModel.Column('updatedAt'),
    deletedAt: new QueryModel.Column('deletedAt'),
  }

  constructor() {
    super(UserShippingModelClass.tableName)
  }

  async findUserBy(...where: QueryWhere<keyof IUserShipping>[]): Promise<UserShipping | undefined> {
    const select = this.knex().select({ ...this.columnsForSelect });
    const whereQuery = new QueryModel.WhereQuery<IUserShipping>(select);

    const query = whereQuery.where(...where).run();

    const userShipping: IUserShipping = await query.first();
    if (userShipping) return new UserShipping(userShipping)

    return;
  }

  async fetch(...where: QueryWhere<keyof IUserShipping>[]): Promise<UserShipping[]> {
    const select = this.knex().select({ ...this.columnsForSelect });
    const whereQuery = new QueryModel.WhereQuery<IUserShipping>(select);

    const query = whereQuery.where(...where).run();

    const userShipping: IUserShipping[] = await query;

    return userShipping.map((_userShipping) => new UserShipping(_userShipping))
  }


  create(userShipping: Partial<IUserShipping> | Partial<IUserShipping>[]) {
    return this.knex().insert(userShipping);
  }

  update(userId: IUserShipping['id'], userShipping: Partial<IUserShipping>) {
    return this.knex().update(userShipping, '*').where('id', '=', userId);
  }

  delete(...where: QueryWhere<keyof IUserShipping>[]) {
    const deleteQuery = new QueryModel.WhereQuery<IUserShipping>(this.knex().delete());
    return deleteQuery.where(...where).run();

  }
}

const UserShippingModel = new UserShippingModelClass();
export { UserShippingModel };
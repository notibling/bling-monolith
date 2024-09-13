import { QueryModel } from "@/common/Database";
import { QueryWhere } from "@/common/Database/Database.types";
import { IUser, User } from "./User";

class UserModelClass extends QueryModel {
  static tableName: string = 'users';

  protected override columns = {
    id: new QueryModel.Column('id'),
    firstName: new QueryModel.Column('firstName'),
    lastName: new QueryModel.Column('lastName'),
    email: new QueryModel.Column('email'),
    password: new QueryModel.Column('password'),
    type: new QueryModel.Column('type'),

    sex: new QueryModel.Column('sex'),
    birth: new QueryModel.Column('birth'),
    country: new QueryModel.Column('country'),
    residenceCountry: new QueryModel.Column('residenceCountry'),
    legalIdentification: new QueryModel.Column('legalIdentification'),
    profileImage: new QueryModel.Column('profileImage'),
    createdAt: new QueryModel.Column('createdAt'),
    updatedAt: new QueryModel.Column('updatedAt'),
    deletedAt: new QueryModel.Column('deletedAt'),
  }

  constructor() {
    super(UserModelClass.tableName)
  }

  async findUserBy(...where: QueryWhere<IUser>[]): Promise<User | undefined> {
    const query = this.knex().select({ ...this.columnsForSelect });

    const whereQuery = new QueryModel.WhereQuery<IUser>(query,);
    ;
    const user: IUser = await whereQuery.where(...where).run().first();
    if (user) return new User(user)

    return;
  }

  create(user: Partial<IUser> | Partial<IUser>[]) {
    return this.knex().insert(user);
  }

  update(userId: IUser['id'], user: Partial<IUser>) {
    return this.knex().update(user, '*').where('id', '=', userId);
  }
}

const UserModel = new UserModelClass();
export { UserModel };
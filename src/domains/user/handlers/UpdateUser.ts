import { IUser, UserModel } from "@/models/User";
import { HandlerDef } from '@/common/HttpHandler';
import { IUserShipping, UserShipping } from "@/models/UserShipping";
import { UserShippingModel } from "@/models/UserShipping/UserShippingModel";

interface IUpdateUserPayload {
  user?: Partial<IUser>;
  userShipping: Partial<IUserShipping>[];
}


const UpdateUserHandler: HandlerDef = async (req, res) => {
  try {
    const {
      user: _userFields,
      userShipping = []
    } = req.body as IUpdateUserPayload;
    const user = req.user;
    let resultUser, resultUserShipping;

    if (Object.keys(_userFields ?? {}).length > 0)
      resultUser = await UserModel.update(user.id, {
        ...(_userFields ?? {}),
      });



    if (userShipping && userShipping.length > 0) {
      await UserShippingModel.delete(['userId', '=', user.id]);

      resultUserShipping =
        await UserShippingModel.create(userShipping?.map((shipping) =>
          ({ ...shipping, userId: user.id })
        ));

    }
    return res.status(200).json({
      success: true,
      user: resultUser,
      userShipping: resultUserShipping
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "An error has ocurred"
    })

  }
};

export default UpdateUserHandler;
import { UserModel } from "@/models/User";
import { HandlerDef } from '@/common/HttpHandler';
import { UserShippingModel } from "@/models/UserShipping/UserShippingModel";

const GetCurrentUserHandler: HandlerDef = async (req, res) => {
  try {
    const user = await UserModel.findUserBy(['id', '=', req.user.id]);
    const userShipping = await UserShippingModel.fetch(['userId', '=', req.user.id]);

    if (!user) return res.status(400).json({ success: false, message: "The user not exist anymore" });

    return res.status(200).json({
      success: true,
      user: user.toJSON(),
      userShipping: userShipping.map((userShipping) => userShipping.toJSON())
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "An error has ocurred"
    })

  }
};

export default GetCurrentUserHandler;
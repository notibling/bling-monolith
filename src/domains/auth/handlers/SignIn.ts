import bcrypt from 'bcryptjs';

import { UserModel } from "@/models/User";
import { JWT } from '@/common/JWT';
import { HandlerDef } from '@/common/HttpHandler';
import { typeCast } from '@/common/typeCast';
import { ErrorHandler, ErrorMessages } from '@/common/Error';

const SignInHandler: HandlerDef = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await UserModel.findUserBy(['email', '=', email]);

    if (!user) return res.status(401).json({ success: false })

    const isAuthenticated = bcrypt.compareSync(password, user.password);

    if (!isAuthenticated) return res.status(200).json({ success: false })

    const serializedUser = user.toJSON();
    const token = JWT.generate({ user: serializedUser });

    return res.status(200).json({
      success: true,
      token,
      user,
    })
  } catch (error) {
    await ErrorHandler.getInstance()
      .throw(ErrorMessages.GENERIC('SignIn', JSON.stringify(error)));
    return res.status(500).json({
      success: false, message: "An error has ocurred"
    })
  }
}

export default typeCast(SignInHandler)
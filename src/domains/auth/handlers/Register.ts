import bcrypt from 'bcryptjs';
import { UserModel } from "@/models/User";
import { JWT } from '@/common/JWT';
import { HandlerDef } from '@/common/HttpHandler';
import { typeCast } from '@/common/typeCast';
import { ErrorHandler, ErrorMessages } from '@/common/Error';

const RegisterHandler: HandlerDef = async (req, res) => {
  try {
    const { email, password, name } = req.body


    if (!password || !email || !name) return res.status(400).json({ success: false })

    const userAlreadyExist = await UserModel.findUserBy(['email', '=', email]);
    console.log({ userAlreadyExist });
    if (userAlreadyExist) return res.status(400).json({ success: false })

    const hash = bcrypt.hashSync(password, 10);

    const [userId] = await UserModel.create({
      email,
      password: hash,
      firstName: name,
    });

    if (!userId) return res.status(400).json({ success: false })

    const user = await UserModel.findUserBy(['id', '=', userId]);

    if (!user) return res.status(400).json({ success: false })

    const serializedUser = user.toJSON();
    const token = JWT.generate({ user: serializedUser });

    return res.status(200).json({
      success: true,
      token,
      user
    })
  } catch (error) {
    await ErrorHandler.getInstance().throw(ErrorMessages.GENERIC('Register', JSON.stringify(error)));
    return res.status(500).json({
      success: false, message: "An error has ocurred"
    })
  }
}

export default typeCast(RegisterHandler);
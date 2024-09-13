import { HandlerDef } from "@/common/HttpHandler";

import { JWT } from "@/common/JWT";
import { IUser } from "@/models/User";

const AuthMiddlewareByRole: (type?: IUser['type'][]) => HandlerDef =
  (type) => async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json(unauthorized());
    const accessToken = authorization.replace(/Bearer /i, '');

    const decoded = JWT.verify(accessToken);

    if (!decoded) return res.status(401).json(unauthorized());


    if (type && !type.includes(decoded.user.type))
      return res.status(401).json(unauthorized());

    req.user = decoded.user;
    req.accessToken = accessToken;

    next();
  }

function unauthorized() {
  return { success: false, message: 'You don\'t have access to the requested resource' };
}

export { AuthMiddlewareByRole };
export default AuthMiddlewareByRole();
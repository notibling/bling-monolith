import { Response, NextFunction } from "express";

import { User } from "@/models/User";
import { PlainObject } from "./PlainObject";

interface CustomRequest extends Request {
  user: Omit<PlainObject<User>, 'password'>;
  accessToken: string;
}


type HandlerDef = (request: Express.Request, response: Response, next: NextFunction) => void | Promise<Record<string, any> | void>;

export { HandlerDef }
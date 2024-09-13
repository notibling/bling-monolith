import { Request as ExpressRequest } from 'express';
import { PlainObject } from "@/common/PlainObject";
import { User } from "@/models/User";

declare global {
  namespace Express {
    export interface Request extends Omit<ExpressRequest, 'user' | 'accessToken'> {
      user: Omit<PlainObject<User>, 'password'>;
      accessToken: string;
    }
  }
}
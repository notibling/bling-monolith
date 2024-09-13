import jsonwebtoken from 'jsonwebtoken';
import { Environment } from './Environment';
import { User } from '@/models/User';
import { PlainObject } from './PlainObject';

const SECRET = Environment.getStagedEnv('JWT_SECRET') ?? '';


interface JwtPayload extends jsonwebtoken.JwtPayload {
  user: Omit<PlainObject<User>, 'password'>;
}
class JWT {
  static generate(payload: { user: Omit<PlainObject<User>, 'password'> }): string {
    return jsonwebtoken.sign(payload, SECRET, { expiresIn: '7 days' })
  }

  static verify(token: string): JwtPayload | undefined {
    try {
      const data: any = jsonwebtoken.verify(token, SECRET);
      return { ...data, user: new User(data?.user ?? {}) }
    } catch (error) {
      console.log('JWT::verify DATA=', { token });
      console.log('JWT::verify ERROR=', error);
      return;
    }
  }
}

export { JWT }
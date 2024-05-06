import * as jwt from 'jsonwebtoken';

export function decode(token: string, secret: string): any {
  return jwt.verify(token, secret);
}
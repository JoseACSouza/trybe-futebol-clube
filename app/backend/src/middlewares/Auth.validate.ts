import jwt = require('jsonwebtoken');
import { Request, Response, NextFunction } from 'express';
import { UserPayload } from '../types/UserPayload';

const secret = process.env.JWT_SECRET || 'secret';

const extractToken = (bearerToken:string) => bearerToken.split(' ');

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const bearerToken = req.header('authorization');

  if (!bearerToken) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const verifyBearer = extractToken(bearerToken);
  console.log(verifyBearer);
  const token = verifyBearer[0] === 'Bearer' ? verifyBearer[1] : verifyBearer[0];
  console.log(token);

  try {
    const decoded = jwt.verify(token, secret) as UserPayload;
    console.log(decoded, '2');
    req.body.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};
export default auth;

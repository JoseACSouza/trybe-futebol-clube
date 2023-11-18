import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export default (payload: object): string => {
  const token = jwt.sign(payload, JWT_SECRET);
  return token;
};

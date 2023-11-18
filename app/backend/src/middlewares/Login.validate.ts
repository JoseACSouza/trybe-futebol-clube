import { Request, Response, NextFunction } from 'express';
import { compare } from 'bcryptjs';
import LoginService from '../services/LoginService';

export const verifyFields = (req :Request, res:Response, next:NextFunction) => {
  if (!req.body || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  next();
};

const validateInfo = async (email:string, password:string) => {
  const service = new LoginService();
  const user = await service.getEmail(email);
  if (user) {
    const checkPassword = await compare(password, user.password);
    return checkPassword;
  }
  return false;
};

export const validateFields = async (req :Request, res:Response, next:NextFunction) => {
  const { email, password } = req.body;
  const validEmail = /^[\w.+]+@\w+.\w{2,}(?:.\w{2})?$/gim;
  const infoDataBase: boolean = await validateInfo(email, password);

  if (!validEmail.test(email) || password.length < 6 || !infoDataBase) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  next();
};

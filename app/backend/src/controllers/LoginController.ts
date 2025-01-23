import { Response, Request } from 'express';
import LoginService from '../services/LoginService';
import jwt from '../utils/jwt';

export default class LoginController {
  public service: LoginService;

  constructor() {
    this.service = new LoginService();
  }

  public login = async (req:Request, res: Response) => {
    const { email } = req.body;
    try {
      const user = await this.service.getEmail(email);
      const token = await jwt({ username: user?.username, role: user?.role, email: user?.email });
      return res.status(200).json({ token });
    } catch (error) {
      console.log(error);
    }
  };

  public showRole = async (req:Request, res: Response) => {
    const { user } = req.body;
    try {
      return res.status(200).json({ role: user.role });
    } catch (error) {
      console.log(error);
    }
  };
}

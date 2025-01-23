import ILogin from '../Interfaces/Login';
import User from '../database/models/UserModel';

class LoginService {
  public getEmail = async (email: string): Promise<ILogin | null> =>
    User.findOne({ where: { email } });
}

export default LoginService;

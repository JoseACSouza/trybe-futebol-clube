import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import { verifyFields, validateFields } from '../middlewares/Login.validate';
import auth from '../middlewares/Auth.validate';

const loginController = new LoginController();
const loginRouter = Router();

loginRouter.post('/', verifyFields, validateFields, (req, res) => loginController.login(req, res));
loginRouter.get('/role', auth, (req, res) => loginController.showRole(req, res));

export default loginRouter;

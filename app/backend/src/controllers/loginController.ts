import { Request, Response } from 'express';
import { ILogin } from '../interfaces/ILogin';
import LoginService from '../services/LoginService';

class LoginController {
  constructor(private loginService: LoginService) {}

  public login = async (req: Request, res: Response) => {
    const userData = req.body as ILogin;
    const { code, data } = await this.loginService.login(userData);

    return res.status(code).json({ token: data });
  };

  public loginValidate = async (req: Request, res: Response) => {
    const { user } = req.body;
    const { code, data } = await this.loginService.getRoleUser(user);

    return res.status(code).json({ role: data });
  };
}

export default LoginController;

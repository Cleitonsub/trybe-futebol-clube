import * as bcrypt from 'bcryptjs';
import { ILogin } from '../interfaces/ILogin';
import UserModel from '../database/models/UserModel';
import { createToken } from '../helpers/token';
import { IResponse } from '../interfaces/IResponse';
import { Err } from '../middlewares/errorMiddleware';

const wrongEmailOurPass = 'Incorrect email or password';

class LoginService {
  constructor(private userModel: typeof UserModel) {}

  public async login(userData: ILogin): Promise<IResponse> {
    const { email, password } = userData;

    const user = await this.userModel.findOne({ where: { email } });
    if (user?.email !== email) throw new Err(401, wrongEmailOurPass);

    const valPassword = await bcrypt.compare(password, user.password);
    if (!valPassword) throw new Err(401, wrongEmailOurPass);

    const { token } = createToken(email);

    return { code: 200, data: token };
  }

  public async getRoleUser(email: string): Promise<IResponse> {
    const user = await this.userModel.findOne({ where: { email } });
    if (!user) throw new Err(401, wrongEmailOurPass);

    return { code: 200, data: user.role };
  }
}

export default LoginService;

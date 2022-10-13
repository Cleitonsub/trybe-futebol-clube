import * as express from 'express';
import LoginService from '../services/LoginService';
import UserModel from '../database/models/UserModel';
import LoginController from '../controllers/loginController';
import validateLoginData from '../middlewares/validateLoginData';
import tokenValidate from '../middlewares/tokenValidate';

const router = express.Router();

const loginService = new LoginService(UserModel);
const loginController = new LoginController(loginService);
const { login, loginValidate } = loginController;

router.get('/validate', tokenValidate, loginValidate);
router.post('/', validateLoginData, login);

export default router;

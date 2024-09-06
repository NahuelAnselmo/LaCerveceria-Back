import HttpCodes from 'http-status-codes';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

import UserModel from '../../../models/userSchema.js';
import { internalError } from '../../../helpers/helpers.js';

export class PostController {
  static async postLogin(req, res) {
    const { email, password } = req.body;

    try {
      const user = await UserModel.findOne({ email, isActive: true });
      if (!user || !bcryptjs.compareSync(password, user.password)) {
        return res.status(HttpCodes.UNAUTHORIZED).json({
          data: null,
          message: 'Email o contraseña incorrectos',
        });
      }

      const userInfo = {
        id: user._id,
        name: user.name,
        dni: user.dni,
        email: user.email,
        isAdmin: user.isAdmin,
      };

      const token = jwt.sign({ user: userInfo }, process.env.SECRET_KEY, {
        expiresIn: '1h',
      });

      return res.status(HttpCodes.OK).json({
        data: { token, user: userInfo },
        message: 'Sesión iniciada correctamente',
      });
    } catch (error) {
      return internalError(res, error, 'Ocurrió un error al iniciar sesión');
    }
  }

  static async register(req, res) {
    const { name, dni, email, password } = req.body;

    try {
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(HttpCodes.BAD_REQUEST).json({
          data: null,
          message: 'El email ya está registrado',
        });
      }

      const hashedPassword = bcryptjs.hashSync(password, 10);

      const newUser = new UserModel({
        name,
        dni,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      return res.status(HttpCodes.CREATED).json({
        data: newUser,
        message: 'Usuario registrado con éxito',
      });
    } catch (error) {
      return internalError(
        res,
        error,
        'Ocurrió un error al registrar el usuario',
      );
    }
  }

  static async changePassword(req, res) {
    const { email, newPassword } = req.body;

    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(HttpCodes.NOT_FOUND).json({
          data: null,
          message: 'Usuario no encontrado',
        });
      }

      const hashedPassword = bcryptjs.hashSync(newPassword, 10);
      user.password = hashedPassword;

      await user.save();

      return res.status(HttpCodes.OK).json({
        data: null,
        message: 'Contraseña cambiada con éxito',
      });
    } catch (error) {
      return internalError(
        res,
        error,
        'Ocurrió un error al cambiar la contraseña',
      );
    }
  }
}

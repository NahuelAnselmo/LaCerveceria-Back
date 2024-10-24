/* eslint-disable prettier/prettier */
import HttpCodes from 'http-status-codes';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';


import UserModel from '../../../models/userSchema.js';
import { internalError } from '../../../helpers/helpers.js';
import { post_userValidationSchema } from '../../../helpers/validationSchemas/usersValidationSchema.js';


export class PostController {
  // Login de usuario
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
        username: user.username,
        dni: user.dni,
        email: user.email,
        isAdmin: user.isAdmin,
      };

      const token = jwt.sign({ user: userInfo }, process.env.SECRET_KEY, {
        expiresIn: '1h',
      });
      
      console.log("Token generado:", token); // Agrega esto para verificar
      
      return res.status(HttpCodes.OK).json({
        data: { token, user: userInfo },
        message: 'Sesión iniciada correctamente',
      });
      
    } catch (error) {
      return internalError(res, error, 'Ocurrió un error al iniciar sesión');
    }
  }

  static async register(req, res) {
    try {
      console.log('➡️ Solicitud de registro recibida:', req.body);
  
      // Validar los datos de la solicitud con el esquema correcto
      const { error } = post_userValidationSchema.validate(req.body, { abortEarly: false });
      if (error) {
        console.log('❌ Error de validación:', error.details);
        return res.status(HttpCodes.BAD_REQUEST).json({
          data: null,
          message: 'Ocurrió un error al validar los campos',
          details: error.details.map((detail) => detail.message),
        });
      }
  
      const { username, email, password } = req.body;
  
      // Verificar si el usuario ya existe
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        console.log('❌ El email ya está registrado');
        return res.status(HttpCodes.BAD_REQUEST).json({
          data: null,
          message: 'El email ya está registrado',
        });
      }
  
      console.log('🔒 Hasheando la contraseña...');
      const hashedPassword = bcryptjs.hashSync(password, 10);
  
      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
      });
  
      console.log('📝 Guardando nuevo usuario...');
      await newUser.save();
  
      console.log('✅ Usuario registrado con éxito');
      return res.status(HttpCodes.CREATED).json({
        data: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          isAdmin: newUser.isAdmin,
        },
        message: 'Usuario registrado con éxito',
      });
    } catch (error) {
      console.error('❌ Error en el registro:', error);
      return internalError(res, error, 'Ocurrió un error al registrar el usuario');
    }
  }
  
  
  
  

  // Cambiar contraseña
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

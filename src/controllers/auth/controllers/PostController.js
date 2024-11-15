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
      // Buscar al usuario solo por el email
      const user = await UserModel.findOne({ email });
      console.log('Usuario encontrado:', user);
      
      if (!user) {
        console.log('Usuario no encontrado');
        return res.status(HttpCodes.UNAUTHORIZED).json({
          data: null,
          message: 'Email o contraseña incorrectos',
        });
      }
  
      console.log('Contraseña ingresada:', password);
      console.log('Contraseña hasheada en la base de datos:', user.password);
  
      // Comparar la contraseña ingresada con la almacenada (que está encriptada)
      const isPasswordCorrect = await bcryptjs.compare(password, user.password);
      console.log('¿Contraseña correcta?', isPasswordCorrect);
  
      if (!isPasswordCorrect) {
        console.log('Contraseña incorrecta');
        return res.status(HttpCodes.UNAUTHORIZED).json({
          data: null,
          message: 'Email o contraseña incorrectos',
        });
      }
  
      const userInfo = {
        id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      };
  
      const token = jwt.sign({ user: userInfo }, process.env.SECRET_KEY, {
        expiresIn: '1h',
      });
  
      console.log("Token generado:", token); 
  
      return res.status(HttpCodes.OK).json({
        data: { token, user: userInfo },
        message: 'Sesión iniciada correctamente',
      });
      
    } catch (error) {
      console.error('Error en el login:', error);
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
  
      const newUser = new UserModel({
        username,
        email,
        password,
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
  
  static async editUser(req, res) {
    const { username, email, password } = req.body;
    const userId = req.params.id;
  
    try {
      // Verificar si el usuario existe
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(HttpCodes.NOT_FOUND).json({
          data: null,
          message: 'Usuario no encontrado',
        });
      }
  
      // Actualizar los campos del usuario
      if (username) user.username = username;
      if (email) user.email = email;
  
      // Asignar la nueva contraseña directamente, el middleware se encargará de hashearla
      if (password) {
        user.password = password; // Sin hashear, el middleware lo hará por ti
      }
  
      // Guardar los cambios
      await user.save();
  
      return res.status(HttpCodes.OK).json({
        data: {
          id: user._id,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
        },
        message: 'Usuario actualizado con éxito',
      });
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      return internalError(res, error, 'Ocurrió un error al actualizar el usuario');
    }
  }
}  
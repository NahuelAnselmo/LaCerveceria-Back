import HttpCodes from 'http-status-codes';
import bcryptjs from 'bcryptjs';
import UserModel from '../../../models/userSchema.js';
import { internalError } from '../../../helpers/helpers.js';

export class PostController {
  static async postUser(req, res) {
    // si llegamos aca la info que nos manda el fe ya esta validada

    const { body } = req;
    const hashedPassword = bcryptjs.hashSync(body.password, 10);

    const newUser = new UserModel({
      name: body.name,
      dni: body.dni,
      email: body.email,
      password: hashedPassword,
      isAdmin: false,
    });

    try {
      await newUser.save();
      res.status(HttpCodes.CREATED).json({
        data: null,

        messege: 'usuario guardado correctamente',
      });
    } catch (e) {
      internalError(res, e, 'ocurrio un error al guardar el usuario');
    }
  }
}

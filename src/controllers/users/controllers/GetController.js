import UsersModel from '../../../models/userSchema.js';
import { internalError } from '../../../helpers/helpers.js';

export class GetController {
  static async getUsers(_, res) {
    try {
      const data = await UsersModel.find({
        isActive: true,
      });

      const filterdData = data.map((user) => {
        return {
          id: user._doc._id,
          name: user.name,
          dni: user.dni,
          email: user.email,
          isAdmin: user.isAdmin,
        };
      });
      res.json({
        data: filterdData,
        message: 'usario encontrado correctamente',
      });
    } catch (e) {
      internalError(res, e, 'ocurrio un error al leer la lista de usuarios ');
    }
  }
}

import HttpCodes from 'http-status-codes';
import ContactModel from '../../../models/ContactSchema.js';
import { internalError } from '../../../helpers/helpers.js';

export class PostController {
  static async postContact(req, res) {
    const { body } = req;
    const newContact = new ContactModel({
      issue: body.issue,
      name: body.name,
      lastname: body.lastname,
      email: body.email,
      message: body.message,
    });

    try {
      await newContact.save();
      res.status(HttpCodes.CREATED).json({
        data: null,
        message: 'Contacto guardado correctamente',
      });
    } catch (e) {
      internalError(res, e, 'Ocurrio un error al guardar el mensaje');
    }
  }
}

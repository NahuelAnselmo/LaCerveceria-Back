import ContactModel from '../../../models/ContactSchema.js';
import { internalError } from '../../../helpers/helpers.js';

export class GetController {
  static async getContact(req, res) {
    try {
      const data = await ContactModel.find({ isActive: true }).lean();

      const filteredData = data.map((contact) => ({
        id: contact._id,
        issue: contact.issue,
        name: contact.name,
        lastname: contact.lastname,
        email: contact.email,
        message: contact.message,
      }));

      res.json({
        data: filteredData,
        message: 'Contacto encontrados correctamente',
      });
    } catch (e) {
      internalError(res, e, 'Ocurrió un error al leer la lista de mensajes');
    }
  }
}

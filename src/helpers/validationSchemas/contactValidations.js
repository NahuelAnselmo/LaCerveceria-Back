import mongoose from 'mongoose';

const Post_contactValidationSchema = new mongoose.Schema(
  {
    issue: {
      type: String,
      required: [true, 'El campo asunto es requerido'],
      minlength: [5, 'El campo asunto debe tener al menos 5 caracteres'],
      maxlength: [50, 'El campo asunto debe tener un máximo de 50 caracteres'],
      trim: true,
      match: [
        /^[A-Za-zñÑáéíóúÁÉÍÓÚ0-9\s.,!?()-]+$/,
        'El campo asunto solo puede contener letras, números y ciertos caracteres de puntuación (. , ! ? () -)',
      ],
    },
    name: {
      type: String,
      required: [true, 'El nombre es requerido'],
      minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
      maxlength: [30, 'El nombre debe tener un máximo de 30 caracteres'],
      trim: true,
      match: [
        /^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]+$/,
        'El campo nombre solo puede contener letras y espacios',
      ],
    },
    lastname: {
      type: String,
      required: [true, 'El apellido es requerido'],
      minlength: [2, 'El apellido debe tener al menos 2 caracteres'],
      maxlength: [30, 'El apellido debe tener un máximo de 30 caracteres'],
      trim: true,
      match: [
        /^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]+$/,
        'El campo apellido solo puede contener letras y espacios',
      ],
    },
    email: {
      type: String,
      required: [true, 'El email es requerido'],
      maxlength: [254, 'El campo email no puede exceder los 254 caracteres'],
      trim: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'El formato del correo electrónico no es válido',
      ],
    },
    message: {
      type: String,
      required: [true, 'El mensaje es requerido'],
      minlength: [10, 'El campo mensaje debe tener al menos 10 caracteres'],
      maxlength: [
        500,
        'El campo mensaje debe tener un máximo de 500 caracteres',
      ],
      trim: true,
      match: [
        /^[A-Za-zñÑáéíóúÁÉÍÓÚ0-9\s.,!?()-]+$/,
        'El campo mensaje solo puede contener letras, números y ciertos caracteres de puntuación (. , ! ? () -)',
      ],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const ContactModel = mongoose.model('Contatcs', Post_contactValidationSchema);

export default ContactModel;

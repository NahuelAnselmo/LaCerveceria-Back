/* eslint-disable prettier/prettier */
import mongoose from 'mongoose';
import UserModel from './src/models/userSchema.js';

const createAdmins = async () => {
  try {
    await mongoose.connect('mongodb+srv://santiagoaltamiranda1997:ajh4mSAmzGR2VWBH@cluster0.zvspw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

    const admins = [
      {
        username: 'Santi',
        email: 'santi@cerveceria.com',
        password: 'santi123', // Contraseña en texto plano
        isAdmin: true,
      },
      {
        username: 'Nahuel',
        email: 'nahuel@cerveceria.com',
        password: 'nahuel123',
        isAdmin: true,
      },
      {
        username: 'Mario',
        email: 'mario@cerveceria.com',
        password: 'mario123',
        isAdmin: true,
      },
    ];

    // Borrar administradores previos para evitar duplicados
    await UserModel.deleteMany({ isAdmin: true });

    // Crear nuevos administradores (el middleware pre-save hasheará la contraseña automáticamente)
    for (const admin of admins) {
      console.log(`Creando administrador: ${admin.username}`);
      const createdAdmin = await UserModel.create(admin);
      console.log(`✅ Administrador creado: ${createdAdmin.email}`);
    }

    console.log('✅ Todos los administradores creados con éxito');
  } catch (error) {
    console.error('❌ Error al crear administradores:', error);
  } finally {
    mongoose.connection.close();
  }
};

createAdmins();

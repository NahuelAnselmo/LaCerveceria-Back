import express from 'express';
import { Contacts } from '../../controllers/Contact/index.js';

export const contactRouter = express.Router();

contactRouter.get('/', Contacts.GetController.getContact);
contactRouter.post('/', Contacts.PostController.postContact);

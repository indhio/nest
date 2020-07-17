import { Connection } from 'mongoose';
import { UsuarioSchema } from '../modules/usuario/usuario.model';

export const usuarioProviders = [
  {
    provide: 'UsuarioModelToken',
    useFactory: (connection: Connection) => connection.model('Usuario', UsuarioSchema, 'usuario'),
    inject: ['DbConnectionToken'],
  },
];



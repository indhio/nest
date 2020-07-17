import { Document, Schema } from 'mongoose';

export interface UsuarioDocument extends Document {
  _id: string;
  nome: string;
  email: string;

  removido: Boolean;

  // timestamps
  created_at: Date;
  updated_at: Date;
}

export const UsuarioSchema = new Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },

  removido: { type: Boolean, default: false, require: true },

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });


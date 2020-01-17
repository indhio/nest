import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Service } from '../../commons/service';
import { UsuarioDocument } from './usuario.model';

@Injectable()
export class UsuarioService extends Service<UsuarioDocument> {

    constructor(
        @Inject('UsuarioModelToken') public readonly model: Model<UsuarioDocument>) {
        super(model);
    }

    preCreate(obj: UsuarioDocument): Promise<UsuarioDocument> {
        return new Promise((resolve, reject) => {
            resolve(obj);
        });
    }

    postCreate(obj: UsuarioDocument) {
    }

    preUpdate(obj: UsuarioDocument): Promise<UsuarioDocument> {
        return new Promise((resolve, reject) => {
            resolve(obj);
        });
    }
    postUpdate(obj: UsuarioDocument) {
        super.findById(obj._id)
            .then(usuario => {
                // ....
            });
    }

    preDelete(id: string): Promise<string> {
        return new Promise((resolve, reject) => {
            resolve(id);
        });
    }

    async delete(id: string): Promise<void> {
        await this.model.findByIdAndUpdate(id, { $set: { removido: true, } }).exec();
    }

}
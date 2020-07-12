import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Pager } from '../../commons/pager';
import { BusinessException } from '../../exceptions/business.exception';
import { UsuarioDocument } from './usuario.model';

@Injectable()
export class UsuarioService {

    constructor(
        @Inject('UsuarioModelToken') public readonly model: Model<UsuarioDocument>,
    ) {
    }

    async findById(id: string, populate?: any): Promise<UsuarioDocument> {
        return await this.model.findById(id).populate(populate ? populate : "").exec()
            .then((obj: UsuarioDocument) => {
                if (!obj) {
                    throw new BusinessException('Registro não encontrado.');
                }
                return obj;
            }).catch(err => { throw (err instanceof BusinessException ? err : new BusinessException(err)); });
    }

    async findAll(where?: any, sort?: any, populate?: any, limit?: any): Promise<UsuarioDocument[]> {
        return await this.model.find()
            .populate(populate ? populate : "")
            .where(where ? where : {})
            .sort(sort ? sort : {})
            .limit(limit ? limit : null)
            .exec()
            .catch(err => { throw new BusinessException(err) });
    }

    async findOne(where: any, populate?: any): Promise<UsuarioDocument> {
        return await this.model.findOne(where)
            .populate(populate ? populate : "")
            .exec()
            .catch(err => { throw new BusinessException(err) });
    }

    async pager(page: number, perPage: number, where?: any, sort?: any, populate?: any): Promise<Pager<UsuarioDocument>> {
        return await this.model.countDocuments(where ? where : {}).exec()
            .then(count => {
                return this.model.find()
                    .populate(populate ? populate : "")
                    .limit(perPage)
                    .skip(perPage * (page - 1))
                    .where(where ? where : {})
                    .sort(sort ? sort : {})
                    .exec()
                    .then(list => {
                        return new Pager<UsuarioDocument>(page, count, list);
                    })
            }).catch(err => { throw (err instanceof BusinessException ? err : new BusinessException(err)); });
    }

    async count(where?: any): Promise<number> {
        return await this.model.countDocuments(where ? where : {}).exec();
    }

    async create(obj: UsuarioDocument): Promise<UsuarioDocument> {
        return await this.model.create(obj)
            .catch(err => { throw new BusinessException(err) });
    }

    async update(id: string, newValue: UsuarioDocument): Promise<UsuarioDocument> {
        return await this.model.findByIdAndUpdate(id, newValue).exec()
            .catch(err => { throw new BusinessException(err) });
    }

    async delete(id: string): Promise<UsuarioDocument> {
        return await this.model.findByIdAndRemove(id).exec()
            .catch(err => { throw new BusinessException(err) });
    }

    async deleteMany(where: any): Promise<any> {
        return await this.model.deleteMany(where).exec()
            .catch(err => { throw new BusinessException(err) });
    }

}
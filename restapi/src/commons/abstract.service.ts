/**
 * abstract.services.ts
 */

import { Document, Model } from 'mongoose';
import { BusinessException } from './../exceptions/business.exception';
import { Pager } from './pager';

export abstract class AbstractService<T extends Document> {

    constructor(public readonly model: Model<T>) {
    }

    abstract preCreate(obj: T): Promise<T>;
    async create(obj: T): Promise<T> {
        try {
            return await this.preCreate(obj).then((objUpdated) => {
                return this.model.create(objUpdated)
                    .then(result => {
                        this.postCreate(result);
                        return result;
                    })
            }).catch(err => {
                throw (err instanceof BusinessException ? err : new BusinessException(err));
            });
        } catch (e) {
            throw (e instanceof BusinessException ? e : new BusinessException(e));
        }
    }
    abstract postCreate(obj: T): void;

    async count(where?: any): Promise<number> {
        try {
            return await this.model.countDocuments(where ? where : {}).exec();
        } catch (e) {
            throw new BusinessException(e);
        }
    }

    async findAll(where?: any, sort?: any, populate?: any, limit?: any): Promise<T[]> {
        try {
            return await this.model.find()
                .populate(populate ? populate : "")
                .where(where ? where : {})
                .sort(sort ? sort : {})
                .limit(limit ? limit : null)
                .exec();
        } catch (e) {
            throw new BusinessException(e);
        }
    }

    async findOne(where: any, populate?: any): Promise<T> {
        try {
            return await this.model.findOne(where)
                .populate(populate ? populate : "")
                .exec();
        } catch (e) {
            throw new BusinessException(e);
        }
    }

    async pager(page: number, perPage: number, where?: any, sort?: any, populate?: any): Promise<Pager<T | any>> {
        try {
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
                            return new Pager<T | any>(page, count, list);
                        })
                        .catch(err => { throw new BusinessException(err) });
                })
                .catch(err => { throw new BusinessException(err) });
        } catch (e) {
            throw new BusinessException(e);
        }
    }

    async findById(id: string, populate?: any): Promise<T> {
        try {
            let obj = await this.model.findById(id).populate(populate ? populate : "").exec();
            if (!obj) {
                throw new BusinessException('Registro não encontrado.');
            }
            return obj;
        } catch (e) {
            throw new BusinessException(e);
        }
    }

    abstract preUpdate(obj: T): Promise<T>;
    async update(id: string, newValue: T): Promise<T | null> {
        try {
            let objUpdated = await this.model.findById(id).exec();
            if (!objUpdated) {
                throw new BusinessException('Registro não encontrado.');
            }
            return await this.preUpdate(newValue).then((newValueUpdated: T) => {
                return this.model.findByIdAndUpdate(id, newValueUpdated).exec()
                    .then(result => {
                        this.postUpdate(newValueUpdated);
                        return newValueUpdated;
                    })
            }).catch(err => {
                throw (err instanceof BusinessException ? err : new BusinessException(err));
            });
        } catch (e) {
            throw (e instanceof BusinessException ? e : new BusinessException(e));
        }
    }
    abstract postUpdate(obj: T): void;

    abstract preDelete(id: string): Promise<string>;
    async delete(id: string): Promise<T> {
        try {
            return await this.preDelete(id).then((id: string) => {
                return this.model.findByIdAndRemove(id).exec();
            });
        } catch (e) {
            throw (e instanceof BusinessException ? e : new BusinessException(e));
        }
    }

    async deleteMany(where: any): Promise<any> {
        try {
            return await this.model.deleteMany(where).exec();
        } catch (e) {
            throw new BusinessException(e);
        }
    }

}
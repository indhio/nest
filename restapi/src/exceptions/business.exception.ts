import { HttpException, HttpStatus } from "@nestjs/common";

export class BusinessException extends HttpException {
    constructor(message?: string) {
        console.log('BusinessException >>> ' + message);
        super(message ? message : 'Ops! Aconteceu um erro inesperado. Tente novamente mais tarde!', HttpStatus.BAD_REQUEST);
    }
}
import { HttpException, HttpStatus } from "@nestjs/common";

export class ForbiddenException extends HttpException {
    constructor() {
        super('Credenciais inválidas. Email e/ou senha estão incorretos.', HttpStatus.FORBIDDEN);
    }c
}
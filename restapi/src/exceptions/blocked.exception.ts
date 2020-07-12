import { HttpException, HttpStatus } from "@nestjs/common";

export class BlockedException extends HttpException {
    constructor() {
        super('Usuário BLOQUEADO! Procure nosso suporte para maiores informações.', HttpStatus.FORBIDDEN);
    }c
}
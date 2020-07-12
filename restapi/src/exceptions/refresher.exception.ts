import { HttpException, HttpStatus } from "@nestjs/common";

export class RefresherException extends HttpException {
    constructor(message?: string) {
        super(message ? message : 'Sua sessão expirou!', HttpStatus.UNAUTHORIZED);
    }
}
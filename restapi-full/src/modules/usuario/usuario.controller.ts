import { Body, Controller, Delete, Get, Headers, HttpStatus, Param, Post, Put, Res, UseFilters, UseInterceptors } from '@nestjs/common';
import { Pager } from '../../commons/pager';
import { HttpExceptionFilter } from '../../filters/http-exception.filter';
import { LoggingInterceptor } from '../../interceptors/logging.interceptor';
import { UsuarioDocument } from './usuario.model';
import { UsuarioService } from './usuario.service';

@Controller('api/usuarios')
@UseFilters(new HttpExceptionFilter())
@UseInterceptors(LoggingInterceptor)
export class UsuarioController {

  constructor(private readonly service: UsuarioService) {
  }

  @Get('/list')
  async findAll(): Promise<UsuarioDocument[]> {
    return this.service.findAll({ nome: 'asc' }, '');
  }

  @Get('/count')
  async count(@Headers() headers): Promise<number> {
    return this.service.count();
  }

  @Get('/pager/:page/:perPage/')
  async pager(@Param() params, @Headers() headers): Promise<Pager<UsuarioDocument>> {
    return this.service.pager(parseInt(params.page, 10), parseInt(params.perPage, 10), { nome: 'asc' }, '');
  }

  @Get('/:id')
  async findById(@Param() params) {
    return this.service.findById(params.id, '');
  }

  @Post('/create')
  async create(@Res() res, @Body() obj: UsuarioDocument) {
    return this.service.create(obj).then((result: UsuarioDocument) => {
      res.status(HttpStatus.CREATED).send(result);
    }).catch(err => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
  }

  @Put('/update')
  async update(@Res() res, @Body() obj: UsuarioDocument) {
    return this.service.update(obj._id, obj).then((result: UsuarioDocument) => {
      res.status(HttpStatus.OK).send(result);
    }).catch(err => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
  }

  @Delete('/delete/:id')
  remove(@Param() params) {
    return this.service.delete(params.id);
  }

}

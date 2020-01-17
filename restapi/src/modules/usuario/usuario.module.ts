import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../providers/database.module';
import { usuarioProviders } from '../../providers/model.providers';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UsuarioController],
  providers: [UsuarioService, ...usuarioProviders],
})
export class UsuarioModule {

  constructor(private service: UsuarioService) {
  }

}




import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AsistenciaModule } from './asistencia/asistencia.module';
import { UsersModule } from './users/users.module';
import { CursosModule } from './cursos/cursos.module';

@Module({
  imports: [AsistenciaModule, UsersModule, CursosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

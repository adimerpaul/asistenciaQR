import { Module } from '@nestjs/common';
import { CursosController } from './cursos.controller';
import { CursosService } from './cursos.service';
import {PrismaService} from "../prisma.service";
import {AuthGuard} from "../users/auth.guard";
import {UsersModule} from "../users/users.module";

@Module({
  imports: [UsersModule],
  controllers: [CursosController],
  providers: [CursosService, PrismaService, AuthGuard],
})
export class CursosModule {}

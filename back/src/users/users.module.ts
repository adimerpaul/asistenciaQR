import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {PrismaService} from "../prisma.service";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [
      JwtModule.register({
        secret: process.env.JWT_SECRET,
        // signOptions: { expiresIn: '1h' },
      })
  ],
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  exports: [JwtModule],
})
export class UsersModule {}

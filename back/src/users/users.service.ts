import {Injectable, NotFoundException} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {JwtService} from "@nestjs/jwt";
const bcrypt = require('bcryptjs');


@Injectable()
export class UsersService {
  constructor(
      private prisma: PrismaService,
      private jwtService: JwtService,
  ) {}
  async login(body) {
    console.log(body);
    const { username, password } = body;
    const user = await this.prisma.users.findFirst({
      where: {
        username: username,
      },
    });
    // console.log(user);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    const isMatch = await bcrypt.compare(password, user.password!);
    if (!isMatch) {
      throw new NotFoundException('Contraseña incorrecta');
    }
    const payload = {
      id: user.id,
      username: user.username,
      role: user.role,
      name: user.name,
      avatar: user.avatar,
    }
    const token = await this.jwtService.signAsync(payload);

    return {
      token: token,
      user: payload
    }
  }
}

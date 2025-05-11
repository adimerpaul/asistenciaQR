import {Injectable, NotFoundException} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
const bcrypt = require('bcryptjs');


@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
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
    //
    // async function main() {
    //   const hash = await bcrypt.hash('123456', 10);
  }
}

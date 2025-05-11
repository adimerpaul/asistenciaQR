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

    async uploadAvatar(compressedFilename, id: number) {
        const user = await this.prisma.users.findUnique({
            where: {
                id: id,
            },
        });
        if (!user) {
            throw new NotFoundException('Usuario no encontrado');
        }
        const updatedUser = await this.prisma.users.update({
            where: {
                id: id,
            },
            data: {
                avatar: compressedFilename,
            },
        });
    }
    async findOne(id: number) {
        const user = await this.prisma.users.findUnique({
            where: {
                id: id,
            },
            select: {
                id: true,
                username: true,
                name: true,
                role: true,
                avatar: true,
                docente: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                    }
                }
            }
        });
        if (!user) {
            throw new NotFoundException('Usuario no encontrado');
        }
        return user;
    }
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
    async findAll() {
        return this.prisma.users.findMany({
            where: {
                deleteAt: null
            },
            select: {
                id: true,
                username: true,
                name: true,
                role: true,
                avatar: true,
                docente: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                    }
                }
            }
        });
    }
    async create(body) {
        const { username, password, name, role } = body;
        const user = await this.prisma.users.create({
            data: {
                username,
                password: await bcrypt.hash(password, 10),
                name,
                role,
            },
        });
        return user;
    }
    async update(body, id) {
        const user = await this.prisma.users.findUnique({
            where: {
                id: id,
            },
        });
        if (!user) {
            throw new NotFoundException('Usuario no encontrado');
        }
        const { username, name, role } = body;
        const updatedUser = await this.prisma.users.update({
            where: {
                id: id,
            },
            data: {
                username,
                name,
                role,
            },
        });
    }

    async delete(id) {
        const user = await this.prisma.users.findUnique({
            where: {
                id: id,
            },
        });
        if (!user) {
            throw new NotFoundException('Usuario no encontrado');
        }
        const updatedUser = await this.prisma.users.update({
          data: {
            deleteAt: new Date(),
          },
          where: {
            id: id,
          }
        });
        return updatedUser;
    }
    async passwordUpload(body, id) {
        const user = await this.prisma.users.findUnique({
            where: {
                id: id,
            },
        });
        if (!user) {
            throw new NotFoundException('Usuario no encontrado');
        }
        const { newPassword } = body;
        const updatedUser = await this.prisma.users.update({
            where: {
                id: id,
            },
            data: {
                password: await bcrypt.hash(newPassword, 10),
            },
        });
    }
}

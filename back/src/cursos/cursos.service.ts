import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CursosService {
    constructor(private readonly prismaService: PrismaService) {}

    create(body, user) {
        return this.prismaService.cursos.create({
            data: {
                ...body,
                userId: user.id, // asignar el docente
            },
        });
    }

    findAll(user) {
        return this.prismaService.cursos.findMany({
            where: {
                deleteAt: null,
                userId: user.id, // solo cursos del docente logueado
            },
        });
    }

    async findOne(id: number) {
        const curso = await this.prismaService.cursos.findUnique({ where: { id } });
        if (!curso) throw new NotFoundException('Curso no encontrado');
        return curso;
    }

    async update(id: number, data) {
        const curso = await this.findOne(id);
        return this.prismaService.cursos.update({
            where: { id },
            data,
        });
    }

    async delete(id: number) {
        const curso = await this.findOne(id);
        return this.prismaService.cursos.update({
            where: { id },
            data: { deleteAt: new Date() },
        });
    }
}

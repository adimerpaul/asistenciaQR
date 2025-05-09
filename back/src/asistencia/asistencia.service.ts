import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as moment from 'moment';

@Injectable()
export class AsistenciaService {
  constructor(private prisma: PrismaService) {}

  async guardarAsistencia(body) {
    console.log('body', body);
    const { userId, estado } = body;

    const ultimaAsistencia = await this.prisma.asistencias.findFirst({
      where: {
        userId,
        deleteAt: null,
      },
      orderBy: { id: 'desc' },
    });

    if (ultimaAsistencia) {
      const haceMediaHora = moment(ultimaAsistencia.fecha).add(30, 'minutes');
      const ahora = moment();
      const tiempoTranscurrido = haceMediaHora.diff(ahora, 'minutes');

      if (ahora.isBefore(haceMediaHora)) {
        return {
          success: true,
          message:
            'Ya registraste tu asistencia recientemente ' +
            tiempoTranscurrido +
            ' minutos.',
        };
      }
    }
    // verificamos si existe el estudiante
    const estudiante = await this.prisma.users.findUnique({
      where: {
        id: userId,
      },
    });
    if (!estudiante) {
      return {
        success: true,
        message: 'El estudiante no existe.',
      };
    }

    const nuevaAsistencia = await this.prisma.asistencias.create({
      data: {
        userId,
        fecha: new Date(), // UTC
        hora: moment().format('HH:mm:ss'), // puede usarse en frontend directamente
        estado,
      },
    });

    return {
      success: true,
      message: 'Asistencia registrada correctamente.',
      data: nuevaAsistencia,
    };
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { AsistenciaService } from './asistencia.service';

@Controller('asistencia')
export class AsistenciaController {
  constructor(private readonly asistenciaService: AsistenciaService) {}

  @Post()
  guardarAsistencia(@Body() body: any) {
    // console.log('body', body);
    return this.asistenciaService.guardarAsistencia(body);
  }
}

import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Request,
    Body,
    Param,
    ParseIntPipe,
    UseGuards,
} from '@nestjs/common';
import { CursosService } from './cursos.service';
import { AuthGuard } from '../users/auth.guard';

@Controller('cursos')
@UseGuards(AuthGuard)
export class CursosController {
    constructor(private readonly cursosService: CursosService) {}

    @Get()
    findAll(@Request() req) {
        return this.cursosService.findAll(req.user);
    }

    @Post()
    create(@Request() req, @Body() body) {
        return this.cursosService.create(body, req.user);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.cursosService.findOne(id);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() body) {
        return this.cursosService.update(id, body);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.cursosService.delete(id);
    }
}

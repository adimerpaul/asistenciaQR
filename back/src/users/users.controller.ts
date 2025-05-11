import {
    Body,
    Controller,
    Get,
    Post,
    UseGuards,
    Request,
    Delete,
    Put,
    Param,
    ParseIntPipe,
    UseInterceptors, UploadedFile
} from '@nestjs/common';
import {UsersService} from './users.service';
import {AuthGuard} from "./auth.guard";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {extname} from 'path';
import * as sharp from 'sharp';
import * as fs from 'node:fs';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Post('login')
    login(@Body() body) {
        return this.usersService.login(body);
    }

    @UseGuards(AuthGuard)
    @Get('me')
    me(@Request() req) {
        // console.log(req.user);
        const id = req.user.id;
        return this.usersService.findOne(id);
    }

    @UseGuards(AuthGuard)
    @Get('')
    findAll() {
        return this.usersService.findAll();
    }

    @UseGuards(AuthGuard)
    @Post('')
    create(@Body() body) {
        return this.usersService.create(body);
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() body
    ) {
        return this.usersService.update(body, id);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    delete(
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.usersService.delete(id);
    }

    @UseGuards(AuthGuard)
    @Put('updatePassword/:id')
    passwordUpload(
        @Param('id', ParseIntPipe) id: number,
        @Body() body
    ) {
        return this.usersService.passwordUpload(body, id);
    }

    @UseGuards(AuthGuard)
    @Post(':id/avatar')
    @UseInterceptors(
        FileInterceptor('avatar', {
            storage: diskStorage({
                destination: './uploads', // Carpeta donde se guardarán las imágenes
                filename: (req, file, cb) => {
                    const uniqueSuffix =
                        Date.now() + '-' + Math.round(Math.random() * 1e9);
                    cb(null, uniqueSuffix + extname(file.originalname));
                },
            }),
        }),
    )
    async uploadAvatar(
        @Param('id', ParseIntPipe) id: number,
        @UploadedFile() file: Express.Multer.File,
    ) {
        if (file) {
            const compressedFilename = `compressed-${file.filename}`;
            const compressedPath = `./uploads/${compressedFilename}`;

            await sharp(file.path)
                .resize(350) // Cambia el tamaño (puedes ajustar este valor)
                .jpeg({ quality: 70 }) // Reduce la calidad al 70% (ajústalo según necesidad)
                .toFile(compressedPath);

            // Elimina la imagen original para ahorrar espacio
            fs.unlink(file.path, (err) => {
                if (err) {
                    console.error('Error al eliminar archivo:', err);
                } else {
                    console.log('Archivo eliminado correctamente');
                }
            });
            // body.photo = compressedFilename;
            return this.usersService.uploadAvatar(compressedFilename, id);
        } else {
            // body.photo = 'defaultPet.jpg';
        }
        // return this.usersService.uploadAvatar(body, id);
    }
}

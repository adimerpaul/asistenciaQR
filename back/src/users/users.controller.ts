import {Body, Controller, Get, Post, UseGuards, Request, Delete, Put, Param, ParseIntPipe} from '@nestjs/common';
import {UsersService} from './users.service';
import {AuthGuard} from "./auth.guard";

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
        return req.user;
    }

    @UseGuards(AuthGuard)
    @Get('')
    findAll() {
        return this.usersService.findAll();
    }

    @UseGuards(AuthGuard)
    @Post('create')
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

    // @UseGuards(AuthGuard)
    // @Post('passwordUpload')
    // passwordUpload(@Body() body) {
    //     return this.usersService.passwordUpload(body);
    // }
}

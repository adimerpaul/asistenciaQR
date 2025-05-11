import {Body, Controller, Get, Post, UseGuards, Request} from '@nestjs/common';
import { UsersService } from './users.service';
import {AuthGuard} from "./auth.guard";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  login(@Body() body) {
    return this.usersService.login(body);
  }
  @UseGuards(AuthGuard)
  @Get('me')
  me(@Request() req) {
      return req.user;
  }
}

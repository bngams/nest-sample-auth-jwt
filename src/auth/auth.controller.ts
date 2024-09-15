import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Request,
  SetMetadata,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Response } from 'express';
import { tap } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @SetMetadata('isPublic', true)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(
    @Body() signInDto: Record<string, any>,
    @Res({ passthrough: true }) response: Response,
  ) {
    return new Promise((resolve, reject) => {
      this.authService
        .signIn(signInDto.username, signInDto.password)
        .then((data: any) => {
          response.cookie('token', data.access_token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
          });
          resolve(data);
        })
        .catch((error) => reject(error));
    });
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user; // simulate some request returning some data
  }
}

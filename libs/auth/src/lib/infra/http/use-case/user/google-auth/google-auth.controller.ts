import { Response } from 'express';

import {
  AUTH_CONFIG,
  AuthConfig,
  GOOGLE_CONFIG,
  GoogleConfig,
} from '@dinocommerce/shared';
import {
  Controller,
  Get,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { AuthToken } from '../../../../../domain/auth/auth-token';
import { GOOGLE_STRATEGY } from '../../../../../shared';

@ApiTags('Users Auth')
@Controller('users/auth/google')
export class GoogleAuthUserController {
  constructor(private configService: ConfigService) {}

  @ApiOperation({ summary: 'Initiates the Google OAuth2 login flow' })
  @Get()
  @UseGuards(AuthGuard(GOOGLE_STRATEGY))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async googleAuth() {}

  @ApiOperation({ summary: 'Handles the Google OAuth2 callback and return JWT when Successful' })
  @Get('callback')
  @UseGuards(AuthGuard(GOOGLE_STRATEGY))
  googleAuthCallback(@Req() req, @Res() res: Response) {
    const { token } = req.user as AuthToken;

    const { cookieName } = this.configService.get<AuthConfig>(AUTH_CONFIG);
    const { callbackSuccess, callbackFailure } = this.configService.get<GoogleConfig>(GOOGLE_CONFIG);
    if (token) {
      res.cookie(cookieName, token, { httpOnly: true });
      res.redirect(`${callbackSuccess}?code=${token}`);
    } else {
      res.redirect(callbackFailure);
    }
  }
}

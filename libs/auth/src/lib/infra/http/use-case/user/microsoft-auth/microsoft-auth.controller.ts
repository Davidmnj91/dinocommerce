import { Response } from 'express';

import {
  AUTH_CONFIG,
  AuthConfig,
  MICROSOFT_CONFIG,
  MicrosoftConfig,
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
import { MICROSOFT_STRATEGY } from '../../../../../shared';

@ApiTags('Users Auth')
@Controller('users/auth/microsoft')
export class MicrosoftAuthUserController {
  constructor(private configService: ConfigService) {}

  @ApiOperation({ summary: 'Initiates the Microsoft OAuth2 login flow' })
  @Get()
  @UseGuards(AuthGuard(MICROSOFT_STRATEGY))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async microsoftAuth() {}

  @ApiOperation({ summary: 'Handles the Microsoft OAuth2 callback and return JWT when Successful' })
  @Get('callback')
  @UseGuards(AuthGuard(MICROSOFT_STRATEGY))
  microsoftAuthCallback(@Req() req, @Res() res: Response) {
    const { token } = req.user as AuthToken;

    const { cookieName } = this.configService.get<AuthConfig>(AUTH_CONFIG);
    const { callbackSuccess, callbackFailure } = this.configService.get<MicrosoftConfig>(MICROSOFT_CONFIG);
    if (token) {
      res.cookie(cookieName, token, { httpOnly: true });
      res.redirect(`${callbackSuccess}?code=${token}`);
    } else {
      res.redirect(callbackFailure);
    }
  }
}

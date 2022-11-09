import { Response } from 'express';

import {
  AUTH_CONFIG,
  AuthConfig,
  FACEBOOK_CONFIG,
  FACEBOOK_STRATEGY,
  FacebookConfig,
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

import { AuthToken } from '../../../../domain/auth-token';

@ApiTags('Auth')
@Controller('auth/facebook')
export class FacebookAuthUserController {
  constructor(private configService: ConfigService) {}

  @ApiOperation({ summary: 'Initiates the Facebook OAuth2 login flow' })
  @Get()
  @UseGuards(AuthGuard(FACEBOOK_STRATEGY))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async facebookAuth() {}

  @ApiOperation({ summary: 'Handles the Facebook OAuth2 callback and return JWT when Successful' })
  @Get('callback')
  @UseGuards(AuthGuard(FACEBOOK_STRATEGY))
  facebookAuthCallback(@Req() req, @Res() res: Response) {
    const { token } = req.user as AuthToken;

    const { cookieName } = this.configService.get<AuthConfig>(AUTH_CONFIG);
    const { callbackSuccess, callbackFailure } = this.configService.get<FacebookConfig>(FACEBOOK_CONFIG);
    if (token) {
      res.cookie(cookieName, token, { httpOnly: true });
      res.redirect(`${callbackSuccess}?code=${token}`);
    } else {
      res.redirect(callbackFailure);
    }
  }
}

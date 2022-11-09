import { Response } from 'express';

import {
  AUTH_CONFIG,
  AuthConfig,
  TWITTER_CONFIG,
  TWITTER_STRATEGY,
  TwitterConfig,
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
@Controller('auth/twitter')
export class TwitterAuthUserController {
  constructor(private configService: ConfigService) {}

  @ApiOperation({ summary: 'Initiates the Twitter OAuth2 login flow' })
  @Get()
  @UseGuards(AuthGuard(TWITTER_STRATEGY))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async twitterAuth() {}

  @ApiOperation({ summary: 'Handles the Twitter OAuth2 callback and return JWT when Successful' })
  @Get('callback')
  @UseGuards(AuthGuard(TWITTER_STRATEGY))
  twitterAuthCallback(@Req() req, @Res() res: Response) {
    const { token } = req.user as AuthToken;

    const { cookieName } = this.configService.get<AuthConfig>(AUTH_CONFIG);
    const { callbackSuccess, callbackFailure } = this.configService.get<TwitterConfig>(TWITTER_CONFIG);
    if (token) {
      res.cookie(cookieName, token, { httpOnly: true });
      res.redirect(`${callbackSuccess}?code=${token}`);
    } else {
      res.redirect(callbackFailure);
    }
  }
}

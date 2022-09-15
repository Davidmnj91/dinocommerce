import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { GoogleConfig, GOOGLE_CONFIG } from '../../../../../config/google.config';
import { GOOGLE_STRATEGY } from '../../../../../shared/auth/auth.strategies';
import { AuthToken } from '../../../../domain/auth-token';

@ApiTags('Auth')
@Controller('auth/google')
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
  googleAuthCallback(@Req() req: Request, @Res() res: Response) {
    const jwt: string = (req.user as AuthToken).token;

    const googleConfig = this.configService.get<GoogleConfig>(GOOGLE_CONFIG);
    if (jwt) {
      res.redirect(`${googleConfig.callbackSuccess}?code=${jwt}`);
    } else {
      res.redirect(googleConfig.callbackFailure);
    }
  }
}

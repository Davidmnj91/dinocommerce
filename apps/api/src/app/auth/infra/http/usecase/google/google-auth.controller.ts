import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GoogleConfig, GOOGLE_CONFIG } from '../../../../../config/google.config';
import { GOOGLE_STRATEGY } from '../../../../app/strategies/google.strategy';

@ApiTags('Auth')
@Controller('auth/google')
export class GoogleAuthUserController {
  constructor(private configService: ConfigService) {}

  @Get()
  @UseGuards(AuthGuard(GOOGLE_STRATEGY))
  @ApiOperation({ summary: 'Initiates the Google OAuth2 login flow' })
  async googleAuth() {}

  @Get('callback')
  @UseGuards(AuthGuard(GOOGLE_STRATEGY))
  @ApiOperation({ summary: 'Handles the Google OAuth2 callback and return JWT when Successful' })
  googleAuthCallback(@Req() req, @Res() res) {
    const jwt: string = req.user.token;

    const googleConfig = this.configService.get<GoogleConfig>(GOOGLE_CONFIG);
    if (jwt) {
      res.redirect(`${googleConfig.callbackSuccess}?code=${jwt}`);
    } else {
      res.redirect(googleConfig.callbackFailure);
    }
  }
}

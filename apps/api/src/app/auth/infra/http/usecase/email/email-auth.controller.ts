import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthConfig, AUTH_CONFIG } from '../../../../../config/auth.config';
import { EMAIL_PASSWORD_STRATEGY, JWT_STRATEGY } from '../../../../../shared/auth/auth.strategies';
import { RegisterEmailCommand } from '../../../../app/commands/register-email/register-email.command';
import { LoginUserDto } from './login-email.dto';
import { RegisterEmailDto } from './register-email.dto';

@ApiTags('Auth')
@Controller('auth/email')
export class EmailAuthUserController {
  constructor(private commandBus: CommandBus, private configService: ConfigService) {}

  @ApiOperation({ summary: 'Login Current User' })
  @UseGuards(AuthGuard(EMAIL_PASSWORD_STRATEGY))
  @Post('login')
  @HttpCode(HttpStatus.OK)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async login(@Req() req, @Res({ passthrough: true }) res: Response, @Body() loginUser: LoginUserDto) {
    const { token } = req.user;
    const { cookieName } = this.configService.get<AuthConfig>(AUTH_CONFIG);

    res.cookie(cookieName, token, { httpOnly: true });
    return req.user.token;
  }

  @ApiOperation({ summary: 'Register a new User' })
  @Post('register')
  @HttpCode(HttpStatus.OK)
  async register(@Body() registerEmail: RegisterEmailDto) {
    const { email, password, username } = registerEmail;
    return await this.commandBus.execute(new RegisterEmailCommand(email, password, username));
  }

  @ApiOperation({ summary: 'Logout Current User' })
  @UseGuards(AuthGuard(JWT_STRATEGY))
  @Get('/logout')
  logout(@Req() req: Request, @Res() res: Response) {
    const { cookieName } = this.configService.get<AuthConfig>(AUTH_CONFIG);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (req as any).logout();
    res.clearCookie(cookieName);
    res.redirect('/');
  }
}

import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EMAIL_PASSWORD_STRATEGY, JWT_STRATEGY } from '../../../../../shared/auth/auth.strategies';
import { RegisterEmailCommand } from '../../../../app/commands/register-email/register-email.command';
import { LoginUserDto } from './login-email.dto';
import { RegisterEmailDto } from './register-email.dto';

@ApiTags('Auth')
@Controller('auth/email')
export class EmailAuthUserController {
  constructor(private commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Login Current User' })
  @UseGuards(AuthGuard(EMAIL_PASSWORD_STRATEGY))
  @Post('login')
  @HttpCode(HttpStatus.OK)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async login(@Req() req, @Body() loginUser: LoginUserDto) {
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
  logout(@Req() req, @Res() res) {
    req.logout();
    res.redirect('/');
  }
}

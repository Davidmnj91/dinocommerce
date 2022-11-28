import {
  Request,
  Response,
} from 'express';

import {
  AUTH_CONFIG,
  AuthConfig,
  EMAIL_PASSWORD_STRATEGY,
  JWT_STRATEGY,
} from '@dinocommerce/shared';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import {
  RegisterOperatorByEmailCommand,
} from '../../../../../../app/commands/operator/register-email/register-email.command';
import { LoginUserRequestModel } from './login-email.request-model';
import { RegisterEmailRequestModel } from './register-email.request-model';

@ApiTags('Auth')
@Controller('auth/operator/email')
export class EmailAuthUserController {
  constructor(private commandBus: CommandBus, private configService: ConfigService) {}

  @ApiOperation({ summary: 'Login Current User' })
  @UseGuards(AuthGuard(EMAIL_PASSWORD_STRATEGY))
  @Post('login')
  @HttpCode(HttpStatus.OK)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async login(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
    @Body() _loginUser: LoginUserRequestModel
  ): Promise<string> {
    const { token } = req.user;
    const { cookieName } = this.configService.get<AuthConfig>(AUTH_CONFIG);

    res.cookie(cookieName, token, { httpOnly: true });
    return req.user.token;
  }

  @ApiOperation({ summary: 'Register a new User' })
  @Post('register')
  @HttpCode(HttpStatus.OK)
  async register(@Body() registerEmail: RegisterEmailRequestModel) {
    const { name, lastName, dateOfBirth, email, phone, password, groupIds, isSuperUser } = registerEmail;
    return await this.commandBus.execute(
      new RegisterOperatorByEmailCommand({
        name,
        lastName,
        dateOfBirth,
        email,
        phone,
        password,
        groupIds,
        isSuperUser,
      })
    );
  }

  @ApiOperation({ summary: 'Logout Current User' })
  @UseGuards(AuthGuard(JWT_STRATEGY))
  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    const { cookieName } = this.configService.get<AuthConfig>(AUTH_CONFIG);

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    req.logout(() => {
      res.clearCookie(cookieName);
      res.redirect('/');
    });
  }
}

import {
  Request,
  Response,
} from 'express';

import { OperatorEmailAuthApi } from '@dinocommerce/auth-api';
import {
  AUTH_CONFIG,
  AuthConfig,
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
import {
  EMAIL_PASSWORD_STRATEGY,
  JWT_STRATEGY,
} from '../../../../../../shared';
import { LoginOperatorRequestModel } from './login-email.request-model';
import { RegisterEmailRequestModel } from './register-email.request-model';

@ApiTags('Operators Auth')
@Controller('operators/auth/email')
export class EmailAuthOperatorController implements OperatorEmailAuthApi {
  constructor(private commandBus: CommandBus, private configService: ConfigService) {}

  @ApiOperation({ summary: 'Login Current Operator' })
  @UseGuards(AuthGuard(EMAIL_PASSWORD_STRATEGY))
  @Post('login')
  @HttpCode(HttpStatus.OK)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async login(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
    @Body() _loginOperator: LoginOperatorRequestModel
  ): Promise<string> {
    const { token } = req.user;
    const { cookieName } = this.configService.get<AuthConfig>(AUTH_CONFIG);

    res.cookie(cookieName, token, { httpOnly: true });
    return req.user.token;
  }

  @ApiOperation({ summary: 'Register a new Operator' })
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

  @ApiOperation({ summary: 'Logout Current Operator' })
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

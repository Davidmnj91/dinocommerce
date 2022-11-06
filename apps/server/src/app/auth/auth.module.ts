import { Module } from '@nestjs/common';
import {
  ConfigModule,
  ConfigService,
} from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import {
  AUTH_CONFIG,
  AuthConfig,
} from '../config/auth.config';
import { JWT_STRATEGY } from '../shared/auth/auth.strategies';
import { RegisterEmailCommandHandler } from './app/commands/register-email/register-email.handler';
import { EmailPasswordStrategy } from './app/strategies/email-password.strategy';
import { FacebookStrategy } from './app/strategies/facebook.strategy';
import { GoogleStrategy } from './app/strategies/google.strategy';
import { JwtStrategy } from './app/strategies/jwt.strategy';
import { MicrosoftStrategy } from './app/strategies/microsoft.strategy';
import { TwitterStrategy } from './app/strategies/twitter.strategy';
import { AuthService } from './domain/auth.service';
import { EmailAuthUserController } from './infra/http/use-case/email-auth/email-auth.controller';
import { FacebookAuthUserController } from './infra/http/use-case/facebook-auth/facebook-auth.controller';
import { GoogleAuthUserController } from './infra/http/use-case/google-auth/google-auth.controller';
import { MicrosoftAuthUserController } from './infra/http/use-case/microsoft-auth/microsoft-auth.controller';
import { TwitterAuthUserController } from './infra/http/use-case/twitter-auth/twitter-auth.controller';

const commandHandlers = [RegisterEmailCommandHandler];
const queryHandlers = [];
const eventHandlers = [];
const controllers = [
  EmailAuthUserController,
  GoogleAuthUserController,
  FacebookAuthUserController,
  MicrosoftAuthUserController,
  TwitterAuthUserController,
];
const authStrategies = [
  JwtStrategy,
  EmailPasswordStrategy,
  GoogleStrategy,
  FacebookStrategy,
  MicrosoftStrategy,
  TwitterStrategy,
];

@Module({
  imports: [
    CqrsModule,
    PassportModule.register({
      defaultStrategy: JWT_STRATEGY,
      property: 'user',
      session: false,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const authConfig = configService.get<AuthConfig>(AUTH_CONFIG);

        return {
          secret: authConfig.secret,
          signOptions: {
            expiresIn: authConfig.expiresIn,
          },
        };
      },
    }),
  ],
  providers: [AuthService, ...authStrategies, ...commandHandlers, ...queryHandlers, ...eventHandlers],
  exports: [AuthService],
  controllers: [...controllers],
})
export class AuthModule {}

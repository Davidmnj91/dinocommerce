import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthConfig, AUTH_CONFIG } from '../config/auth.config';
import { JWT_STRATEGY } from '../shared/auth/auth.strategies';
import { RegisterEmailCommandHandler } from './app/commands/register-email/register-email.handler';
import { EmailPasswordStrategy } from './app/strategies/email-password.strategy';
import { GoogleStrategy } from './app/strategies/google.strategy';
import { JwtStrategy } from './app/strategies/jwt.strategy';
import { AuthService } from './domain/auth.service';
import { EmailAuthUserController } from './infra/http/usecase/email-auth/email-auth.controller';
import { GoogleAuthUserController } from './infra/http/usecase/google-auth/google-auth.controller';

const commandHandlers = [RegisterEmailCommandHandler];
const queryHandlers = [];
const eventHandlers = [];
const controllers = [EmailAuthUserController, GoogleAuthUserController];
const authStrategies = [JwtStrategy, EmailPasswordStrategy, GoogleStrategy];

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

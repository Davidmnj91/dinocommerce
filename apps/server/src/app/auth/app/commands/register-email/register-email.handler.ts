import { hash } from 'bcrypt';

import { CommandHandler, IInferredCommandHandler } from '@nestjs/cqrs';

import { AuthUser } from '../../../domain/auth-user';
import { AuthService } from '../../../domain/auth.service';
import { RegisterEmailCommand } from './register-email.command';

@CommandHandler(RegisterEmailCommand)
export class RegisterEmailCommandHandler implements IInferredCommandHandler<RegisterEmailCommand> {
  constructor(private domainService: AuthService) {}

  async execute(command: RegisterEmailCommand): Promise<void> {
    const { email, password, username } = command;

    const hashedPassword = await hash(password, 10);
    const profilePictureUrl = this.domainService.createRandomAvatarUrl(email);
    const authUser = new AuthUser(null, '', username, email, hashedPassword, 'EMAIL', 'USER', profilePictureUrl);
    await this.domainService.createUser(authUser);
  }
}

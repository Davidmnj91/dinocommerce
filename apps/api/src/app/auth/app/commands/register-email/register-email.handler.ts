import { CommandHandler, IInferredCommandHandler } from '@nestjs/cqrs';
import { hash } from 'bcrypt';
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
    const authUser = new AuthUser('', username, email, hashedPassword, 'EMAIL', 'USER', profilePictureUrl);
    this.domainService.createUser(authUser);
  }
}

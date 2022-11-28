import { hash } from 'bcrypt';

import {
  CommandBus,
  CommandHandler,
  IInferredCommandHandler,
} from '@nestjs/cqrs';

import { AuthService } from '../../../../domain/auth/auth.service';
import { CreateOperatorCommand } from '../operator-create/create-operator.command';
import { RegisterOperatorByEmailCommand } from './register-email.command';

@CommandHandler(RegisterOperatorByEmailCommand)
export class RegisterOperatorByEmailCommandHandler implements IInferredCommandHandler<RegisterOperatorByEmailCommand> {
  constructor(private domainService: AuthService, private commandBus: CommandBus) {}

  async execute(command: RegisterOperatorByEmailCommand): Promise<void> {
    const { name, lastName, dateOfBirth, email, phone, password, groupIds, isSuperUser } = command;

    const hashedPassword = await hash(password, 10);
    const profilePictureUrl = this.domainService.createRandomAvatarUrl(email);

    await this.commandBus.execute(
      new CreateOperatorCommand({
        name,
        lastName,
        dateOfBirth,
        email,
        phone,
        password: hashedPassword,
        profilePictureUrl,
        groups: groupIds,
        isSuperUser,
      })
    );
  }
}

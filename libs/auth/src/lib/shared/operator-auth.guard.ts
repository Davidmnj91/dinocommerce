import {
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';

import { ApplicationPermissions } from '../domain/operator/application_permission';
import { JWT_STRATEGY } from './auth.strategies';
import { AuthenticatedUser } from './current-user.injector';
import { PermissionMetadataKey } from './permissions.decorator';
import { resolveRequest } from './request.resolver';

@Injectable()
export class OperatorAuthGuard extends AuthGuard(JWT_STRATEGY) {
  constructor(private reflector: Reflector, private queryBus: QueryBus) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const permissions = this.reflector.getAllAndOverride<Partial<ApplicationPermissions>>(PermissionMetadataKey, [
      context.getHandler(),
      context.getClass(),
    ]);
    const user = this.getUserFromRequest(context);

    //const operatorDetails = await this.queryBus.execute(new GetOperatorDetailsQuery({ email: user.id }));

    return user.isSuperUser || this.hasPermission(user.permissions, permissions);
  }

  private hasPermission(
    currentOperatorPermissions: Partial<ApplicationPermissions>,
    permissions: Partial<ApplicationPermissions>
  ) {
    return Object.keys(permissions).every((permission) =>
      permissions[permission].every((p) => currentOperatorPermissions[permission].includes(p))
    );
  }

  private getUserFromRequest(context: ExecutionContext): AuthenticatedUser {
    return resolveRequest(context)?.user;
  }
}

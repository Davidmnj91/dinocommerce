import { Roles } from '@dinocommerce/events';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { coerceArray } from '../utils/coercions';
import { JWT_STRATEGY } from './auth.strategies';
import { resolveRequest } from './request.resolver';

@Injectable()
export class PassportAuthGuard extends AuthGuard(JWT_STRATEGY) {
  _roles: Roles[] = [];

  constructor(roles?: Roles | Roles[]) {
    super();
    if (roles) {
      this._roles = coerceArray(roles);
    }
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const { user } = this.getRequest(context);
    return !this._roles.length || this._roles.some((role) => role === user.role);
  }

  getRequest(context: ExecutionContext) {
    return resolveRequest(context);
  }
}

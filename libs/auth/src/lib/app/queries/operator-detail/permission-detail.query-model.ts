import { Expose } from 'class-transformer';

import { ApplicationModule } from '../../../domain/operator/application_permission';

export class PermissionDetailQueryModel {
  @Expose()
  readonly module: ApplicationModule;
  @Expose()
  readonly actions: string[];

  constructor(module: ApplicationModule, actions: string[]) {
    this.module = module;
    this.actions = actions;
  }
}

import { OperatorGroupPermissions } from '@dinocommerce/auth-api';

export type ApplicationPermissions = OperatorGroupPermissions;

export type ApplicationModule = keyof ApplicationPermissions;

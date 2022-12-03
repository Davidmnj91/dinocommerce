type WarehousePermissions = {
  PRODUCT: ['CREATE' | 'UPDATE' | 'RESTOCK' | 'VIEW'];
  PRODUCT_CATEGORY: ['CREATE' | 'UPDATE' | 'VIEW'];
};
type OperatorPermissions = {
  OPERATOR: ['CREATE' | 'UPDATE' | 'VIEW'];
  OPERATOR_GROUP: ['CREATE' | 'UPDATE' | 'VIEW'];
};
type UserPermissions = {
  USER: ['VIEW' | 'RESET_PASSWORD'];
};

export type OperatorGroupPermissions = WarehousePermissions & OperatorPermissions & UserPermissions;

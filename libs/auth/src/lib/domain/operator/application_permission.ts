type ProductPermissions = {
  PRODUCT: ['CREATE' | 'UPDATE' | 'VIEW'];
};
type ProductCategoryPermissions = {
  PRODUCT_CATEGORY: ['CREATE' | 'UPDATE' | 'VIEW'];
};
type OperatorPermissions = {
  OPERATOR: ['CREATE' | 'UPDATE' | 'VIEW'];
};
type UserPermissions = {
  USER: ['VIEW' | 'RESET_PASSWORD'];
};

export type ApplicationPermissions = ProductPermissions &
  ProductCategoryPermissions &
  OperatorPermissions &
  UserPermissions;

export type ApplicationModule = keyof ApplicationPermissions;

import { format } from 'util';
import { DomainException } from '../../../shared/exception/domain.exception';

const PRODUCT_CATEGORY_NOT_FOUND_MESSAGE = 'Cannot found product category: %s';

export class ProductCategoryNotFoundException extends DomainException {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(...params: any[]) {
    super(format(PRODUCT_CATEGORY_NOT_FOUND_MESSAGE, ...params));
  }
}

import { Expose } from 'class-transformer';
import { MediaType } from '../../../domain/media-type';

export class MediaQueryModel {
  @Expose()
  readonly type: MediaType;
  @Expose()
  readonly name: string;
  @Expose()
  readonly url: string;
  @Expose()
  readonly position: number;

  constructor(type: MediaType, name: string, url: string, position: number) {
    this.type = type;
    this.name = name;
    this.url = url;
    this.position = position;
  }
}

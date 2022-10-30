import { MediaType } from '../../../domain/media-type';

export class MediaQueryModel {
  readonly type: MediaType;
  readonly name: string;
  readonly url: string;
  readonly position: number;

  constructor(type: MediaType, name: string, url: string, position: number) {
    this.type = type;
    this.name = name;
    this.url = url;
    this.position = position;
  }
}

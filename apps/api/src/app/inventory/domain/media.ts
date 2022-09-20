import { Property } from '@mikro-orm/core';
import { MediaType } from './media-type';

export class Media {
  @Property()
  type: MediaType;

  @Property()
  name: string;

  @Property()
  url: string;

  @Property()
  position: number;

  constructor(type: MediaType, name: string, url: string, position: number) {
    this.type = type;
    this.name = name;
    this.url = url;
    this.position = position;
  }
}

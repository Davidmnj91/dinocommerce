import { Expose } from 'class-transformer';

import { MediaModel } from '@dinocommerce/warehouse-api';
import { ApiProperty } from '@nestjs/swagger';

import { MediaType } from '../../../../domain/media-type';

export class MediaViewModel implements MediaModel {
  @Expose()
  @ApiProperty({ example: '04cda2a2-f193-4da4-a148-0496494fa23d' })
  id: string;
  @Expose()
  @ApiProperty({ example: 'IMAGE' })
  type: MediaType;
  @Expose()
  @ApiProperty({ example: 'a image name' })
  name: string;
  @Expose()
  @ApiProperty({ example: 'https://my-image.com/background.jpg' })
  url: string;
  @Expose()
  @ApiProperty({ example: 1 })
  position: number;
}

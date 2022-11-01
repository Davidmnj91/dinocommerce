import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { MediaType } from '../../../../domain/media-type';

export class MediaViewModel {
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

import { ApiProperty } from '@nestjs/swagger';
import { MediaType } from '../../../../domain/media-type';

export class MediaViewModel {
  @ApiProperty({ example: 'IMAGE' })
  type: MediaType;

  @ApiProperty({ example: 'a image name' })
  name: string;

  @ApiProperty({ example: 'https://my-image.com/background.jpg' })
  url: string;

  @ApiProperty({ example: 1 })
  position: number;
}

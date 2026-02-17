import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { CLOUDINARY } from 'src/common/constants/app.constant';
import { v2 } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [],
  controllers: [],
  providers: [
    CloudinaryService,
    {
      provide: CLOUDINARY,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => 
        v2.config({
          cloud_name: configService.get('CLOUDINARY_CLOUD_NAME'),
          api_key: configService.get('CLOUDINARY_API_KEY'),
          api_secret: configService.get('CLOUDINARY_API_SECRET')
        })
    }
  ],
})
export class CloudinaryModule {}

import { Inject, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CLOUDINARY } from 'src/common/constants/app.constant';
import { UploadRdo } from './rdo/upload.rdo';

@Injectable()
export class UploadsService {

    constructor(private cloudinaryService: CloudinaryService) {}

    async upload(@Inject(CLOUDINARY) file: Express.Multer.File): Promise<UploadRdo> {
        const result = await this.cloudinaryService.uploadSingle(file);
        return plainToInstance(UploadRdo, {
            publicId: result.public_id,
            url: result.secure_url
        })
    }

    async uploadMulti(files: Express.Multer.File[]): Promise<UploadRdo[]> {
        const results = await this.cloudinaryService.uploadMulti(files);
        return results.map((item) => plainToInstance(UploadRdo, item))
    }
}

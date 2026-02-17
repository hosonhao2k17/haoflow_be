import { Inject, Injectable } from '@nestjs/common';
import { v2 as Cloudinary } from 'cloudinary';
import { CLOUDINARY } from 'src/common/constants/app.constant';
import { UploadApiResponse } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  constructor(
    @Inject(CLOUDINARY)
    private readonly cloudinary: typeof Cloudinary,
  ) {}

    async uploadSingle(
        file: Express.Multer.File,
        folder: string = 'uploads',
    ): Promise<UploadApiResponse> {
        return new Promise((resolve, reject) => {
            const upload = this.cloudinary.uploader.upload_stream(
                {
                    folder,
                    resource_type: 'auto',
                },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result!);
                },
            );

            const stream = Readable.from(file.buffer);
            stream.pipe(upload);
        });
    }

    async deleteFile(publicId: string) {
        return this.cloudinary.uploader.destroy(publicId);
    }
    
    async uploadMulti(
        files: Express.Multer.File[],
        folder: string = 'uploads'
    ): Promise<UploadApiResponse[]> {
        const results = await Promise.all(
            files.map((file) => this.uploadSingle(file, folder))
        )
        return results
    }
}

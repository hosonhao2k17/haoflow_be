import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { UploadRdo } from './rdo/upload.rdo';
import { ApiEndpoint } from 'src/decorators/http.decorator';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post()
  @ApiEndpoint({ responseType: UploadRdo, isMultipart: true })
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  upload(@UploadedFile() file: Express.Multer.File): Promise<UploadRdo> {
    return this.uploadsService.upload(file)
  }

  @Post('multi')
  @ApiEndpoint({ responseType: UploadRdo, isMultipart: true })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @UseInterceptors(FilesInterceptor('files'))
  uploadMulti(@UploadedFiles() files: Express.Multer.File[]): Promise<UploadRdo[]> {
    return this.uploadsService.uploadMulti(files)
  }
}

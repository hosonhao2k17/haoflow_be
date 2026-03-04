import { Injectable } from '@nestjs/common';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReceiptEntity } from './entities/receipt.entity';
import { Repository } from 'typeorm';
import { AiService } from '../ai/ai.service';
import { classToTypeString } from 'src/utils/handle-object';
import { ReceiptRdo } from './rdo/receipt.rdo';
import { ReceiptStatus } from 'src/common/constants/app.constant';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ReceiptsService {

  constructor(
    @InjectRepository(ReceiptEntity) private receiptsRepository: Repository<ReceiptEntity>,
    private aiService: AiService
  ) {}

  async create(createReceiptDto: CreateReceiptDto) {
    const {imageUrl} = createReceiptDto;
    
    const dataImage = await this.aiService.handleImage(imageUrl);
    const data = await this.aiService.generateAiContent({
      module: "receipts",
      message: `Phân tích hóa đơn và trả về dữ liệu theo dạng bên dưới nếu có 2 hóa đơn trả về mảng và dự liệu data image`,
      typeString: classToTypeString({
        imageUrl: "",
        ocrRawText: "",
        parsedAmount: 0,
        parsedMerchant: "",
        parsedDate: new Date(),
        status: ReceiptStatus.PENDING
      }),
      data: dataImage
    })
    const json = this.aiService.extractJson<ReceiptRdo>(data);
    const receipt = await this.receiptsRepository.create(json.data).save()
    return plainToInstance(ReceiptRdo, receipt)
  }

  findAll() {
    return `This action returns all receipts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} receipt`;
  }

  update(id: number, updateReceiptDto: UpdateReceiptDto) {
    return `This action updates a #${id} receipt`;
  }

  remove(id: number) {
    return `This action removes a #${id} receipt`;
  }
}

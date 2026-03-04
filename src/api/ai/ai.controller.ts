import { Body, Controller, Post } from "@nestjs/common";
import { AiService } from "./ai.service";
import { TestDto } from "./dto/test.dto";
import { ApiBearerAuth } from "@nestjs/swagger";


@Controller()
export class AiController {

    constructor(private aiService: AiService) {}

    @Post()
    @ApiBearerAuth()
    test(@Body() dto: TestDto) {
        return this.aiService.handleImage(dto.imageUrl)
    }
}
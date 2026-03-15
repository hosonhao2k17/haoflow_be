import { Body, Controller, Post } from "@nestjs/common";
import { AiService } from "./ai.service";
import { TestDto } from "./dto/test.dto";
import { ApiEndpoint } from 'src/decorators/http.decorator';

@Controller()
export class AiController {

    constructor(private aiService: AiService) {}

    @Post()
    @ApiEndpoint()
    test(@Body() dto: TestDto) {
        return this.aiService.handleImage(dto.imageUrl)
    }
}
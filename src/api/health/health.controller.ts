import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HealthCheckService, HttpHealthIndicator, HealthCheck, TypeOrmHealthIndicator, MemoryHealthIndicator } from '@nestjs/terminus';
import { ApiEndpoint } from 'src/decorators/http.decorator';

@Controller('health')
export class HealthController {

    constructor(
        private health: HealthCheckService,
        private http: HttpHealthIndicator,
        private configService: ConfigService,
        private typeOrm: TypeOrmHealthIndicator,
        private memory: MemoryHealthIndicator
    ) {
        
    } 

    @Get()
    @ApiEndpoint({
        isPublic: true
    })
    @HealthCheck()
    check() {
        return this.health.check([
            () => this.typeOrm.pingCheck('database'),
            () => this.memory.checkHeap('memory_heap',300 * 1024 * 1024)
        ])
    }
}

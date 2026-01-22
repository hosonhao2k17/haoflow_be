import KeyvRedis, { Keyv } from '@keyv/redis';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheableMemory } from 'cacheable';
import { RoleEntity } from './api/roles/entities/role.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        entities: [RoleEntity],
        synchronize: true
      }),
      inject: [ConfigService],
    }),
    CacheModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: [
          new Keyv({
            store: new CacheableMemory({ttl: 60000, lruSize: 5000}),
          }),
          new KeyvRedis(configService.get<string>('REDIS_URL')),
        ]
      })
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

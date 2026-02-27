import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { RolesModule } from '../roles/roles.module';
import { SessionEntity } from './entities/session.entity';
import { VerifyEntity } from './entities/verify.entity';
import { ProviderEntity } from './entities/provider.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, SessionEntity, VerifyEntity, ProviderEntity]),
    RolesModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}

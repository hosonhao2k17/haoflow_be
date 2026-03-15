import KeyvRedis, { Keyv } from '@keyv/redis';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheableMemory } from 'cacheable';
import { RoleEntity } from './api/roles/entities/role.entity';
import { RolesModule } from './api/roles/roles.module';
import { PermissionEntity } from './api/roles/entities/permission.entity';
import { AcceptLanguageResolver, HeaderResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { join } from 'path';
import { UsersModule } from './api/users/users.module';
import { UserEntity } from './api/users/entities/user.entity';
import { AuthModule } from './api/auth/auth.module';
import { MailModule } from './mail/mail.module';
import { SessionEntity } from './api/users/entities/session.entity';
import { TasksModule } from './api/tasks/tasks.module';
import { TaskEntity } from './api/tasks/entities/task.entity';
import { TaskCategoriesModule } from './api/task-categories/task-categories.module';
import { TaskCategoryEntity } from './api/task-categories/entities/task-category.entity';
import { DailyPlansModule } from './api/daily-plans/daily-plans.module';
import { DailyPlanEntity } from './api/daily-plans/entities/daily-plan.entity';
import { TimeBlockEntity } from './api/daily-plans/entities/time-block.entity';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { UploadsModule } from './api/uploads/uploads.module';
import { VerifyEntity } from './api/users/entities/verify.entity';
import { AiModule } from './api/ai/ai.module';
import { ProviderEntity } from './api/users/entities/provider.entity';
import { AccountsModule } from './api/accounts/accounts.module';
import { AccountEntity } from './api/accounts/entities/account.entity';
import { TransactionCategoriesModule } from './api/transaction-categories/transaction-categories.module';
import { TransactionCategoryEntity } from './api/transaction-categories/entities/transaction-category.entity';
import { TransactionsModule } from './api/transactions/transactions.module';
import { TransactionEntity } from './api/transactions/entities/transaction.entity';
import { BudgetsModule } from './api/budgets/budgets.module';
import { BudgetEntity } from './api/budgets/entities/budget.entity';
import { ReceiptEntity } from './api/transactions/entities/receipt.entity';
import { NotificationsModule } from './api/notifications/notifications.module';
import { NotificationEntity } from './api/notifications/entities/notification.entity';
import { BullModule } from '@nestjs/bullmq';
import { GatewayModule } from './gateway/gateway.module';
import { AiAgentModule } from './api/ai-agent/ai-agent.module';
import { ScheduleModule } from '@nestjs/schedule';
import { HealthModule } from './api/health/health.module';


@Module({
  imports: [
    RolesModule,
    UsersModule,
    AuthModule,
    TasksModule,
    TaskCategoriesModule,
    DailyPlansModule,
    UploadsModule,
    AiModule,
    AccountsModule,
    TransactionCategoriesModule,
    TransactionsModule,
    BudgetsModule,
    NotificationsModule,
    AiAgentModule,
    HealthModule,
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
        entities: [
          RoleEntity, 
          PermissionEntity, 
          RoleEntity, 
          UserEntity, 
          SessionEntity, 
          TaskEntity, 
          TaskCategoryEntity, 
          DailyPlanEntity, 
          TimeBlockEntity, 
          VerifyEntity, 
          ProviderEntity,
          AccountEntity,
          TransactionCategoryEntity,
          TransactionEntity,
          BudgetEntity,
          ReceiptEntity,
          NotificationEntity
        ],
        synchronize: true
      }),
      inject: [ConfigService],
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        stores: [
          new Keyv({
            store: new CacheableMemory({ttl: 60000, lruSize: 5000}),
          }),
          new KeyvRedis(configService.get<string>('REDIS_URL')),
        ],
      })
    }),
    I18nModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        fallbackLanguage: configService.getOrThrow('FALLBACK_LANGUAGE'),
        loaderOptions: {
          path: join(__dirname,'/i18n/'),
          watch: true
        }
        
      }),
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
        new HeaderResolver(['x-lang']),
      ]
      
    }),
    MailModule,
    CloudinaryModule,
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        connection: {
          url: configService.getOrThrow<string>('REDIS_URL')
        },
      }),
    }),
    GatewayModule,
    ScheduleModule.forRoot()
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

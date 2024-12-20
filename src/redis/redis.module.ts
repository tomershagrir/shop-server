// src/redis/redis.module.ts
import { Module, DynamicModule, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisService } from './redis.service';
import {RedisModuleOptions} from "../redis/redis.interface";

@Global()
@Module({})
export class RedisModule {
    static forRoot(options?: RedisModuleOptions): DynamicModule {
        return {
            module: RedisModule,

            providers: [
                RedisService,
            ],
            exports: [RedisService],
        };
    }
}

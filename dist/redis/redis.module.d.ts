import { DynamicModule } from '@nestjs/common';
import { RedisModuleOptions } from "../redis/redis.interface";
export declare class RedisModule {
    static forRoot(options?: RedisModuleOptions): DynamicModule;
}

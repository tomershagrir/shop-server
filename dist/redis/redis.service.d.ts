import { OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';
export declare class RedisService implements OnModuleDestroy {
    private readonly redis;
    constructor();
    onModuleDestroy(): Promise<void>;
    getClient(): Redis;
}

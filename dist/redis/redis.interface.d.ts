export interface RedisModuleOptions {
    host: string;
    port: number;
    password?: string;
    ttl?: number;
    maxItems?: number;
}

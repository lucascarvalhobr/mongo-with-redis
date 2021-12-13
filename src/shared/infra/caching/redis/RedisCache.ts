import { createClient } from "redis";

export class RedisCache {
  _client: any;

  constructor() {
    //Default connecting to port 6379
    this._client = createClient();

    //Otherwise, do as follow:
    // redis[s]://[[username][:password]@][host][:port][/db-number]
    // createClient({
    //   url: 'redis://alice:foobared@awesome.redis.server:6380'
    // });

    this._client.on("error", (err: any) =>
      console.log("Redis Client Error", err)
    );
  }

  async connect(): Promise<any> {
    await this._client.connect();
  }

  async get(key: string): Promise<any> {
    const result = await this._client.get(key);

    return result || null;
  }

  async set(key: string, value: any, ttl: number): Promise<any> {
    if (ttl === 0) return;

    await this._client.set(key, this.encodeData(value));
    await this._client.expire(key, ttl);
  }

  async persist(key) {
    return await this._client.persist(key);
  }

  async del(key: string): Promise<any> {
    return await this._client.del(key);
  }

  async flushAll(): Promise<any> {
    return await this._client.flushAll();
  }

  encodeData(data: any) {
    if (typeof data === "object") {
      return JSON.stringify(data);
    }

    return data;
  }
}

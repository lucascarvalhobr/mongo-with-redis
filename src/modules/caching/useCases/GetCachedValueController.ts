import { Request, Response } from "express";
import "reflect-metadata";
import { RedisCache } from "../../../shared/infra/caching/redis/RedisCache";

class GetCachedValueController {
  constructor(private redisCache) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { key } = request.query;
    const value = await this.redisCache.resolve(RedisCache).get(key);
    return response.status(200).json(value);
  }
}

export { GetCachedValueController };


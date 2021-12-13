import { Request, Response } from "express";
import "reflect-metadata";
import { RedisCache } from "../../../shared/infra/caching/redis/RedisCache";

class DeleteCachedValueController {
  constructor(private redisCache) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { key } = request.query;
    await this.redisCache.resolve(RedisCache).del(key);
    return response.status(200).json({ info: `Key ${key} has been deleted!` });
  }
}

export { DeleteCachedValueController };


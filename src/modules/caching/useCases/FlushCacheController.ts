import { Request, Response } from "express";
import "reflect-metadata";

class FlushCacheController {
  constructor(private redisCache) {}

  async handle(request: Request, response: Response): Promise<Response> {

    await this.redisCache.flushAll();

    return response.status(200).json({ info: `Flush has been executed!` });
  }
}

export { FlushCacheController };


import { Request, Response } from "express";
import "reflect-metadata";

class AddValueToCacheController {
  constructor(private redisCache) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { key, value, ttl } = request.query;

    await this.redisCache.set(key, value, ttl);
    return response.status(201).json({ info: "Saved!" });
  }
}

export { AddValueToCacheController };


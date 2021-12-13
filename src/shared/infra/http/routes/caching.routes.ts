import { Router } from "express";
import { AddValueToCacheController } from "../../../../modules/caching/useCases/AddValueToCacheController";
import { DeleteCachedValueController } from "../../../../modules/caching/useCases/DeleteCachedValueController";
import { FlushCacheController } from "../../../../modules/caching/useCases/FlushCacheController";
import { GetCachedValueController } from "../../../../modules/caching/useCases/GetCachedValueController";
import { RedisCache } from "../../caching/redis/RedisCache";

const cachingRoutes = Router();

const addValueToCacheController = new AddValueToCacheController(new RedisCache());
const getCachedValueController = new GetCachedValueController(new RedisCache());
const deleteCachedValueController = new DeleteCachedValueController(new RedisCache());
const flushCacheController = new FlushCacheController(new RedisCache());

cachingRoutes.post("/", addValueToCacheController.handle);
cachingRoutes.get("/", getCachedValueController.handle);
cachingRoutes.delete("/", deleteCachedValueController.handle);
cachingRoutes.patch("/", flushCacheController.handle);

export { cachingRoutes };

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cachingRoutes = void 0;
const express_1 = require("express");
const AddValueToCacheController_1 = require("../../../../modules/caching/useCases/AddValueToCacheController");
const DeleteCachedValueController_1 = require("../../../../modules/caching/useCases/DeleteCachedValueController");
const FlushCacheController_1 = require("../../../../modules/caching/useCases/FlushCacheController");
const GetCachedValueController_1 = require("../../../../modules/caching/useCases/GetCachedValueController");
const RedisCache_1 = require("../../caching/redis/RedisCache");
const cachingRoutes = (0, express_1.Router)();
exports.cachingRoutes = cachingRoutes;
const addValueToCacheController = new AddValueToCacheController_1.AddValueToCacheController(new RedisCache_1.RedisCache());
const getCachedValueController = new GetCachedValueController_1.GetCachedValueController(new RedisCache_1.RedisCache());
const deleteCachedValueController = new DeleteCachedValueController_1.DeleteCachedValueController(new RedisCache_1.RedisCache());
const flushCacheController = new FlushCacheController_1.FlushCacheController(new RedisCache_1.RedisCache());
cachingRoutes.post("/", addValueToCacheController.handle);
cachingRoutes.get("/", getCachedValueController.handle);
cachingRoutes.delete("/", deleteCachedValueController.handle);
cachingRoutes.patch("/", flushCacheController.handle);
//# sourceMappingURL=caching.routes.js.map
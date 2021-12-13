"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const awilix_1 = require("awilix");
const GetCachedValueController_1 = require("../../modules/caching/useCases/GetCachedValueController");
const RedisCache_1 = require("../infra/caching/redis/RedisCache");
const awilixContainer = (0, awilix_1.createContainer)({
    injectionMode: awilix_1.InjectionMode.CLASSIC,
});
awilixContainer.register({
    redisCache: (0, awilix_1.asClass)(RedisCache_1.RedisCache).singleton(),
    getCachedValueController: (0, awilix_1.asClass)(GetCachedValueController_1.GetCachedValueController).singleton(),
});
//# sourceMappingURL=index.js.map
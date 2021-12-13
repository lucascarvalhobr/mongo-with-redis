"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCachedValueController = void 0;
require("reflect-metadata");
const RedisCache_1 = require("../../../shared/infra/caching/redis/RedisCache");
class DeleteCachedValueController {
    constructor(redisCache) {
        this.redisCache = redisCache;
    }
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { key } = request.query;
            yield this.redisCache.resolve(RedisCache_1.RedisCache).del(key);
            return response.status(200).json({ info: `Key ${key} has been deleted!` });
        });
    }
}
exports.DeleteCachedValueController = DeleteCachedValueController;
//# sourceMappingURL=DeleteCachedValueController.js.map
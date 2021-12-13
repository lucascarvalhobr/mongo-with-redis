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
exports.AddValueToCacheController = void 0;
require("reflect-metadata");
class AddValueToCacheController {
    constructor(redisCache) {
        this.redisCache = redisCache;
    }
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { key, value, ttl } = request.query;
            yield this.redisCache.set(key, value, ttl);
            return response.status(201).json({ info: "Saved!" });
        });
    }
}
exports.AddValueToCacheController = AddValueToCacheController;
//# sourceMappingURL=AddValueToCacheController.js.map
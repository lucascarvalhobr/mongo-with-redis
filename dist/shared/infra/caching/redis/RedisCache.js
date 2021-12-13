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
exports.RedisCache = void 0;
const redis_1 = require("redis");
class RedisCache {
    constructor() {
        //Default connecting to port 6379
        this._client = (0, redis_1.createClient)();
        //Otherwise, do as follow:
        // redis[s]://[[username][:password]@][host][:port][/db-number]
        // createClient({
        //   url: 'redis://alice:foobared@awesome.redis.server:6380'
        // });
        this._client.on("error", (err) => console.log("Redis Client Error", err));
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._client.connect();
        });
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._client.get(key);
            return result || null;
        });
    }
    set(key, value, ttl) {
        return __awaiter(this, void 0, void 0, function* () {
            if (ttl === 0)
                return;
            yield this._client.set(key, this.encodeData(value));
            yield this._client.expire(key, ttl);
        });
    }
    persist(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._client.persist(key);
        });
    }
    del(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._client.del(key);
        });
    }
    flushAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._client.flushAll();
        });
    }
    encodeData(data) {
        if (typeof data === "object") {
            return JSON.stringify(data);
        }
        return data;
    }
}
exports.RedisCache = RedisCache;
//# sourceMappingURL=RedisCache.js.map
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
exports.startMongooseCaching = void 0;
const mongoose = require("mongoose");
const redis = require("redis");
function startMongooseCaching() {
    mongoose.Query.prototype["cache"] = function (options) {
        return setCacheOptions(options, this);
    };
    mongoose.Query.prototype.exec = function () {
        return __awaiter(this, void 0, void 0, function* () {
            return yield onExec(this);
        });
    };
}
exports.startMongooseCaching = startMongooseCaching;
function setRedisClient() {
    return redis.createClient({ url: "localhost:6379" });
}
function setCacheOptions(options, cacheScope) {
    cacheScope.useCache = true;
    cacheScope.expire = options.expire;
    cacheScope.hashKey = JSON.stringify(options.key || cacheScope.mongooseCollection.name);
    return this;
}
function onExec(execScope) {
    return __awaiter(this, void 0, void 0, function* () {
        const redisClient = setRedisClient();
        if (!execScope.useCache) {
            return yield mongoose.Query.prototype.exec.apply(this);
        }
        const key = JSON.stringify(Object.assign(Object.assign({}, execScope.getQuery()), { collection: execScope.mongooseCollection.name }));
        const cacheValue = yield redisClient.get(execScope.hashKey, key);
        if (!cacheValue) {
            const result = yield mongoose.Query.prototype.exec.apply(this);
            redisClient.set(execScope.hashKey, key, JSON.stringify(result));
            redisClient.expire(execScope.hashKey, execScope.expire);
            return result;
        }
        const doc = JSON.parse(cacheValue);
        return Array.isArray(doc)
            ? doc.map((d) => new execScope.model(d))
            : new execScope.model(doc);
    });
}
//# sourceMappingURL=MongooseCaching.js.map
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
const mongoose = require("mongoose");
const redis = require("redis");
const client = redis.createClient({ url: "localhost:6379" });
// create reference for .exec
const exec = mongoose.Query.prototype.exec;
// create new cache function on prototype
mongoose.Query.prototype["cache"] = function (options) {
    this.useCache = true;
    this.expire = options.expire;
    this.hashKey = JSON.stringify(options.key || this.mongooseCollection.name);
    return this;
};
// override exec function to first check cache for data
mongoose.Query.prototype.exec = function () {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.useCache) {
            return yield exec.apply(this);
        }
        const key = JSON.stringify(Object.assign(Object.assign({}, this.getQuery()), { collection: this.mongooseCollection.name }));
        // get cached value from redis
        const cacheValue = yield client.get(this.hashKey, key);
        // if cache value is not found, fetch data from mongodb and cache it
        if (!cacheValue) {
            const result = yield exec.apply(this);
            client.set(this.hashKey, key, JSON.stringify(result));
            client.expire(this.hashKey, this.expire);
            console.log("Return data from MongoDB");
            return result;
        }
        // return found cachedValue
        const doc = JSON.parse(cacheValue);
        console.log("Return data from Redis");
        return Array.isArray(doc)
            ? doc.map((d) => new this.model(d))
            : new this.model(doc);
    });
};
module.exports = {
    clearHash(hashKey) {
        client.del(JSON.stringify(hashKey));
    },
};
//# sourceMappingURL=Redis.js.map
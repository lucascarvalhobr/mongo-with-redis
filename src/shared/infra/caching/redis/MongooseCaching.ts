import mongoose = require("mongoose");
import redis = require("redis");

type CacheOptions = {
  key: string;
  expire: number;
};

export function startMongooseCaching() {
  mongoose.Query.prototype["cache"] = function (options: CacheOptions): any {
    return setCacheOptions(options, this);
  };

  mongoose.Query.prototype.exec = async function (): Promise<any> {
    return await onExec(this);
  };
}

function setRedisClient() {
  return redis.createClient({ url: "localhost:6379" });
}

function setCacheOptions(options: CacheOptions, cacheScope: any) {
  cacheScope.useCache = true;
  cacheScope.expire = options.expire;

  cacheScope.hashKey = JSON.stringify(
    options.key || cacheScope.mongooseCollection.name
  );

  return this;
}

async function onExec(execScope: any): Promise<any> {
  const redisClient = setRedisClient();

  if (!execScope.useCache) {
    return await mongoose.Query.prototype.exec.apply(this);
  }

  const key = JSON.stringify({
    ...execScope.getQuery(),
    collection: execScope.mongooseCollection.name,
  });

  const cacheValue = await redisClient.get(execScope.hashKey, key);

  if (!cacheValue) {
    const result = await mongoose.Query.prototype.exec.apply(this);
    redisClient.set(execScope.hashKey, key, JSON.stringify(result));
    redisClient.expire(execScope.hashKey, execScope.expire);

    return result;
  }

  const doc = JSON.parse(cacheValue);

  return Array.isArray(doc)
    ? doc.map((d) => new execScope.model(d))
    : new execScope.model(doc);
}

import {
  asClass, createContainer,
  InjectionMode
} from "awilix";
import { GetCachedValueController } from "../../modules/caching/useCases/GetCachedValueController";
import { RedisCache } from "../infra/caching/redis/RedisCache";

const awilixContainer = createContainer({
  injectionMode: InjectionMode.CLASSIC,
});

awilixContainer.register({
  redisCache: asClass(RedisCache).singleton(),
  getCachedValueController: asClass(GetCachedValueController).singleton(),
});

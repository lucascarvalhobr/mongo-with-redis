"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const awilix_1 = require("awilix");
const RedisCache_1 = require("../infra/caching/redis/RedisCache");
class DIContainer {
    constructor() {
        this.awilixContainer = (0, awilix_1.createContainer)({
            injectionMode: awilix_1.InjectionMode.CLASSIC,
        });
        this.awilixContainer.register({
            RedisCache: (0, awilix_1.asClass)(RedisCache_1.RedisCache).singleton(),
        });
    }
    static getInstance() {
        if (this._instance) {
            return this._instance;
        }
        this._instance = new DIContainer();
        return this._instance;
    }
    resolve(Type) {
        return this.awilixContainer.resolve(Type.name);
    }
}
const container = DIContainer.getInstance();
exports.container = container;
//# sourceMappingURL=container.js.map
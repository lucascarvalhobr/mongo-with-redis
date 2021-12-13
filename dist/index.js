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
const DIContainer_1 = require("./shared/DI/DIContainer");
const RedisCache_1 = require("./shared/infra/caching/redis/RedisCache");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const redis = DIContainer_1.container.resolve(RedisCache_1.RedisCache);
    yield redis.connect();
    yield redis.set("key", "value");
    const value = yield redis.get("key");
    // startMongooseCaching();
    // const db = await mongoose.connect("mongodb://localhost:27017", {
    //   dbName: "testes",
    // });
    //Creating Schema
    // const peopleSchema = new db.Schema({
    //   id: String,
    //   first_name: String,
    //   last_name: String,
    //   email: String,
    //   gender: String,
    //   ip_address: String,
    // });
    //Creating Model
    // const Pessoa = db.model("Pessoa", peopleSchema);
    // const lucas = new Pessoa({
    //   first_name: "Lucas",
    //   last_name: "Carvalho",
    //   email: "lucascarvalho34@gmail.com",
    //   gender: "male",
    //   ip_address: "127.0.0.1",
    // });
    // console.log(await findOne(Pessoa));
    // console.log(await all(Pessoa));
    // console.log(lucas);
    // await lucas.save();
}))();
// async function findOne(Pessoa: mongoose.Model<any, {}, {}, {}>): Promise<any> {
//   return await Pessoa.findOne({ first_name: "Lucas" }).exec();
// }
// async function all(Pessoa: mongoose.Model<any, {}, {}, {}>): Promise<any> {
//   return await Pessoa.find({}).exec();
// }
//# sourceMappingURL=index.js.map
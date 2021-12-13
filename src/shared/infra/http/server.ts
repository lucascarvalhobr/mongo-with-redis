import express from "express";
import "../../../shared/DI/index";
import { router } from "./routes";

const app = express();

app.use(express.json());

app.use(router);

app.listen(3333, () => {
  console.log("Server is running");
});

(async () => {
  // const redis = container.resolve(RedisCache);
  // await redis.connect();
})();

// const redis = container.resolve(RedisCache);
// await redis.connect();
// await redis.set("key", "value");
// const value = await redis.get("key");
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

// async function findOne(Pessoa: mongoose.Model<any, {}, {}, {}>): Promise<any> {
//   return await Pessoa.findOne({ first_name: "Lucas" }).exec();
// }

// async function all(Pessoa: mongoose.Model<any, {}, {}, {}>): Promise<any> {
//   return await Pessoa.find({}).exec();
// }

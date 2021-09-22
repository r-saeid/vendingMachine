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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
const mongo = config_1.default.mongoDB;
const connectionString = `mongodb://${mongo.host}:${mongo.port}/${mongo.database}`;
class MongooseConnect {
    static connection() {
        return __awaiter(this, void 0, void 0, function* () {
            yield mongoose_1.default
                .connect(connectionString, {
                user: mongo.username,
                pass: mongo.pasword,
                useNewUrlParser: true,
                // poolSize: 5,
                authSource: "admin",
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false,
            })
                .then(() => {
                console.log(`******************* mongo is connected *****************`);
            })
                .catch((err) => {
                console.error("*****************   Mongo not connected");
                console.log(err);
            });
        });
    }
}
exports.default = MongooseConnect;
// export const mongoogeConnect: MongooseConnect = new MongooseConnect();
// /*DB Status*/
// const dbConnection = mongoose.connection;
// dbConnection.on('error', function (err) {
//     console.error('!!!@@@ Mongoose Server Connection on ERROR @@@!!! %j ', err);
// });
// dbConnection.once('open', function callback() {
//     console.log('@@@ Mongoose Server Connection on OPEN @@@');
// });
// dbConnection.on('connected', function () {
//     console.log('@@@ Mongoose Server Connection ON CONNECTED @@@');
// });
// dbConnection.on('disconnected', function () {
//     console.error('!!!@@@ Mongoose Server Connection on disconnected @@@!!! ');
// });
// process.on('SIGINT', function () {
//     dbConnection.close(function () {
//         console.error('!!!!!! Terminated Application nodejs and mongoose disconnected  !!!!!! ');
//         process.exit(0);
//     });
// });

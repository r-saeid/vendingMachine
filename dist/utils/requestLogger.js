"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = void 0;
const requestLogger = (req, res, next) => {
    const startTime = new Date().getTime();
    res.on("finish", () => {
        const responseTime = new Date().getTime() - startTime;
        console.log("\x1b[36m%s\x1b[0m", `Request:  ${req.method} ${req.originalUrl} , reponse time:${responseTime} ms,  with status:${res.statusCode}`);
    });
    next();
};
exports.requestLogger = requestLogger;

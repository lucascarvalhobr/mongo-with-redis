"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const caching_routes_1 = require("./caching.routes");
const router = (0, express_1.Router)();
exports.router = router;
router.use("/caches", caching_routes_1.cachingRoutes);
//# sourceMappingURL=index.js.map
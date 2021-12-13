import { Router } from "express";
import { cachingRoutes } from "./caching.routes";

const router = Router();

router.use("/caches", cachingRoutes);

export { router };

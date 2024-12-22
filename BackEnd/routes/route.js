import express from "express";

import { getResponse } from "../controllers/AiModel/getModelResponse.js";

const router = express.Router();

router.post("/airesponse",getResponse);

export default router;



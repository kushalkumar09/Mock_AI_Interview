import express from "express";

import { getFeedback, getResponse } from "../controllers/AiModel/getModelResponse.js";
import { getInterviweDetails } from "../controllers/Interview/getInterviewDetails.js";

const router = express.Router();

router.post("/airesponse",getResponse);
router.post('/interview/:id/start/feedback',getFeedback);
router.get("/interview/:id",getInterviweDetails);

export default router;



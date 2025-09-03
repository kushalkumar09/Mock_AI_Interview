import express from "express";

import {
  getFeedback,
  getResponse,
} from "../controllers/AiModel/getModelResponse.js";
import {
  GetInterviewFeedback,
  getInterviweDetails,
} from "../controllers/Interview/getInterviewDetails.js";
import {
  userLogin,
  userSignin,
} from "../controllers/UserAuthenticartion/authentication.js";
import { jwtAuthMiddleware } from "../controllers/UserAuthenticartion/jwt.js";
import { getPreviousInterviews, updateInterviewScore } from "../controllers/Interview/getPreviousInterview.js";

const router = express.Router();

router.post("/airesponse",jwtAuthMiddleware, getResponse);

router.get("/allInterviews",jwtAuthMiddleware,getPreviousInterviews);
router.get("/interview/:id",jwtAuthMiddleware, getInterviweDetails);
router.put("/interview/:id/start/feedback",jwtAuthMiddleware, getFeedback);
router.get("/interview/:id/feedback",jwtAuthMiddleware, GetInterviewFeedback);
router.patch("/interview/:id/updateScore",jwtAuthMiddleware, updateInterviewScore);

// User Authentication
router.post("/signup", userSignin);
router.post("/login", userLogin);

export default router;

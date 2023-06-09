import { Router } from "express";
import userController from "../controllers/users";

const router = Router();

// User signup route
router.post("/signup", userController.signup);

// User signin route
router.post("/signin", userController.signin);

export default router;

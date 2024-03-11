import express from "express";
import { deleteTask, myTasks, newTask, updateTask } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", isAuthenticated , newTask);
router.get("/allTask", isAuthenticated , myTasks);
//code is added below because of the dynamic route.
router.route("/:id").put(isAuthenticated, updateTask).delete(isAuthenticated, deleteTask); 




export default router;
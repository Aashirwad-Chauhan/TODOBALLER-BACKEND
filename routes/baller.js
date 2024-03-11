import express from "express";
// import controllers from user.js for other projects
import { myProfile, newUser, userLogout, userLogin } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

//Middleware and routes
const router = express.Router();

//Old Project (Basic API and MVC STRUCTURE)
//All routes are defined and working, but for the project we don't need them.
// router.get("/all", allUser);
// router.get("/userid/ballers", staticBaller);
// router.get("/userid", userById);
// router.post("/new", newUser);
// router.get("/userid/:id", userById);
// router.put("/userid/:id", updateUser);
// router.delete("/userid/:id", deleteUser);
// router.route("/userid/:id").get(userById).put(updateUser).delete(deleteUser); //both ways can be used

//New Project (TO-DO-APP)---------------------------------------------------
router.post("/new", newUser);
router.post("/login", userLogin);
router.get("/logout", userLogout);
router.get("/profile",isAuthenticated, myProfile);


export default router;
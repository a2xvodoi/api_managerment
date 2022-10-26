import express from "express";
import AuthController from "../../controllers/api/AuthController";
import UsersController from "../../controllers/api/UsersController";
import verifyToken from '../../middleware/verifyToken';

const router = express.Router();

/* GET api listing. */
router.get("/", function (req, res, next) {
    res.send("respond with a resource api");
});

// Auth
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

// Users
router.get("/users", verifyToken, UsersController.list);
router.post("/users", verifyToken, UsersController.store);
router.put("/users/:id", verifyToken, UsersController.update);
router.delete("/users/:id", verifyToken, UsersController.destroy);

export default router;

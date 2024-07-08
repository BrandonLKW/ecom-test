const userExpress = require("express");
const userRouter = userExpress.Router();
const userController = require("../controllers/userController");

userRouter.post("/login", userController.login);
userRouter.post("/signup", userController.signup);
userRouter.post("/get/userid", userController.getUserById);

module.exports = userRouter;
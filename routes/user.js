const express = require("express");
const router = express.Router();
const userController = require('../controller/userController');
const { authentification } = require('../middlewares/decodedToken');

// router.post("/register",addUser);
// router.post("/login",login);
// router.get("/auth/_id",getAuth);
// router.get("/data",getAll);
// router.get("/personal", decodedToken, getOne);

router.post('/', userController.create);
router.post('/login', userController.login);
router.get('/', userController.readAll);
router.get('/account', authentification, userController.readMe);
router.get("/auth/_id", authentification, userController.getAuth);





module.exports = router;

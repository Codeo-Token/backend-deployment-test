const express = require("express");
const router = express.Router();
const {authentification} = require('../middlewares/decodedToken');


// Require the controllers
const newAccount = require("../controller/account.controller");

// create a new accounts

router.post("/newAccount",authentification,newAccount.new_account);

module.exports = router;
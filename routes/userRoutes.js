const express = require('express');
const { Register, Login, Logout } = require('../controllers/user');

const router = express.Router();

router.route("/signup").post(Register);
router.route("/signin").post(Login);
router.route("/signout").get(Logout);

module.exports = router;
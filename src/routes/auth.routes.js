const router = require('express').Router();
const { registerDefinition } = require("swaggiffy");

const { register, login } = require('../controller/auth.controller');
const { validateLogin, validateRegister } = require('../middleware/authValidations');

router.post("/register", validateRegister, register);

router.post("/login", validateLogin, login);

registerDefinition(router,{tags:"User", mappedSchema:"User", basePath:"/api/v1/auth"});

module.exports = router;
const router = require('express').Router();
const { registerDefinition } = require('swaggiffy');
const { registerOwner, getOwners } = require('../controller/owner.controller');
const { validateRegisterOwner } = require('../middleware/ownerValidations');
const { verifyToken } = require('../middleware/auth');

router.post('/register', validateRegisterOwner, verifyToken, registerOwner);

router.get('/', verifyToken, getOwners);

registerDefinition(router,{tags:"Vehicle Owner", mappedSchema:"VehicleOwner", basePath:"/api/v1/owner"});

module.exports = router;
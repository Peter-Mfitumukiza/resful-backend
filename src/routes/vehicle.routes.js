const router = require('express').Router();
const { registerDefinition } = require('swaggiffy');
const { registerVehicle, getVehicles, getVehiclesWithOwners, getPaginatedVehicles } = require('../controller/vehicle.controller');
const { validateRegisterVehicle } = require('../middleware/vehicleValidations');
const { verifyToken } = require('../middleware/auth');

router.post("/register", validateRegisterVehicle, verifyToken, registerVehicle);

router.get("/", verifyToken, getVehicles);

router.get("/with-owners", verifyToken, getVehiclesWithOwners);

router.get("/:page/:perPage", verifyToken, getPaginatedVehicles);

registerDefinition(router,{tags:"Vehicle", mappedSchema:"Vehicle", basePath:"/api/v1/vehicle"});

module.exports = router;
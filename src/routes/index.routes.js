const router = require('express').Router();
const authRoutes = require('./auth.routes');
const ownerRoutes = require('./owner.routes');
const vehicleRoutes = require('./vehicle.routes');

router.use('/auth', authRoutes);

router.use('/owner', ownerRoutes);

router.use('/vehicle', vehicleRoutes);


module.exports = router;
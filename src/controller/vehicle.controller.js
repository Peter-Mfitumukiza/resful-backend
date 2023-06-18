const Vehicle = require('../model/vehicle.model');
const Owner = require('../model/owner.model');

const registerVehicle = async (req, res) => {
    const data = req.body;
    const existingVehicle = await Vehicle.findOne({ plateNumber: data.plateNumber, chasisNumber: data.chasisNumber });
    if (existingVehicle) {
        return res.status(400).json({ status: 'error', message: 'Vehicle already exists' });
    }
    const vehicleOwner = await Owner.findOne({nationalId: data.ownerNationalId})
    if(!vehicleOwner) {
        return res.status(400).json({ status: 'error', message: 'Vehicle Owner Not Yet Registered' });
    }
    const vehicle = new Vehicle(data);
    await vehicle.save();
    return res.status(200).json({ status: 'success', message: 'Vehicle registered successfully' });
}

const getVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find({});
        return res.status(200).json({ status: 'success', data: vehicles });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
}

const getPaginatedVehicles = async (req, res) => {
    try {
        const page = parseInt(req.params.page) || 1;
        const perPage = parseInt(req.params.perPage) || 10;
        const count = await Vehicle.countDocuments();
        if (count === 0) {
            res.status(404).json({
                success: false,
                status: 404,
                message: "No vehicles found"
            });
            return;
        }

        const totalPages = Math.ceil(count / perPage);
        if (page > totalPages) {
            res.status(400).json({
                success: false,
                status: 400,
                message: `Page ${page} does not exist`
            });
            return;
        }

        const vehicles = await Vehicle.find()
            .skip((page - 1) * perPage)
            .limit(perPage)

        return res.status(200).json({
            success: true,
            status: 200,
            message: "Vehicles retrieved successfully",
            data: {
                vehicles,
                currentPage: page,
                totalPages
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }

}

const getVehiclesWithOwners = async (req, res) => {
    try {
        const vehicles = await Vehicle.aggregate([
            {
              $lookup: {
                from: 'vehicleowners', // The name of the owners collection
                localField: 'ownerNationalId',
                foreignField: 'nationalId',
                as: 'ownerDetails'
              }
            },
            {
              $project: {
                chasisNumber: 1,
                manufacturer: 1,
                manufactureYear: 1,
                price: 1,
                plateNumber: 1,
                modelName: 1,
                'ownerDetails.fullname': 1,
                'ownerDetails.nationalId': 1
              }
            }
          ]);
        return res.status(200).json({ status:'success', data: vehicles });
    } catch (error) {
        return res.status(500).json({ status:'error', message: error.message });
    }
}

module.exports = {
    registerVehicle,
    getVehicles,
    getPaginatedVehicles,
    getVehiclesWithOwners
}
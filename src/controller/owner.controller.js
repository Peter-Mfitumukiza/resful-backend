const Owner = require('../model/owner.model');

const registerOwner = async (req,res) =>{
    const data = await req.body;
    const existingOwner = await Owner.findOne({ nationalId: data.nationalId });
    if(existingOwner){
        return res.status(400).json({ status: "error", message: 'Owner already exists' });
    }
    const newOwner = await Owner.create({...data});
    await newOwner.save();
    return res.status(201).json({ status: "success", message: 'Owner registered successfully' });
}

const getOwners = async (req,res) => {
    const owners = await Owner.find({});
    return res.status(200).json({ status: "success", data: owners });
}

module.exports = {
    registerOwner,
    getOwners
}
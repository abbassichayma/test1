const roleSchema = require('../models/role.model')


exports.addrole = async(req,res)=>{
    const {roleName} = req.body;
    try {
     const roleExist = await roleSchema.findOne({roleName:roleName});
     if(roleExist){
        return res.status(400).send({msg:'role already exist !!! '})
     }
     const newrole = new roleSchema(req.body)
     await newrole.save()
     return res.status(201).send({msg:'role added to role collection'})
    } catch (error) {
        return res.status(500).send({error:error})
    }
}

exports.getAllrole = async(req,res)=>{
    try {
     const roles = await roleSchema.find();
     if(!roles){
        return res.status(400).send({msg:'role collection is empty !!! '})
     }
     return res.status(201).send({roles})
    } catch (error) {
        return res.status(500).send({error:error})
    }
}

exports.getOnerole = async(req,res)=>{
    const {id} = req.params
    try {
     const role = await roleSchema.findById(id);
     if(!role){
        return res.status(400).send({msg:'role not exist!!! '})
     }
     return res.status(201).send({role})
    } catch (error) {
        return res.status(500).send({error:error})
    }
}

exports.updateOnerole = async(req,res)=>{
    const {id} = req.params
    try {
     const updaterole = await roleSchema.findByIdAndUpdate(id,{$set:{...req.body}});
     if(!updaterole){
        return res.status(400).send({msg:'role not exist!!! '})
     }
     return res.status(201).send({msg:'role updated successfully',updaterole})
    } catch (error) {
        return res.status(500).send({error:error})
    }
}

exports.deleteOnerole = async(req,res)=>{
    const {id} = req.params
    try {
     const deleterole = await roleSchema.findByIdAndRemove(id);
     if(!deleterole){
        return res.status(400).send({msg:'role not exist!!! '})
     }
     return res.status(201).send({msg:'role deleted '})
    } catch (error) {
        return res.status(500).send({error:error})
    }
}

exports.deleteAllrole = async(req,res)=>{
    try {
     const deleteroles = await roleSchema.remove();
     if(!deleteroles){
        return res.status(400).send({msg:'role collection is empty !!! '})
     }
     return res.status(201).send({msg:'Now,role collection is empty'})
    } catch (error) {
        return res.status(500).send({msg:error})
    }
}

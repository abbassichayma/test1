const userSchema = require('../models/user.model')
const roleSchema = require('../models/role.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


exports.addUser = async(req,res)=>{
    const {email,password,role} = req.body;
    try {
     const userExist = await userSchema.findOne({email:email});
     if(userExist){
        return res.status(400).send({msg:'user already exist !!! '})
     }
     const newUser = new userSchema(req.body)
     const passwordHashed = bcrypt.hashSync(password,11)
     newUser.password = passwordHashed
     const userRole = await roleSchema.findOne({roleName:'user'})
     newUser.role = userRole._id
     const token = jwt.sign({id:newUser._id},process.env.passwordToken)
     await newUser.save()
     return res.status(200).send({msg:'user added to user collection',token})
    } catch (error) {
        return res.status(500).send({msg:error})
    }
}

exports.login = async(req,res)=>{
    const {emailLogin,passwordLogin} = req.body;
    try {
     const userExist = await userSchema.findOne({email:emailLogin});
     console.log(userExist)
     if(!userExist){
        return res.status(400).send({msg:'bad credentials'})
     }
     const passwordTrue = bcrypt.compareSync(passwordLogin,userExist.password)
     if(!passwordTrue){
        return res.status(400).send({msg:'bad credentials'})
     }
     
     const token = await jwt.sign({id:userExist._id},process.env.passwordToken)
     return res.status(200).send({msg:'user logged successfully',token})
    } catch (error) {
        return res.status(500).send({error:error})
    }
}


exports.getAllUser = async(req,res)=>{
    try {
     const users = await userSchema.find();
     if(!users){
        return res.status(400).send({msg:'user collection is empty !!! '})
     }
     return res.status(200).send({users})
    } catch (error) {
        return res.status(500).send({msg:error})
    }
}

exports.getOneUser = async(req,res)=>{
    const {id} = req.params
    try {
     const user = await userSchema.findById(id);
     if(!user){
        return res.status(400).send({msg:'user not exist!!! '})
     }
     return res.status(200).send({user})
    } catch (error) {
        return res.status(500).send({msg:error})
    }
}

exports.updateOneUser = async(req,res)=>{
    const {id} = req.params
    try {
     const updateUser = await userSchema.findByIdAndUpdate(id,{$set:{...req.body}});
     if(!updateUser){
        return res.status(400).send({msg:'user not exist!!! '})
     }
     return res.status(200).send({msg:'user updated successfully',updateUser})
    } catch (error) {
        return res.status(500).send({msg:error})
    }
}

exports.deleteOneUser = async(req,res)=>{
    const {id} = req.params
    try {
     const deleteUser = await userSchema.findByIdAndRemove(id);
     if(!deleteUser){
        return res.status(400).send({msg:'user not exist!!! '})
     }
     return res.status(200).send({msg:'user deleted '})
    } catch (error) {
        return res.status(500).send({msg:error})
    }
}

exports.deleteAllUser = async(req,res)=>{
    try {
     const deleteUsers = await userSchema.remove();
     if(!deleteUsers){
        return res.status(400).send({msg:'user collection is empty !!! '})
     }
     return res.status(200).send({msg:'Now,user collection is empty'})
    } catch (error) {
        return res.status(500).send({msg:error})
    }
}




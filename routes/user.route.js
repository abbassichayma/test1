const { addUser,getAllUser,getOneUser,updateOneUser,deleteOneUser,deleteAllUser,login} = require('../controllers/user.controller')

const express = require('express');
const { LoginValidation, validation, RegistreValidation } = require('../middleweares/validation');
const { isAuth } = require('../middleweares/isAuth');
const userRouter = express.Router()

userRouter.post('/add',RegistreValidation,validation,addUser);
userRouter.get('/current',isAuth,async(req,res)=>res.send({user:req.user}));
//tansich tforci 3la role client 'user'
userRouter.post('/login',login);
// userRouter.post('/login',LoginValidation,validation,login);
userRouter.get('/',getAllUser);
userRouter.get('/:id',getOneUser);
userRouter.put('/:id',updateOneUser);
userRouter.delete('/:id',deleteOneUser);
userRouter.delete('/',deleteAllUser);

module.exports = userRouter

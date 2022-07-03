const { addrole,getAllrole,getOnerole,updateOnerole,deleteOnerole,deleteAllrole} = require('../controllers/Role.controller')
const express = require('express')
const roleRouter = express.Router()

roleRouter.post('/add',addrole);
roleRouter.get('/',getAllrole);
roleRouter.get('/:id',getOnerole);
roleRouter.put('/:id',updateOnerole);
roleRouter.delete('/:id',deleteOnerole);
roleRouter.delete('/',deleteAllrole);

module.exports = roleRouter
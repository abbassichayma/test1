const userSchema = require('../models/user.model');
const roleSchema = require ('../models/role.model');
const bcrypt = require('bcrypt');

const initialisation = async()=>{
    try {

//     const arrRoles = await roleSchema.find()
//       for (let i=0;i< arrRoles.length;i++){
//         let el = arrRoles[i];
//           switch (el.roleName) {
//             case 'user':
//                    if(el.roleName!=='user')
//                    return await roleSchema.insertMany({roleName:'user'})
               
//              case 'admin':
//                     if(el.roleName!=='admin')
//                    return await roleSchema.insertMany({roleName:'admin'})
                
 
//             case'gestionnaire':
//                     if(el.roleName!=='gestionnaire')
//                     return await roleSchema.insertMany({roleName:'gestionnaire'})
            
    
//         default: return arrRoles
           
//     }
// }
     [{roleName:'user'},{roleName:'admin'},{roleName:'gestionnaire'}].map(async(el)=>{
     const roleExist = await roleSchema.findOne(el)
     if(!roleExist){
        await roleSchema.insertMany([el])
        console.log(`${el.roleName} added successfully to role collection`)
     }
     }) 
     const userIsAdmin = await roleSchema.findOne({roleName:'admin'})  
     const isAdmin = await userSchema.findOne({role:userIsAdmin._id})
     if(!isAdmin){
        const admin = await new userSchema({
            firstName:'admin',
            lastName:'admin',
            email:'adminadmin@gmail.com',
            password:bcrypt.hashSync('789456123',11),
            role:userIsAdmin._id
        })
        await admin.save()
        console.log('admin created')
     }
    } catch (error) {
     console.error(error)   
    }
}

module.exports = initialisation
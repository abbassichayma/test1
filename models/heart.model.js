const mongoose = require ('mongoose');

const heartSchema = new mongoose.Schema({
heartNumber:{type:Number},
user:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
article:{type:mongoose.Schema.Types.ObjectId,ref:'Article'}
},{
    timestamps:true
})
module.exports = mongoose.model('heart',heartSchema)
const mongoose = require('mongoose')


const articleSchema = new mongoose.Schema({
// id:{type:Number,unique:true},
image:{type:String,required:true},
domain:{type:String,required:true},
title:{type:String,required:true,unique:true},
description:{type:String,required:true},
details:{type:String,required:true}
},{
    timestamps:true
})

module.exports = mongoose.model('Article',articleSchema)
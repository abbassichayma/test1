const heartSchema = require('../models/heart.model')
const userSchema = require('../models/user.model')
const articleSchema = require('../models/article.model')


exports.addHeart = async (req, res) => {
    try {
      const hearts = await heartSchema
        .findOne()
        .where("user")
        .equals(req.body.user)
        .where("article")
        .equals(req.body.article);
        
        if(!hearts){
         const newHeart = new heartSchema(req.body)
         await newHeart.save();
         return res.status(200).send({msg:'heart added successfully'}) 
        }
        await heartSchema
        .findOne()
        .where("user")
        .equals(req.body.user)
        .where("article")
        .equals(req.body.article)
        .deleteOne()
        return res.status(200).send({msg:'heart deleted'})
    } catch (error) {
      return res.status(500).send({error:error}) 
    }
  }

  exports.getHearts = async (req,res) =>{
       
        try {
        const hearts = await heartSchema.find()
        return res.status(200).send({hearts})
        } catch (error) {
            return res.status(500).send({error:error})
        }
  }
const articleSchema = require('../models/article.model')


exports.addArticle = async(req,res)=>{
    const {title} = req.body;
    try {
     const articleExist = await articleSchema.findOne({title:title});
     if(articleExist){
        return res.status(400).send({msg:'article already exist !!! '})
     }
     const newarticle = new articleSchema(req.body)
     
    //  const last_id = await articleSchema.find().sort({id:-1}).limit(1)
        
    //  if(last_id){
    //     newarticle.id = last_id[0].id + 1
    //  }else{
    //     newarticle.id = 1
    //  }

     await newarticle.save()
     return res.status(200).send({msg:'article added to article collection',title})
    } catch (error) {
        return res.status(500).send({error:error})
    }
}

exports.getAllArticles = async(req,res)=>{
    const {domain} = req.params
    try {

        const articles = await articleSchema.find();
     if(articles.length==0){
        return res.status(400).send({msg:`article collection is empty !!!`})
     }
     return res.status(200).send({articles})
    } catch (error) {
        return res.status(500).send({error:error})
    }
}

exports.getAllArticles = async(req,res)=>{
    const {domain} = req.params
    try {
     const articles = await articleSchema.find({domain:domain});
     if(!articles){
        return res.status(400).send({msg:`article collection is empty !!!`})
     }
     return res.status(200).send({articles})
    } catch (error) {
        return res.status(500).send({error:error})
    }
}





exports.getOneArticle = async(req,res)=>{
    const {id} = req.params
    try {
     const article = await articleSchema.findById(id);
     if(!article){
        return res.status(400).send({msg:'article not exist!!! '})
     }
     return res.status(200).send({article})
    } catch (error) {
        return res.status(500).send({error:error})
    }
}

exports.updateOneArticle = async(req,res)=>{
    const {id} = req.params
    console.log(req.body)
    try {
     const updatearticle = await articleSchema.findByIdAndUpdate(id,{$set:{...req.body}});
     if(!updatearticle){
        return res.status(400).send({msg:'article not exist!!! '})
     }
     return res.status(200).send({msg:'article updated successfully',updatearticle})
    } catch (error) {
        return res.status(500).send({msg:error})
    }
}

exports.deleteOneArticle = async(req,res)=>{
    const {id} = req.params
    try {
     const deletearticle = await articleSchema.findByIdAndDelete(id);
     if(!deletearticle){
        return res.status(400).send({msg:'article not exist!!! '})
     }
     return res.status(200).send({msg:'article deleted '})
    } catch (error) {
        return res.status(500).send({error:error})
    }
}

exports.deleteAllArticles = async(req,res)=>{
    try {
     const deletearticles = await articleSchema.remove();
     if(!deletearticles){
        return res.status(400).send({msg:'article collection is empty !!! '})
     }
     return res.status(200).send({msg:'Now,article collection is empty'})
    } catch (error) {
        return res.status(500).send({error:error})
    }
}

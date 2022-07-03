const { addArticle,getAllArticles,getOneArticle,updateOneArticle,deleteOneArticle,deleteAllArticles} = require('../controllers/article.controller')
const express = require('express');
const { ArticleValidation, validation } = require('../middleweares/validation');

const articleRouter = express.Router()

articleRouter.post('/add',ArticleValidation,validation,addArticle);
// articleRouter.get('/:domain',getAllArticles);
articleRouter.get('/',getAllArticles);
articleRouter.get('/:id',getOneArticle);
articleRouter.put('/:id',updateOneArticle);
articleRouter.delete('/:id',deleteOneArticle);
articleRouter.delete('/',deleteAllArticles);

module.exports = articleRouter
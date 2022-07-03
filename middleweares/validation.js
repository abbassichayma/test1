const { body, validationResult } = require('express-validator');


exports.RegistreValidation = [
    body('firstName','firstName required').isString().notEmpty(),
    body('lastName','lastName required').isString().notEmpty(),
    body('email','email required and e-mail format').notEmpty().isEmail().normalizeEmail(),
    body('password','password required').isString().notEmpty().isLength({min:5})
    
]


exports.LoginValidation = [
    body('email','email required and e-mail format').notEmpty().isEmail().normalizeEmail(),
    body('password','password required').isString().notEmpty().isLength({min:5}) 
]

exports.ArticleValidation = [
    body('image','image required').isString().notEmpty(),
    // body('category','category required').isString().notEmpty(),
    body('title','title required').isString().notEmpty(),
    body('description','description required').isString().notEmpty(),
    body('details','details required').isString().notEmpty(),

]

exports.validation = async(req,res,next)=>{
   try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next()
   } catch (error) {
    return res.status(500).send({error:error})
   }
}


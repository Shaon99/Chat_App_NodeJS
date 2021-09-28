const express =require('express');
const { getLogin, login, logout,getRegister} = require('../controller/loginController');
const { addUser } = require('../controller/usersController');
const { redirectLoggedIn } = require('../middlewares/common/checkLogin');
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');
const { doLoginValidators, doLoginValidationHandler } = require('../middlewares/login/loginValidators');
const { doRegisterValidators, doRegisterValidationHandler } = require('../middlewares/login/registerValidation');

const router= express.Router();

const page_title= "Login"
//login page
router.get('/',decorateHtmlResponse(page_title),redirectLoggedIn,getLogin);

//login check
router.post('/',decorateHtmlResponse(page_title),doLoginValidators,doLoginValidationHandler,login);

//logout
router.delete("/",logout);


module.exports=router;
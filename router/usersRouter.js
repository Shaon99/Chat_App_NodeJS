const express =require('express');
const { getUsers, addUser, removeUser } = require('../controller/usersController');
const { checkLogin } = require('../middlewares/common/checkLogin');
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');
const avatarUpload = require('../middlewares/common/users/avatarUpload');
const { addUserValidators, addUserValidationHandler } = require('../middlewares/common/users/usersValidator');

const router= express.Router();

//login page
router.get('/',decorateHtmlResponse('Users'),checkLogin,getUsers);

//add user
router.post(
    "/",
    checkLogin,
    avatarUpload,
    addUserValidators,
    addUserValidationHandler,
    addUser,
  );


//remove user
  router.delete('/:id',removeUser);


module.exports=router;
const express=require("express");
const { getRegister, addNewUser } = require("../controller/registerController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const avatarUpload = require("../middlewares/common/users/avatarUpload");
const { addUserValidators, addUserValidationHandler } = require("../middlewares/common/users/usersValidator");

const router=express.Router();


const page_title="Register";

router.get('/',decorateHtmlResponse(page_title),getRegister);

router.post(
    "/",
    avatarUpload,
    addUserValidators,
    addUserValidationHandler,
    addNewUser
  );


module.exports=router;
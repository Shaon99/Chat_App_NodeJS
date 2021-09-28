const { check, validationResult } = require("express-validator");

const doRegisterValidators = [
  check("name")
    .isLength({
      min: 1,
    })
    .withMessage("Name is required"),
  check("email").isLength({ min: 1 }).withMessage("Email is required"),
];

const doRegisterValidationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.render("register", {
      data: {
        name: req.body.name,
      },
      errors: mappedErrors,
    });
  }
};

module.exports = {
  doRegisterValidators,
  doRegisterValidationHandler,
};


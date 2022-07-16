//const { Route53Resolver } = require("aws-sdk");
const express = require("express");
const { signup, signin } = require("../controller/auth");
const {
  validateSignupRequest,
  isRequestValidated,
  validateSigninRequest,
} = require("../validators/auth");
const router = express.Router();
//const User = require("../models/user");

router.post("/signup", validateSignupRequest, isRequestValidated, signup);
router.post("/signin", validateSigninRequest, isRequestValidated, signin);

// router.post("/profile", requiresingin, (req, res) => {
//   res.status(200).json({ user: "profile" });
// });
// (req, res) => {
//   User.findOne({ email: req.body.email }).exec((error, user) => {
//     if (user)
//       return res.status(400).json({
//         message: "exist",
//       });
//     const { firstname, lastname, email, password } = req.body;
//     const _user = new User({
//       firstname,
//       lastname,
//       email,
//       password,
//       username: Math.random().toString(),
//     });
//     _user.save((error, data) => {
//       if (error) {
//         return res.status(400).json({
//           message: "somethin went wrong",
//         });
//       }
//       if (data) {
//         return res.status(201).json({
//           user: data,
//         });
//       }
//     });
//   });
//});

// router.post("/signup", validateSignupRequest, isRequestValidated, signup);
// router.post("/signin", validateSigninRequest, isRequestValidated, signin);

// router.post('/profile', requireSignin, (req, res) => {
//     res.status(200).json({ user: 'profile' })
// });

module.exports = router;

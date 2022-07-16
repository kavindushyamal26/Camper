//const { Route53Resolver } = require("aws-sdk");
const express = require("express");
const { initialData } = require("../../controller/admin/initialData");
const router = express.Router();
//const User = require("../models/user");

router.post("/initialdata", initialData);

module.exports = router;

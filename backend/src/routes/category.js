const express = require("express");
const router = express.Router();
const {
  addCategory,
  getCategories,
  updateCategories,
  deleteCategories,
} = require("../controller/category");
const { requireSignin, adminMiddleware } = require("../common-middleware");
//const slugify = require("slugify");
//const Category = require("../models/category");
const shortid = require("shortid");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.post("/category/create", upload.single("categoryImage"), addCategory);
router.get("/category/getCategory", getCategories);
router.post(
  "/category/update",
  upload.array("categoryImage"),
  updateCategories
);
router.post("/category/delete", deleteCategories);

// (req, res) => {
//   const categoryObj = {
//     name: req.body.name,
//     slug: slugify(req.body.name),
//   };
//   if (req.body.parentId) {
//     categoryObj.parentId = req.body.parentId;
//   }

//   const cat = new Category(categoryObj);
//   cat.save((error, category) => {
//     if (error) return res.status(400).json({ message: "error" });
//     if (category) {
//       return res.status(201).json({ category });
//     }
//   });
// });

//requireSignin, adminMiddleware,
// const {
//   addCategory,
//   getCategories,
//   updateCategories,
//   deleteCategories,
// } = require("../controller/category");
// const {
//   requireSignin,
//   adminMiddleware,
//   superAdminMiddleware,
// } = require("../common-middleware");
// const router = express.Router();
// const shortid = require("shortid");
// const path = require("path");
// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(path.dirname(__dirname), "uploads"));
//   },
//   filename: function (req, file, cb) {
//     cb(null, shortid.generate() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });

// router.post(
//   "/category/create",
//   requireSignin,
//   superAdminMiddleware,
//   upload.single("categoryImage"),
//   addCategory
// );
// router.get("/category/getcategory", getCategories);
// router.post(
//   "/category/update",
//   requireSignin,
//   superAdminMiddleware,
//   upload.array("categoryImage"),
//   updateCategories
// );
// router.post(
//   "/category/delete",
//   requireSignin,
//   superAdminMiddleware,
//   deleteCategories
// );

module.exports = router;

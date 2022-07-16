const jwt = require("jsonwebtoken");
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");
// const multerS3 = require("multer-s3");
// const aws = require("aws-sdk");

// exports.sendEmail = (req, res, next) => {
//   var api_key = "ef542c83efd24366180a580be5472a94-e31dc3cc-d6cd98ba";
//   var domain = " sandbox7f1664ec6f0a4e309b0be06dc804e45a.mailgun.org"; //sandbox7f1664ec6f0a4e309b0be06dc804e45a.mailgun.org
//   var mailgun = require("mailgun-js")({ apiKey: api_key, domain: domain });

//   var data = {
//     from: "Camper <kavindu.shyamal4@aiesec.net>",
//     to: "kavindushyamal26@gmail.com",
//     subject: "Hello",
//     text: "Testing some Mailgun awesomeness!",
//   };

//   mailgun.messages().send(data, function (error, body) {
//     if (error) {
//       console.log("error", error);
//     }
//     console.log("Successes", body);
//   });
//   //next();
// };

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

exports.upload = multer({ storage });

// const accessKeyId = process.env.accessKeyId;
// const secretAccessKey = process.env.secretAccessKey;

// const s3 = new aws.S3({
//   accessKeyId,
//   secretAccessKey,
// });

// exports.uploadS3 = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: "flipkart-clone-app",
//     acl: "public-read",
//     metadata: function (req, file, cb) {
//       cb(null, { fieldName: file.fieldname });
//     },
//     key: function (req, file, cb) {
//       cb(null, shortid.generate() + "-" + file.originalname);
//     },
//   }),
// });

exports.requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
  } else {
    return res.status(400).json({ message: "Autherization required" });
  }
  next();
};
// exports.requireSignin = (req, res, next) => {
//   if (req.headers.authorization) {
//     const token = req.headers.authorization.split(" ")[1];
//     const user = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = user;
//   } else {
//     return res.status(400).json({ message: "Authorization required" });
//   }
//   next();
//   //jwt.decode()
// };

exports.userMiddleware = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(400).json({ message: "User access denied" });
  }
  next();
};

exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(400).json({ message: "Admin access denied" });
  }
  next();
};

// exports.superAdminMiddleware = (req, res, next) => {
//   if (req.user.role !== "super-admin") {
//     return res.status(200).json({ message: "Super Admin access denied" });
//   }
//   next();
// };

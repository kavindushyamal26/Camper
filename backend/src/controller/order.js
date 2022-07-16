const Order = require("../models/order");
const Cart = require("../models/cart");
const Address = require("../models/address");

var api_key = "ef542c83efd24366180a580be5472a94-e31dc3cc-d6cd98ba";
var domain = "sandbox7f1664ec6f0a4e309b0be06dc804e45a.mailgun.org"; //sandbox7f1664ec6f0a4e309b0be06dc804e45a.mailgun.org
var mailgun = require("mailgun-js")({
  apiKey: api_key,
  domain: domain,
});

var data = {
  from: "kavindu.shyamal4@aiesec.net",
  to: "kavindushyamal26@gmail.com",
  subject: "Camper - Order Successfully Placed",
  text: "Testing some Mailgun awesomeness!",
};

exports.addOrder = (req, res, next) => {
  Cart.deleteOne({ user: req.user._id }).exec((error, result) => {
    if (error) return res.status(400).json({ error });
    if (result) {
      req.body.user = req.user._id;
      req.body.orderStatus = [
        {
          type: "ordered",
          date: new Date(),
          isCompleted: true,
        },
        {
          type: "packed",
          isCompleted: false,
        },
        // {
        //   type: "shipped",
        //   isCompleted: false,
        // },
        {
          type: "delivered",
          isCompleted: false,
        },
        {
          type: "returned",
          isCompleted: false,
        },
      ];
      const order = new Order(req.body);
      order.save((error, order) => {
        if (error) return res.status(400).json({ error });
        if (order) {
          try {
            data.text = `Dear Customer, 

            Thank You for your order! 
            We are recived successfully your order and Your package will 
            delivered within 1 day. Your order id is: ${order._id}. 
            Your order Amount is rs. ${order.totalAmount}. 
            You Can see your order summary and order status in Orders Tab in "Camper" Web site.
            Have a happy Camping Tour.`;
            mailgun.messages().send(data, function (error, body) {
              if (error) {
                console.log("error", error);
              }
              console.log("Successes", body);
            });
          } catch (e) {
            console.log("Error", e);
          }

          res.status(201).json({ order });
        }
      });
    }
  });
};

exports.getOrders = (req, res) => {
  Order.find({ user: req.user._id })
    .select("_id paymentStatus items orderStatus")
    .populate("items.productId", "_id name productPictures")
    .exec((error, orders) => {
      if (error) return res.status(400).json({ error });
      if (orders) {
        res.status(200).json({ orders });
      }
    });
};

exports.getOrder = (req, res) => {
  //console.log("rrr", req, res);
  Order.findOne({ _id: req.body.orderId })
    .populate("items.productId", "_id name productPictures")
    .lean()
    .exec((error, order) => {
      if (error) return res.status(400).json({ error });
      if (order) {
        Address.findOne({
          user: req.user._id,
        }).exec((error, address) => {
          if (error) return res.status(400).json({ error });
          order.address = address.address.find(
            (adr) => adr._id.toString() == order.addressId.toString()
          );
          res.status(200).json({
            order,
          });
        });
      }
    });
};

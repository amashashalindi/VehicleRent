const router = require("express").Router();
const { response } = require("express");
const Client = require("../models/client.model");
let Rent = require("../models/rent.model");
const Vehicle = require("../models/vehicle.model");

//Get All Rents
router.route("/").get((req, res) => {
  var dataQuery = new Object();
  if (req.query.clientId) {
    dataQuery.clientId = req.query.clientId;
  }
  if (req.query.vehicleId) {
    dataQuery.vehicleId = req.query.vehicleId;
  }
  if (req.query.totalPrice) {
    dataQuery.totalPrice = req.query.totalPrice;
  }
  if (req.query.flag) {
    dataQuery.flag = req.query.flag;
  }
  if (req.query.requestedDate) {
    dataQuery.requestedDate = req.query.requestedDate;
  }
  if (req.query.boughtDate) {
    dataQuery.boughtDate = req.query.boughtDate;
  }
  if (req.query.deliveryDate) {
    dataQuery.deliveryDate = req.query.deliveryDate;
  }
  Rent.find(dataQuery || {})
    .populate("clientId")
    .populate("vehicleId")
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.status(400).json("Error: " + error);
    });
});

//Create a Rent
router.route("/").post((req, res) => {
  const rent = {
    clientId: req.body.clientId,
    vehicleId: req.body.vehicleId,
    totalPrice: Number(req.body.totalPrice),
    flag: Number(req.body.flag),
    boughtDate: Date.parse(req.body.boughtDate),
    deliveryDate: Date.parse(req.body.deliveryDate),
    // requestedDate: Date.parse(req.body.requestedDate),
  };

  const newRent = new Rent(rent);

  newRent
    .save()
    .then((response) => {
      res.json("Rent added!");
    })
    .catch((error) => {
      res.status(400).json("Error: " + error);
    });
});

//Find one Rent by Id
router.route("/:id").get((req, res) => {
  Rent.findById(req.params.id)
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.status(400).json("Error: " + error);
    });
});

//Update one Rent
router.route("/:id").put((req, res) => {
  Rent.findById(req.params.id)
    .then((response) => {
      if (req.query.clientId) {
        response.clientId = req.body.clientId;
      }
      if (req.query.vehicleId) {
        response.vehicleId = req.body.vehicleId;
      }
      if (req.query.totalPrice) {
        response.totalPrice = Number(req.body.totalPrice);
      }
      if (req.query.flag) {
        response.flag = req.body.flag;
      }
      if (req.query.requestedDate) {
        response.requestedDate = Date.parse(req.body.requestedDate);
      }
      if (req.query.boughtDate) {
        response.boughtDate = Date.parse(req.body.boughtDate);
      }
      if (req.query.deliveryDate) {
        response.deliveryDate = Date.parse(req.body.deliveryDate);
      }
      response
        .save()
        .then(() => {
          res.json("Rent updated!");
        })
        .catch((error) => {
          res.status(400).json("Error: " + error);
        });
    })
    .catch((error) => {
      res.status(400).json("Error, no Rent found : " + error);
    });
});

//Find one Rent by Id and delete
router.route("/:id").delete((req, res) => {
  Rent.findByIdAndDelete(req.params.id)
    .then((response) => {
      res.json("Rent deleted.");
    })
    .catch((error) => {
      res.status(400).json("Error: " + error);
    });
});

module.exports = router;

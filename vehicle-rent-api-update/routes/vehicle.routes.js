const router = require("express").Router();
let Vehicle = require("../models/vehicle.model");
let User = require("../models/user.model");

//Get All Vehicles
router.route("/").get((req, res) => {
  var dataQuery = new Object();
  if (req.query.vehicleName) {
    dataQuery.vehicleName = req.query.vehicleName;
  }
  if (req.query.vehicleNoPlate) {
    dataQuery.vehicleNoPlate = req.query.vehicleNoPlate;
  }
  if (req.query.vehicleType) {
    dataQuery.vehicleType = req.query.vehicleType;
  }
  if (req.query.vehicleClass) {
    dataQuery.vehicleClass = req.query.vehicleClass;
  }
  if (req.query.yearOfManufacture) {
    dataQuery.yearOfManufacture = req.query.yearOfManufacture;
  }
  if (req.query.EngineCapacity) {
    dataQuery.EngineCapacity = req.query.EngineCapacity;
  }
  if (req.query.fuelType) {
    dataQuery.fuelType = req.query.fuelType;
  }
  if (req.query.RegDate) {
    dataQuery.RegDate = req.query.RegDate;
  }
  if (req.query.rentalChargePerDay) {
    dataQuery.rentalChargePerDay = req.query.rentalChargePerDay;
  }
  if (req.query.userId) {
    dataQuery.userId = req.query.userId;
  }
  Vehicle.find(dataQuery || {})
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.status(400).json("Error: " + error);
    });
});

//Create a Vehicle
router.route("/").post((req, res) => {
  const vehicle = {
    vehicleName: req.body.vehicleName,
    vehicleNoPlate: req.body.vehicleNoPlate,
    vehicleType: req.body.vehicleType,
    vehicleClass: req.body.vehicleClass,
    yearOfManufacture: Number(req.body.yearOfManufacture),
    EngineCapacity: req.body.EngineCapacity,
    fuelType: req.body.fuelType,
    // RegDate: Date.parse(req.body.regDate),
    rentalChargePerDay: Number(req.body.rentalChargePerDay),
    userId: req.body.userId,
  };

  const newVehicle = new Vehicle(vehicle);

  newVehicle
    .save()
    .then((response) => {
      res.json("Vehicle added!");
      //add vehile to user vehicleIds
      User.findByIdAndUpdate(
        response.userId,
        {
          $push: { vehicleIds: response._id },
        },
        { new: true }
      )
        .then((response1) => {
          res
            .status(400)
            .json({ message: "vehicleId added Successfully", shop: shop });
        })
        .catch((error) => {
          res.status(400).json({
            message: "vehicleIds array in user not updated",
          });
        });
    })
    .catch((error) => {
      res.status(400).json("Error: " + error);
    });
});

//Find one Vehicle by Id
router.route("/:id").get((req, res) => {
  Vehicle.findById(req.params.id)
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.status(400).json("Error: " + error);
    });
});

//Update one Vehicle
router.route("/:id").put((req, res) => {
  Vehicle.findById(req.params.id).then((response) => {
    if (req.body.vehicleName) {
      response.vehicleName = req.body.vehicleName;
    }
    if (req.body.vehicleNoPlate) {
      response.vehicleNoPlate = req.body.vehicleNoPlate;
    }
    if (req.body.vehicleType) {
      response.vehicleType = req.body.vehicleType;
    }
    if (req.body.vehicleClass) {
      response.vehicleClass = req.body.vehicleClass;
    }
    if (req.body.yearOfManufacture) {
      response.yearOfManufacture = Number(req.body.yearOfManufacture);
    }
    if (req.body.EngineCapacity) {
      response.EngineCapacity = req.body.EngineCapacity;
    }
    if (req.body.fuelType) {
      response.fuelType = req.body.fuelType;
    }
    if (req.body.rentalChargePerDay) {
      response.rentalChargePerDay = Number(req.body.rentalChargePerDay);
    }
    response.save().then(() => {
      res.json("Vehicle updated!");
    }).catch((error) => {
      res.status(400).json("Error: " + error);
    });
  })
    .catch((error) => {
      res.status(400).json("Error, no Vehicle found : " + error);
    });
});

//Find one Vehicle by Id and delete
router.route("/:id").delete((req, res) => {
  Vehicle.findByIdAndDelete(req.params.id)
    .then((response) => {
      res.json("Vehicle deleted.");
    })
    .catch((error) => {
      res.status(400).json("Error: " + error);
    });
});

module.exports = router;

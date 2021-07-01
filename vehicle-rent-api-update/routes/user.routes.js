const router = require("express").Router();
let User = require("../models/user.model");

//Get All Users
router.route("/").get((req, res) => {
  var dataQuery = new Object();
  if (req.query.userName) {
    dataQuery.userName = req.query.userName;
  }
  if (req.query.email) {
    dataQuery.email = req.query.email;
  }
  if (req.query.password) {
    dataQuery.password = req.query.password;
  }
  if (req.query.contactNo) {
    dataQuery.contactNo = req.query.contactNo;
  }
  if (req.query.type) {
    dataQuery.type = req.query.type;
  }
  User.find(dataQuery || {})
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.status(400).json("Error: " + error);
    });
});

//Create a User
router.route("/").post((req, res) => {
  const user = {
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    contactNo: req.body.contactNo,
    type: req.body.type,
  };

  const newUser = new User(user);

  newUser
    .save()
    .then((response) => {
      res.json("User added!");
    })
    .catch((error) => {
      res.status(400).json("Error: " + error);
    });
});

//Find one User by Id
router.route("/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.status(400).json("Error: " + error);
    });
});

//Update one User
router.route("/:id").put((req, res) => {
  User.findById(req.params.id)
    .then((response) => {
      if (req.body.userName) {
        response.userName = req.body.userName;
      }
      if (req.body.email) {
        response.email = req.body.email;
      }
      if (req.body.password) {
        response.password = req.body.password;
      }
      if (req.body.contactNo) {
        response.contactNo = Number(req.body.contactNo);
      }
      if (req.body.type) {
        response.type = req.body.type;
      }

      response
        .save()
        .then(() => {
          res.json("User updated!");
        })
        .catch((error) => {
          res.status(400).json("Error: " + error);
        });
    })
    .catch((error) => {
      res.status(400).json("Error, no user found : " + error);
    });
});

//Find one User by Id and delete
router.route("/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((response) => {
      res.json("User deleted.");
    })
    .catch((error) => {
      res.status(400).json("Error: " + error);
    });
});

module.exports = router;

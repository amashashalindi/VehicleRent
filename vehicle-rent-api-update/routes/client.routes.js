const router = require("express").Router();
let Client = require("../models/client.model");

//Get All Clients
router.route("/").get((req, res) => {
  var dataQuery = new Object();
  if (req.query.clientName) {
    dataQuery.clientName = req.query.clientName;
  }
  if (req.query.email) {
    dataQuery.email = req.query.email;
  }
  if (req.query.contactNo) {
    dataQuery.contactNo = req.query.contactNo;
  }
  if (req.query.regDate) {
    dataQuery.regDate = req.query.regDate;
  }
  Client.find(dataQuery || {})
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.status(400).json("Error: " + error);
    });
});

//Create a Client
router.route("/").post((req, res) => {
  const client = {
    clientName: req.body.clientName,
    email: req.body.email,
    contactNo: Number(req.body.contactNo),
    // RegDate: Date.parse(req.body.regDate),
  };

  const newClient = new Client(client);

  newClient
    .save()
    .then((response) => {
      res.json("Client added!");
    })
    .catch((error) => {
      res.status(400).json("Error: " + error);
    });
});

//Find one Client by Id
router.route("/:id").get((req, res) => {
  Client.findById(req.params.id)
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.status(400).json("Error: " + error);
    });
});

//Update one Client
router.route("/:id").put((req, res) => {
  Client.findById(req.params.id).then((response) => {
    if (req.body.clientName) {
      response.clientName = req.body.clientName;
    }
    if (req.body.email) {
      response.email = req.body.email;
    }
    if (req.body.contactNo) {
      response.contactNo = Number(req.body.contactNo);
    }
    response.save().then((obj) => {
      res.json(obj);
    }).catch((error) => {
      res.status(400).json("Error: " + error);
    });
  })
    .catch((error) => {
      res.status(400).json("Error, no Client found : " + error);
    });
});

//Find one Client by Id and delete
router.route("/:id").delete((req, res) => {
  Client.findByIdAndDelete(req.params.id)
    .then((response) => {
      res.json("Client deleted.");
    })
    .catch((error) => {
      res.status(400).json("Error: " + error);
    });
});

module.exports = router;

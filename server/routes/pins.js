const { Pin, validate } = require("../models/pin");
const auth = require("../middleware/auth");
const decodeJwt = require("jwt-decode");
const _ = require("lodash");
const express = require("express");
require("express-async-errors");
const router = express.Router();

/*
    GET - Get all pins everywhere
*/
router.get("/", auth, async (req, res) => {
  const pins = await Pin.find({});

  return res.status(200).send(pins);
});

/*
    GET - Get all pins within a 10 mile range of the users location
*/
router.get("/user-location/:longitude/:latitude", auth, async (req, res) => {
  const pins = await Pin.find({
    location: {
      $near: {
        $maxDistance: 50000, // roughly 10 miles in meters
        $geometry: {
          type: "Point",
          coordinates: [req.params.longitude, req.params.latitude], // [longitude, latitude]
        },
      },
    },
  });

  return res.status(200).send(pins);
});

/*
    GET - Get all user specific pins
*/
router.get("/my", auth, async (req, res) => {
  const userId = decodeJwt(req.header("x-auth-token"))._id;
  const pins = await Pin.find({ userId: userId });

  return res.status(200).send(pins);
});

/*
    GET - Get all user specific pins within a 10 mile range of the users location
*/
router.get("/my/user-location/:longitude/:latitude", auth, async (req, res) => {
  let pins = await Pin.find({
    location: {
      $near: {
        $maxDistance: 50000, // roughly 10 miles in meters
        $geometry: {
          type: "Point",
          coordinates: [req.params.longitude, req.params.latitude], // [longitude, latitude]
        },
      },
    },
  });

  const userId = decodeJwt(req.header("x-auth-token"))._id;
  pins = pins.filter((pin) => pin.userId.toString() === userId);

  return res.status(200).send(pins);
});

/*
    GET - Get a specific pin by id
*/
router.get("/:pinId", auth, async (req, res) => {
  const pin = await Pin.findById(req.params.pinId);

  return res.status(200).send(pin);
});

/*
    POST - Add a new pin
*/
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const pinByTitle = await Pin.findOne({ title: req.body.title });
  if (pinByTitle) {
    return res.status(400).send("Pin already exists using that title.");
  }

  const pinByCoordinate = await Pin.findOne({
    "location.coordinates": req.body.location.coordinates,
  });
  if (pinByCoordinate) {
    return res.status(400).send("Pin already exists using that location.");
  }

  req.body.userId = decodeJwt(req.header("x-auth-token"))._id;
  const pin = await new Pin(
    _.pick(req.body, [
      "location",
      "title",
      "description",
      "rating",
      "tags",
      "userId",
    ])
  ).save();

  return res.status(200).send(pin);
});

/*
    POST - Add a new pin while checking for near-by existing pins in a 200 meter radius
*/
router.post("/location", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const pinByTitle = await Pin.findOne({ title: req.body.title });
  if (pinByTitle) {
    return res.status(400).send("Pin already exists using that title.");
  }

  const pinByCoordinate = await Pin.findOne({
    location: {
      $near: {
        $maxDistance: 200, // 200 meters
        $geometry: {
          type: "Point",
          coordinates: [
            req.body.location.coordinates[0],
            req.body.location.coordinates[1],
          ], // [longitude, latitude]
        },
      },
    },
  });
  if (pinByCoordinate) {
    return res.status(400).send("Pin already exists near that location.");
  }

  req.body.userId = decodeJwt(req.header("x-auth-token"))._id;
  const pin = await new Pin(
    _.pick(req.body, [
      "location",
      "title",
      "description",
      "rating",
      "tags",
      "userId",
    ])
  ).save();

  return res.status(200).send(pin);
});

/*
    PUT - Update Pin
*/
router.put("/:pinId", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let pin = await Pin.findById(req.params.pinId);
  if (!pin) {
    return res
      .status(404)
      .send(`The pin with the given id ${req.params.pinId} does not exist.`);
  }

  const userId = decodeJwt(req.header("x-auth-token"))._id;
  if (pin.userId.toString() !== userId) {
    return res.status(404).send(`The pin can not be edited by this user.`);
  }

  req.body.userId = userId;
  pin = await Pin.findByIdAndUpdate(
    req.params.pinId,
    _.pick(req.body, ["title", "description", "tags", "userId"]),
    { new: true }
  );

  return res.status(200).send(pin);
});

module.exports = router;

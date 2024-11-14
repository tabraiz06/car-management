const express = require("express");
const Car = require("../models/Car");
const auth = require("../middleware/auth");
const multer = require("multer");
const fs = require("fs");
const router = express.Router();

// Create Car
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Create the 'uploads' directory if it doesn't exist
    const dir = "../frontend/public/images/";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage: storage });

router.post("/", auth, upload.array("images", 10), async (req, res) => {
  const { title, description, tags } = req.body;
  // const images = req.files.map((file) => file.path);
  const images = req.files.map((file) => file.filename);
  // console.log(req.files);

  const car = new Car({
    title,
    description,
    tags: tags.split(","),
    userId: req.user._id,
    images,
  });

  await car.save();
  res.status(201).json(car);
});

// Get User's Cars
router.get("/", auth, async (req, res) => {
  const cars = await Car.find({ userId: req.user._id });
  res.json(cars);
});

// Search Cars
router.get("/search", auth, async (req, res) => {
  const { keyword } = req.query;
  const cars = await Car.find({
    userId: req.user._id,
    $or: [
      { title: new RegExp(keyword, "i") },
      { description: new RegExp(keyword, "i") },
      { tags: new RegExp(keyword, "i") },
    ],
  });
  res.json(cars);
});

// Get Car by ID
router.get("/:id", auth, async (req, res) => {
  const car = await Car.findOne({ _id: req.params.id, userId: req.user._id });
  if (!car) return res.status(404).send("Car not found");
  res.json(car);
});

// Update Car
router.put("/:id", auth, upload.array("images", 10), async (req, res) => {
  const { title, description, tags } = req.body;
  const images = req.files.map((file) => file.path);

  const car = await Car.findByIdAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    { title, description, tags: tags.split(","), images },
    { new: true }
  );

  if (!car) return res.status(404).send("Car not found");
  res.json(car);
});

// Delete Car
router.delete("/:id", auth, async (req, res) => {
  const car = await Car.findOneAndDelete({
    _id: req.params.id,
    userId: req.user._id,
  });
  if (!car) return res.status(404).send("Car not found");
  res.json({ message: "Car deleted successfully" });
});

module.exports = router;

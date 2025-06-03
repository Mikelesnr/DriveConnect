const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const Car = require("../models/car-model");

const handleGetCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const handleGetCarById = async (req, res) => {
  const carId = req.params.id;

  if (!ObjectId.isValid(carId)) {
    return res.status(400).json({ error: "Invalid car ID" });
  }

  try {
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }
    res.status(200).json(car);
  } catch (error) {
    console.error("Error fetching car:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const handleCreateCar = async (req, res) => {
  const { make, model, year, price, category_id, status, color } = req.body;

  if (!make || !model || !year || !price || !category_id || !status) {
    return res
      .status(400)
      .json({ error: "All required fields must be provided" });
  }

  try {
    const newCar = new Car({
      make,
      model,
      year,
      price,
      category_id,
      status,
      color,
    });

    await newCar.save();
    res.status(201).json(newCar);
  } catch (error) {
    console.error("Error creating car:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const handleUpdateCar = async (req, res) => {
  const carId = req.params.id;
  const { make, model, year, price, category_id, status, color } = req.body;

  if (!ObjectId.isValid(carId)) {
    return res.status(400).json({ error: "Invalid car ID" });
  }

  if (!make || !model || !year || !price || !category_id || !status) {
    return res
      .status(400)
      .json({ error: "All required fields must be provided" });
  }

  try {
    const updatedCar = await Car.findByIdAndUpdate(
      carId,
      { make, model, year, price, category_id, status, color },
      { new: true }
    );

    if (!updatedCar) {
      return res.status(404).json({ error: "Car not found" });
    }

    res.status(200).json(updatedCar);
  } catch (error) {
    console.error("Error updating car:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const handleDeleteCar = async (req, res) => {
  const carId = req.params.id;

  if (!ObjectId.isValid(carId)) {
    return res.status(400).json({ error: "Invalid car ID" });
  }

  try {
    const result = await Car.deleteOne({ _id: carId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Car not found" });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting car:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  handleDeleteCar,
  handleGetCars,
  handleGetCarById,
  handleCreateCar,
  handleUpdateCar,
};

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const Car = require("../models/car-model");

// Handle getting all cars
// This function is responsible for fetching all cars from the database.
const handleGetCars = async (req, res) => {
  //#Swagger-tags["Cars"]
  //#Swagger-summary["Get all cars"]
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Handle getting a car by ID
// This function is responsible for fetching a car's details from the database by its ID.
const handleGetCarById = async (req, res) => {
  //#Swagger-tags["Cars"]
  //#Swagger-summary["Get a car by ID"]
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

// Handle creating a new car
// This function is responsible for adding a new car to the database.
const handleCreateCar = async (req, res) => {
  //#Swagger-tags["Cars"]
  //#Swagger-summary["Create a new car"]
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

// Handle updating a car by ID
// This function is responsible for updating a car's details in the database.
const handleUpdateCar = async (req, res) => {
  //#Swagger-tags["Cars"]
  //#Swagger-summary["Update a car by ID"]
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
    res.json({ message: "Car updated successfully" });
  } catch (error) {
    console.error("Error updating car:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Handle deleting a car by ID
// This function is responsible for deleting a car from the database by its ID.
const handleDeleteCar = async (req, res) => {
  //#Swagger-tags["Cars"]
  //#Swagger-summary["Delete a car by ID"]
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
    res.json({ message: "Car deleted successfully" });
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

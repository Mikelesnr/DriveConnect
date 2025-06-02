// swagger
require("dotenv").config();
const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Drive Connect API",
    description: "An API for managing car sales, inventory, and transactions.",
    version: "1.0.0",
  },
  host: process.env.SERVER_URL || "localhost:5000",
  schemes: ["http", "https"],
  basePath: "/",
  consumes: ["application/json"],
  produces: ["application/json"],
};

const outputFile = "./config/swagger.json"; // Output file
const endpointsFiles = ["../routes/index.js"]; // Scans routing directory only

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log("Swagger documentation generated successfully.");
});

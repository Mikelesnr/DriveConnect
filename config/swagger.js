// swagger
require("dotenv").config();
const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Drive Connect API",
    description: "An API for managing car sales, inventory, and transactions.",
    version: "1.0.0",
  },
  host: process.env.SERVER_URL.replace(/^https?:\/\//, "") || "localhost:3000",
  schemes: [process.env.PROTOCOL || "http"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["../routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log("✅ Swagger documentation generated successfully!");
  process.exit(); // Forces the script to exit after completion
});

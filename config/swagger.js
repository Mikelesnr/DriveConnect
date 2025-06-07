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
  tags: [
    {
      name: 'Users',
      description: 'Endpoints related to user registration and authentication'
    },
    {
      name: 'Employees',
      description: 'Endpoints related to employee management'
    },
    {
      name: 'Sales',
      description: 'Endpoints related to car sales and transactions'
    },
    {
      name: 'Cars',
      description: 'Endpoints related to car inventory management'
    },
    {
      name: 'Customers',
      description: 'Endpoints related to customer management'
    },
    {
      name: 'Categories',
      description: 'Endpoints related to car categories'
    },
    {
      name: 'Base',
      description: 'Endpoints Serves the Home Page'
    },
    {
      name: 'Returns',
      description: 'Endpoints related to sales returns management'
    },
    {
      name: 'Store',
      description: 'Endpoints related to sales store management'
    },
    {
      name: 'Reset Password',
      description: 'Endpoints related to password reset functionality'
    },
  ],
  components: {
    securitySchemes: {
        Authorization: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
            // value: "Bearer <JWT token here>"
        }
    }
  },
};

const outputFile = "./swagger.json";
const endpointsFiles = ["../routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log("✅ Swagger documentation generated successfully!");
  process.exit(); // Forces the script to exit after completion
});

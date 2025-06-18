require("dotenv").config();
const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Drive Connect API",
    description: "An API for managing car sales, inventory, and transactions.",
    version: "1.0.0",
  },
  host: process.env.SERVER_URL?.replace(/^https?:\/\//, "") || "localhost:3000",
  schemes: [process.env.PROTOCOL || "http"],

  securityDefinitions: {
    BearerAuth: {
      type: "apiKey",
      in: "header",
      name: "Authorization",
      description: "Enter JWT token with 'Bearer ' prefix",
    },
  },

  tags: [
    {
      name: "Users",
      description: "Endpoints related to user registration and authentication",
    },
    {
      name: "Employees",
      description: "Endpoints related to employee management",
    },
    {
      name: "Sales",
      description: "Endpoints related to car sales and transactions",
    },
    {
      name: "Cars",
      description: "Endpoints related to car inventory management",
    },
    {
      name: "Customers",
      description: "Endpoints related to customer management",
    },
    { name: "Categories", description: "Endpoints related to car categories" },
    { name: "Base", description: "Endpoints that serve the Home Page" },
    {
      name: "Returns",
      description: "Endpoints related to sales returns management",
    },
    {
      name: "Store",
      description: "Endpoints related to sales store management",
    },
    {
      name: "Reset Password",
      description: "Endpoints related to password reset functionality",
    },
  ],

  components: {
    schemas: {
      User: {
        type: "object",
        properties: {
          user_id: { type: "string" },
          firstname: { type: "string", required: true },
          lastname: { type: "string", required: true },
          role: { type: "string", enum: ["admin", "employee"], required: true },
          user_email: { type: "string", required: true },
          user_password: { type: "string", required: true },
          resetPasswordToken: { type: "string" },
          resetPasswordExpires: { type: "string", format: "date-time" },
        },
      },
      Car: {
        type: "object",
        properties: {
          make: { type: "string", required: true },
          model: { type: "string", required: true },
          year: { type: "number", required: true },
          category_id: { type: "string", required: true },
          color: { type: "string" },
          status: {
            type: "string",
            enum: ["available", "sold", "reserved"],
            required: true,
          },
          price: { type: "number", required: true },
        },
      },
      Category: {
        type: "object",
        properties: {
          category_name: { type: "string", required: true },
          description: { type: "string" },
        },
      },
      Customer: {
        type: "object",
        properties: {
          customer_id: { type: "string" },
          firstname: { type: "string", required: true },
          lastname: { type: "string", required: true },
          email: { type: "string", required: true },
          phone: { type: "string", required: true },
        },
      },
      Employee: {
        type: "object",
        properties: {
          user_id: { type: "string", required: true },
          store_id: { type: "string", required: true },
          status: {
            type: "string",
            enum: ["active", "inactive"],
            required: true,
          },
        },
      },
      Return: {
        type: "object",
        properties: {
          sale_id: { type: "string", required: true },
          reason: { type: "string", required: true },
          refund_amount: { type: "number", required: true },
          return_date: { type: "string", format: "date-time", default: "now" },
        },
      },
      Sale: {
        type: "object",
        properties: {
          customer_id: { type: "string", required: true },
          car_id: { type: "string", required: true },
          employee_id: { type: "string", required: true },
          payment_method: {
            type: "string",
            enum: ["cash", "card", "loan"],
            required: true,
          },
          sale_date: { type: "string", format: "date-time", default: "now" },
        },
      },
      Store: {
        type: "object",
        properties: {
          address: { type: "string", required: true },
          phone: { type: "string", required: true },
          store_name: { type: "string", required: true },
          floor_size: { type: "number" },
          status: { type: "string", enum: ["open", "closed"], required: true },
        },
      },
    },
  },
};

// Ensure schemas appear at the bottom
doc.definitions = doc.components.schemas;

const outputFile = "./swagger.json";
const endpointsFiles = ["../routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log("✅ Swagger documentation generated successfully!");
  process.exit();
});

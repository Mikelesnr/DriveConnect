const { buildHome } = require("../utilities"); // Import the home page function

exports.handleIndex = (req, res) => {
  res.send(buildHome()); // Send the generated HTML response
};

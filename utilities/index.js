// index
exports.buildHome = () => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Drive Connect</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                text-align: center;
                padding: 50px;
            }
            .container {
                background: white;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
                display: inline-block;
            }
            h1 {
                color: #007BFF;
            }
            p {
                color: #333;
                font-size: 18px;
            }
            a {
                text-decoration: none;
                color: white;
                background-color: #007BFF;
                padding: 10px 20px;
                border-radius: 5px;
                display: inline-block;
                margin-top: 20px;
            }
            a:hover {
                background-color: #0056b3;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Welcome to Drive Connect</h1>
            <p>Your trusted car sales API. Easily manage inventory, customers, and sales.</p>
            <a href="/api-docs">📄 View API Documentation</a>
            <a href="/users/google">🔒 Google OAuth Login</a>
        </div>
    </body>
    </html>
    `;
};

// pagination function
exports.paginate = async (model, page = 1, limit = 10, populateFields = "") => {
  const skip = (page - 1) * limit;
  const totalDocuments = await model.countDocuments();
  const totalPages = Math.ceil(totalDocuments / limit);

  const results = await model
    .find()
    .skip(skip)
    .limit(limit)
    .populate(populateFields);

  return {
    totalItems: totalDocuments,
    totalPages,
    currentPage: page,
    pageSize: limit,
    data: results,
  };
};

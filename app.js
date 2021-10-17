var express = require('express');
var mongoose = require('mongoose');
var userRouter = require('./routes/userRouter');
var projectRouter = require('./routes/projectRouter');
var modelRouter = require('./routes/modelRouter');

var dotenv = require('dotenv');
dotenv.config();

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: "Backend mini assignment - CRUD operations",
  },
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);


var app = express();
const MONGODB_URL = process.env.MONGODB_URL;

mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err, result) => {
    if(err) console.log("Error connecting to database: ", err);
    else console.log("Connected to the Database!");
});

var db = mongoose.connection;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// swagger ui docs page
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Route Prefixes
app.use("/api/", userRouter);
app.use("/api/", projectRouter);
app.use("/api/", modelRouter);

// throwing 404 if URL not found
app.all("*", (req, res) => {
    res.status(404).send({"error": "Page not found! :("});
});

module.exports = app;

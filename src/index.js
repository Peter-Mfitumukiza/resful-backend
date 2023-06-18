const express = require('express');
const cors  = require('cors');
const routes = require('./routes/index.routes');
const { Swaggiffy } = require("swaggiffy");

// connect to database
require('./utils/dbConnection');

// configure env variables
require('dotenv').config();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/v1", routes);
// app.use("/api/v1/owners", ownerRoutes);
// app.use("/api/v1/vehicles", vehicleRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to Vehicle Managment System!');
});
// set up documentation

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(documentation));

// server
const port = process.env.PORT|| 5008;

app.listen(port, () => {
    console.log(`Server started on port ${port}...`);
});

new Swaggiffy().setupExpress(app).swaggiffy();
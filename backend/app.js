//package import
const dotenv = require ('dotenv');
dotenv.config ();
const express = require ('express');
const app = express ();
const cors = require ('cors');
//file import
const sequelize = require ('./db/connection');
const studentRouter = require ('./route/student');
const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};
const port = process.env.port || 4000;
app.use (cors (corsOptions));
app.use (express.json ());
app.use (studentRouter);
sequelize
  .sync ()
  .then (() => {
    app.listen (port, () => console.log ('listening at port ' + port));
  })
  .catch (err => {
    console.log (err.message);
  });

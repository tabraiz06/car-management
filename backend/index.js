const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const seedData = require("./seeder");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

mongoose
  .connect(
    "mongodb+srv://tabraiz:tabraiz@cluster0.76smate.mongodb.net/car-management?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("database connection succesfull");
    seedData();
  })
  .catch(() => console.log("error in database conection"));
app.get('/', (req,res)=>{
  res.send('welcome to server')
})
app.use("/api/users", require("./routes/user"));
app.use("/api/cars", require("./routes/car"));

app.listen(5000, () => console.log("Server running on http://localhost:5000"));

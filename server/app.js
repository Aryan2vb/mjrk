// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const customerRoutes = require("./routes/customerRoutes");
// const ledgerRoutes = require("./routes/ledgerRoutes");
// // const dashboardRoutes =
// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cors());

// const dbURI = process.env.MONGO_URI;
// if (!dbURI) {
//   console.error("MONGODB_URI is not defined");
//   process.exit(1); // Exit the app if URI is not set
// }

// mongoose
//   .connect(dbURI)
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// // Use customer routes
// app.use("/api", customerRoutes, ledgerRoutes);

// // Default route
// app.get("/", (req, res) => {
//   res.status(200).send("Welcome to Customer Management API!");
// });
// app.get("/hello", (req, res) => {
//   res.status(200).send("Sab Changa Si");
// });

// // Start the server
// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const customerRoutes = require("./routes/customerRoutes");
const ledgerRoutes = require("./routes/ledgerRoutes");
const dailyRoutes = require('./routes/dailyRoutes');
const lendingRoutes = require('./routes/lendingRoutes');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const dbURI = process.env.MONGO_URI;
if (!dbURI) {
  console.error("MONGODB_URI is not defined");
  process.exit(1);
}

mongoose
  .connect(dbURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Mount routes separately
app.use("/api", customerRoutes);
app.use("/api", ledgerRoutes);
app.use('/api/daily', dailyRoutes);
app.use('/api/lendings', lendingRoutes);


// Default routes
app.get("/", (req, res) => {
  res.status(200).send("Welcome to Customer Management API!");
});
app.get("/hello", (req, res) => {
  res.status(200).send("Sab Changa Si");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

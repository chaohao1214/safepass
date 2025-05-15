const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const passwordRoutes = require("./routes/password");
const passport = require("passport");

dotenv.config();

// cors is an HTTP-header based mechanism that allows a server to indicate any origins
// (domain, scheme, or port) other than its own from which a browser should permit loading resources.
const app = express();
app.use(cors());
app.use(express.json());

// passport
app.use(passport.initialize());

// router
app.use("/api", authRoutes);
app.use("/api/passwords", passwordRoutes);

//MongoDB connect
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

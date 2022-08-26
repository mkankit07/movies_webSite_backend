const mongoose = require("mongoose");
const db = mongoose.connect(
  "mongodb://localhost:27017/netflix",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log("DB error:", err);
    } else {
      console.log("DB connected");
    }
  }
);
module.exports = db;
const mongoose = require("mongoose");

const db = process.env.MONGODB_URI || "mongodb://localhost:27017/nominapptest";
const options = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}

const initDB = () => {
  mongoose.connect(db, options)
  mongoose.connection.once('open', () => { console.log('MongoDB Connected'); });
  mongoose.connection.on('error', (err) => { console.log('MongoDB connection error: ', err); });
}

module.exports = initDB();

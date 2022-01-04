const mongoose = require("mongoose");
mongoose.set("debug", true);
// mongoose.Promise = Promise;
const url = "mongodb://localhost/practice";
const options = {
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 40000, // Close sockets after 40 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true 
};

mongoose.connect(url, options)
  .then(() => console.log("MongoDB Connected"));

let DB = {
  User: require("./user"),
}

module.exports = DB;
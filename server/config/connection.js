// this is where we add the connection to the database
const mongoose = require('mongoose');
// this is something else entirely.
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/social-media', 
  //
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);
//export the connection
module.exports = mongoose.connection;

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
// const cors = require('cors');
const router = require('./routes/index');
const passport = require("passport");

const PORT = process.env.PORT || 5000;

// Bodyparser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').MONGODB_URI;
const users = require("./routes/users");
const electrician = require("./routes/users");

// app.use(cors())
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use('/api', router); 

// Connecting to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useFindAndModify: false }); 
mongoose.connection.once('open', function() { 
  console.log('Connected to the Database.');
});
mongoose.connection.on('error', function(error) {
  console.log('Mongoose Connection Error : ' + error);
});

if (process.env.NODE_ENV === 'production') {
  // Exprees will serve up production assets
  app.use(express.static('client/build'));

  // Express serve up index.html file if it doesn't recognize route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);

app.listen(PORT, function() { console.log(`Server listening on port ${PORT}`) });

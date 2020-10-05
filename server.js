const express = require('express');
const app = express();
const mongoose = require('mongoose');
// const cors = require('cors');
const router = require('./routes/index');

const PORT = process.env.PORT || 5000;

// DB Config
const db = require('./config/keys').MONGODB_URI;

// app.use(cors())
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use('/api', router); 

mongoose.connect(db, { useNewUrlParser: true, useFindAndModify: false }); 
mongoose.connection.once('open', function() { 
  console.log('Connected to the Database.');
});
mongoose.connection.on('error', function(error) {
  console.log('Mongoose Connection Error : ' + error);
});

app.listen(PORT, function() { console.log(`Server listening on port ${PORT}`) });
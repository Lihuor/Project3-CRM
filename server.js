const express = require('express');
const app = express();
const mongoose = require('mongoose');
// const cors = require('cors');
const router = require('./routes/index');

const PORT = 5000;
const MONGODB_URI = 'mongodb+srv://dbUser:lihuor123@cluster0.gnrp9.mongodb.net/crm-users?retryWrites=true&w=majority'

// app.use(cors())
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use('/api', router); 

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useFindAndModify: false }); 
mongoose.connection.once('open', function() { 
  console.log('Connected to the Database.');
});
mongoose.connection.on('error', function(error) {
  console.log('Mongoose Connection Error : ' + error);
});

app.listen(PORT, function() { console.log(`Server listening on port ${PORT}`) });
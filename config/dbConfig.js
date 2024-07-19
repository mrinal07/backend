const mongoose = require('mongoose')

mongoose.connect(process.env.mongo_url);

const connection = mongoose.connection;

connection.on( 'error', ()=>{
    console.log("Error connecting to mongo database");
} );

connection.on('connected', ()=>{
    console.log('Connected to database or Mongo DB connection successful');
});


module.exports = connection;

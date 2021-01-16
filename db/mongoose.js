//This file will handle connection logic to mongodb database

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/pollDB', {useNewUrlParser: true}).then(() => {
    console.log("Connected to MongoDb Succesfully");
}).catch((e) => {
    console.log("error while attempting to connect mongodb");
    console.log(e);
});

//To prevent deprecation warning (from MongoDB native driver)
mongoose.set('useCreateIndex',true);
mongoose.set('useFindAndModify',true);
mongoose.set('useUnifiedTopology',true);

module.exports = { mongoose };
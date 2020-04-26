var mongoose = require('mongoose');
module.exports = () =>{
    const MONGODB_RUI = "mongodb+srv://ryodevgame:dantran123@cluster0-mha26.gcp.mongodb.net/test?retryWrites=true&w=majority";
    mongoose.set("useCreateIndex", true);
    mongoose.connect(MONGODB_RUI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
    });
    mongoose.connection.on('connected', () => {
        console.log("OK");
    });
    return mongoose;
};
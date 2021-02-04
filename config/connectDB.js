const mongoose = require("mongoose");

function connectDB() {

    const opts ={ useNewUrlParser: true , useUnifiedTopology: true , useFindAndModify : false}
    mongoose.connect(process.env.MONGO_URL, opts )
    .then(() => console.log("The Database is Conneted..."))
    .catch((err) => console.log(err));
}

module.exports = connectDB;

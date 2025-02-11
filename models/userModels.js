const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        require: true
    },
    contact:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    }
}, {timestamps:true});

const User = mongoose.model("User", userSchema);

module.exports = User;
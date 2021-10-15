const mongoose = require('mongoose');

const msg = new mongoose.Schema({
    name : {
        type: String,
        required:true
    },
    email : {
        type: String,
    },
    message : {
        type: String,
        required:true
    }
})

const Register = new mongoose.model("Message",msg);
module.exports = Register ;
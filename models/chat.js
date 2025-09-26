const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    msg:{
        type:String,
        maxLength:50,
    },
    createdAt:{
        type:Date,
        required:true
    }
});

const chat = new mongoose.model("chat",chatSchema);
module.exports = chat;
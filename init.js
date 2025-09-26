const mongoose = require("mongoose");
const chat = require("./models/chat.js");

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

main().then(()=>{
    console.log("Connection Successful!");
}).catch((err)=>{
    console.log(err);
});

let allChats = [
    {
    from: "RAHUL",
    to: "AMAN",
    msg: "DON'T FORGET TO BRING LAB RECORD",
    createdAt: new Date()
},

{
    from: "SNEHA",
    to: "TANMAY",
    msg: "ARE YOU READY FOR THE PRESENTATION?",
    createdAt: new Date()
},

{
    from: "ARJUN",
    to: "NEHA",
    msg: "SHARE THE NOTES AFTER CLASS",
    createdAt: new Date()
},

{
    from: "PRIYA",
    to: "ANKIT",
    msg: "MEET ME IN LIBRARY AT 3 PM",
    createdAt: new Date()
},

{
    from: "VIKAS",
    to: "RANI",
    msg: "GOOD LUCK FOR THE EXAM!",
    createdAt: new Date()
}
];

chat.insertMany(allChats);
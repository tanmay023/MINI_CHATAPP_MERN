const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs"); 
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

app.get("/chats",async(req,res)=>{
    let chats = await chat.find();
    // console.log(chats);
    res.render("index.ejs",{chats});
});

app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
});

app.get("/chats/:id/edit",async(req,res)=>{
    let {id} = req.params;
    let editChat = await chat.findById(id);
    res.render("edit.ejs", {editChat});
});

app.put("/chats/:id",async(req,res)=>{
    let {id} = req.params;
    let {msg:newMsg} = req.body;
    let updatedchat = await chat.findByIdAndUpdate(id,{msg:newMsg},{runValidators:true,new:true});

    console.log(updatedchat);
    res.redirect("/chats");
});

app.delete("/chats/:id",async (req,res)=>{
    let {id} = req.params;
    let deletedChat = await chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
});

app.post("/chats",(req,res)=>{
    let {from,to,msg} = req.body;
    let newChat = new chat({
        from:from,
        to:to,
        msg:msg,
        createdAt:new Date()
    });

    newChat.save().then((res)=>{
        console.log("CHAT WAS SAVED!");
    }).catch((err)=>{
        console.log(err);
    })
    res.redirect("/chats");
});

main().then(()=>{
    console.log("CONNECTION SUCCESSFUL!");
}).catch((err)=>{
    console.log(err);
});

// let chat1 = new chat({
//     from:"Neha",
//     to:"Priya",
//     msg:"SEND ME YOUR EXAM SHEET",
//     createdAt:new Date()
// });

// chat1.save().then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// });

app.get("/",(req,res)=>{
    res.send("ROOT IS WORKING!");
})

app.listen(8080,()=>{
    console.log("SERVER IS LISTENEING ON PORT 8080!");
});
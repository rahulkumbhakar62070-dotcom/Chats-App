const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js"); // part-2
const methodOverride = require('method-override');  //part-8

app.set("view engine", "ejs");  // alway use app.set
app.set("views", path.join(__dirname, "views")); // alway use app.set
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

main()
.then(() => {
console.log("connnection is successful");
})
.catch((err) => 
    console.log(err));

async function main(){
    await  mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

// Index Route -part-4
app.get("/chats", async (req, res) => {  
   let chats = await Chat.find();    //Chat.find() ye ek asyn function hai promise return karta hai await and sync use karna padega
//    console.log(chats);               // data ko database lane ke liye Chat.find use kiye hai
    // res.send("working");    // for checking its working or not
    res.render("index.ejs", { chats });
});

//PART-5 NEW ROUTE

 app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
    
 });

 //create route  // post route
 app.post("/chats", (req,res) => {
    let { from, to, msg} = req.body;
    let newChat = new Chat({  //create new mongodb documents
        from: from,
        to: to,
        msg: msg,
        created_at: new Date(),
    });

    newChat
    .save()
    .then((result) => {
        console.log("chat was saved");
    }).catch((err) => {
        console.log(err);
    });
    res.redirect("/chats");
 })

 //part-7 Edit route

 app.get("/chats/:id/edit", async (req, res) => {
    let { id } = req.params;
 let chat = await Chat.findById(id);   //database se data fetch  ek async function isliye hum await and async use karenge
    res.render("edit.ejs", { chat });
 });

 // part-8 upadate route
 app.put("/chats/:id", async (req, res) => {
    let { id } = req.params;
let { msg: newMsg } = req.body;
let updateChat = await Chat.findByIdAndUpdate(
    id,
    {msg: newMsg},
    {runValidators: true, new: true},
);
// console.log(updateChat);
  res.redirect("/chats");
 });

 //Part-9 delete route

 app.delete("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
 })
// Part-1
app.get("/", (req, res) => {
    res.send("Root is working successfully")
})

app.listen(8080, () =>{
console.log("server is listening on port 8080");
});

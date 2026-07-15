// Part-3


const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
.then(() => {
console.log("connnection is successful");
})
.catch((err) => 
    console.log(err));

async function main(){
    await  mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChats = [
    {
    from: "neha",
    to: "misha",
    msg: "send your CN notes",
    created_at: new Date()
},
 {
    from: "kamakashi",
    to: "chit chat",
    msg: "Jb se gye ho life se mera sgpa aacha aane laga hai and back kam ho raha hai ",
    created_at: new Date()
},
 {
    from: "sourav",
    to: "naveen",
    msg: "Are yar project me koi kam nhi kar raha hai",
    created_at: new Date()
},
 {
    from: "rahul",
    to: "misha",
    msg: "how are you ?",
    created_at: new Date()
},
 {
    from: "ayush",
    to: "nitesh",
    msg: "send your DAA notes",
    created_at: new Date()
},
 {
    from: "dhruv",
    to: "sachin",
    msg: "send your os notes",
    created_at: new Date()
},

];

Chat.insertMany(allChats);

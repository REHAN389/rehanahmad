//                                  Main file for routing. 

//                                  REQUIRE SECTION 
const mongoose = require('mongoose');
// DATABASE LINK
const DB = 'mongodb+srv://rehan:ahmad@cluster0.ulkkr.mongodb.net/portfolio?retryWrites=true&w=majority'

const express = require('express');
const app = express();
const port = process.env.PORT || 3000; //PORT NO
const path = require('path')

const static_path = path.join(__dirname,"../public"); // FOR SERVING STATIC FILES
app.use(express.static(static_path));

app.use(express.json());   // TO READ DATA FROM USER OTHERWISE IT SHOWS UNDEFINED.
app.use(express.urlencoded({extended:false})) // SAME AS ABOVE 


const Register = require("./models/message")    //LINKING SCHEMA 


//                                       LINKING MONGOOSE WITH DATABASE 

mongoose.connect(DB, {
    useNewUrlParser:true,
    useUnifiedTopology:true,  
}).then(()=>{
    console.log('Successfully connected with database.');
}).catch((err)=> console.log('no connection'+err));


// PAGE ROUTING.

// DFEAULT SHOW PAGE
app.get("/",(req,res)=>{
    res.render("index.html");
})

// PAGE AFTER POST
app.post("/", async (req,res)=>{
   try {
    const sendMsg = new Register ({
        name : req.body.name,       //GETTING VALUE BY USER
        email : req.body.email,
        message : req.body.message
    })
      const registered = await sendMsg.save();  //SAVING DATA TO DATABASE
    
   } catch (error) {
       console.log(error)
   }
   app.engine('html', require('ejs').renderFile);  // SECTION TO HANDLE .HTML MODULE
   res.render("index.html");

})

// FOR ERROR PAGE 
app.get("*",(req,res)=>{
    res.send("Ooops page is not found....");
})

// server notice.
app.listen(port,()=>{
    console.log(`Server successfully started on port no: ${port}`);
})

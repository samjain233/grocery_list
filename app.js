const express = require("express");
const bodyparser = require("body-parser");
const cookieParser = require('cookie-parser');


const app = express();

//ejs settings
app.set('view engine','ejs');


//static files
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
app.use(cookieParser());

//cookie


//array for stroing data
var arr=[];


//targeting home route ----------------------------------------------------------------------------------------
app.get("/",function(req,res){
    if(req.cookies.task)
    arr= req.cookies.task;
    res.render("main",{render:arr});

});

//post request | home route -----------------------------------------------------------------------------------
app.post("/", function (req, res) {
    arr.push(req.body.item);
    let options = {
        expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // would expire after 1yr
    }
    res.cookie("task", arr, options);
    res.redirect("/");
});

//targeting delete route-------------------------------------------------------------------------------------------
app.post("/delete",function(req,res)
{
    var index = req.body.checkbox;
    arr.splice(index,1);
    let options = {
        expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // would expire after 1yr
    }
    res.cookie("task", arr, options);
    res.redirect("/");
});



//listen port ------------------------------------------------------------------------------------------------------
app.listen(3000,function(){
    console.log("server started at port 3000");
})
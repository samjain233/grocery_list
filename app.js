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

//global variable
var arr=[];

//targeting home route ----------------------------------------------------------------------------------------
app.get("/",function(req,res){
    console.log(arr);
    res.render("main",{render:arr});

});

//post request | home route -----------------------------------------------------------------------------------
app.post("/", function (req, res) {
    arr.push(req.body.item);
    res.redirect("/");
});

//targeting delete route-------------------------------------------------------------------------------------------
app.post("/delete",function(req,res)
{
    var index = req.body.checkbox;
    arr.splice(index,1);
    res.redirect("/");
});



//listen port ------------------------------------------------------------------------------------------------------
app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
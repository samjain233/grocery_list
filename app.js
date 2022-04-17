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

//targeting home route ----------------------------------------------------------------------------------------
app.get("/",function(req,res){
    var arr=[];
    arr=req.cookies.task;
    console.log(arr);
    res.render("main",{render:arr});

});

//post request | home route -----------------------------------------------------------------------------------
app.post("/", function (req, res) {
    let temparr=[];
    temparr = req.cookies.task;
    temparr.push(req.body.item);
    let options = {
        expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // would expire after 1yr
    }
    res.cookie("task", temparr, options);
    res.redirect("/");
});

//targeting delete route-------------------------------------------------------------------------------------------
app.post("/delete",function(req,res)
{
    var index = req.body.checkbox;
    let temparr=[];
    temparr = req.cookies.task;
    temparr.splice(index,1);
    let options = {
        expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // would expire after 1yr
    }
    res.cookie("task", temparr, options);
    res.redirect("/");
});



//listen port ------------------------------------------------------------------------------------------------------
app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
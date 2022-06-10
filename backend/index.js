const express = require("express")
const fs = require("fs");
    
const app = express();
const jsonParser = express.json();
const filePath = "prices.json";


app.get("/refresh", function(req, res){
    
});

app.get("/prices", function(req, res){
    const content = fs.readFileSync(filePath,"utf8");
    const prices = JSON.parse(content);
    res.send(prices);
});



app.listen(3000, function(){
    console.log("Server is waiting to connect...");
});
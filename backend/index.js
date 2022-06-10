const express = require("express")
const parsers = require('./parsers')
const fs = require("fs");
    
const app = express();
const jsonParser = express.json();
const filePath = "prices.json";


app.get("/refresh", function(req, res) {
    var stores = {
        eneba: [],
        g2a: [],
        plati: [],
        wmcentre: [],
        ggsel: [],
    };
    
    Promise.all([parsers.eneba, parsers.g2a]).then(values => { // not sure it works more than once
        stores.eneba = values[0];        
        stores.g2a = values[1];

        console.log(`New Request! Answered stats: Eneba: ${stores.eneba.length} | G2A: ${stores.g2a.length}`)
        res.send(stores); // Temporarily. Until the address "/prices" is implemented.
    });

    // res.send('Слава Україні!')
});

app.get("/prices", function(req, res){
    const content = fs.readFileSync(filePath,"utf8");
    const prices = JSON.parse(content);
    res.send(prices);
});



app.listen(3000, function(){
    console.info("Server is waiting to connect...");
});
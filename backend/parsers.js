const axios = require('axios');
const cheerio = require('cheerio');


// ----- Eneba Parcer -----
exports.eneba = new Promise((resolve, reject) => {
    axios.get('https://www.eneba.com/store?text=ARS%20Steam%20Gift%20Card&currency=USD')
        .then(ax => {
            var cards = [];

            console.log(`Eneba | statusCode: ${ax.status}`);
            const $ = cheerio.load(ax.data);
            var bigdata = JSON.parse($('#__APOLLO_STATE__').text());
            
            Object.entries(bigdata).forEach(obj => {
                if (obj[1].hasOwnProperty('amount'))
                    cards.push({amount: parseInt(obj[0].match(/\d+/)[0]), price: parseFloat(obj[1].amount) / 100});
            });
            resolve(cards);
        })
        .catch(error => {
            console.error(error);
            reject(error);
    });
})
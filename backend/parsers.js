const axios = require('axios');
const cheerio = require('cheerio');
const { json } = require('express');
const query = 'ARS%20Steam%20Gift%20Card'
const currency = '&currency=USD'

// ----- Eneba Parcer -----
exports.eneba = new Promise((resolve, reject) => {
    axios.get(`https://www.eneba.com/store?text=${query}${currency}`)
        .then(ax => {
            var cards = [];

            console.log(`Eneba | statusCode: ${ax.status}`);
            const $ = cheerio.load(ax.data);
            var bigdata = JSON.parse($('#__APOLLO_STATE__').text());
            
            Object.entries(bigdata).forEach(obj => {
                if (obj[1].hasOwnProperty('amount'))
                    cards.push({amount: parseInt(obj[0].match(/\d+/)[0]), price: Math.round(parseFloat(obj[1].amount) * 1.23) / 100});
            });
            resolve(cards);
        })
        .catch(error => {
            console.error(error);
            reject(error);
    });
})

// ----- G2A Parcer -----
exports.g2a = new Promise((resolve, reject) => {
    const config = {
        headers: { 
          'Accept-Encoding': 'gzip, deflate, br', 
          'Accept-Language': 'ru,en-US;q=0.8,en;q=0.5,uk;q=0.3', 
        }
    };
    axios.get(`https://www.g2a.com/search?query=${query}${currency}`, config)
        .then(ax => {
            var cards = [];

            console.log(`G2A | statusCode: ${ax.status}`);
            const $ = cheerio.load(ax.data);
            var bigdata = JSON.parse($('#__NEXT_DATA__').text());
            
            Object.entries(bigdata.props.initialState.sections.data).forEach(obj => {
                if (JSON.stringify(obj).includes('maxPrice')){
                    products = obj[1].data.items;
                    Object.entries(products).forEach(product => {
                        cards.push({amount: parseInt(product[1].name.match(/\d+/)[0]), price: parseFloat(product[1].price)})
                    });
                }
            });
            resolve(cards);
        })
        .catch(error => {
            console.error(error);
            reject(error);
    });
})
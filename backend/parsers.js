const axios = require('axios');
const cheerio = require('cheerio');


// ----- Eneba Parcer -----
const eneba =   axios.get('https://www.eneba.com/store?text=ARS%20Steam%20Gift%20Card&currency=USD')
                    .then(ax => {
                        console.log(`statusCode: ${ax.status}`);
                        const $ = cheerio.load(ax.data);
                        var bigdata = JSON.parse($('#__APOLLO_STATE__').text());
                        
                        Object.entries(bigdata).forEach(obj => {
                            if (obj[1].hasOwnProperty('amount')){
                                console.log(obj[1]);
                            }
                        });
                        
                    })
                    .catch(error => {
                        console.error(error);
                });
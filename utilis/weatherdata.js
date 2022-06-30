const request = require('request')
const constants = require('../config')

// function weatherdata(address, callback){
//     rewuest(
//         {url, json:true}, (err, {data})
//     )
// }
const weatherdata = (address, callback) => {
    const url = constants.openweathermap.base_url + encodeURIComponent(address) + '&appid=' + constants.openweathermap.secret_key;
    request({ url, json: true },(error, {body}) => {

        if (error) {
            callback('can"t fetch open weather api', undefined)
        } 
       else if(!body.main || !body.main.temp || !body.name || !body.name){
                 callback('unable to find required data , please find another location',undefined)
        }
        else {
            callback(undefined, {
                temperature: body.main.temp,
                description: body.weather[0].description,
                cityname: body.name
            })
        }
    })
}


module.exports = weatherdata;

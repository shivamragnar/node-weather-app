const request = require('request')

let forecast = (lat, long, callback) => {
    const url  = 'https://api.darksky.net/forecast/85edf149777508785a377c634e510718/' + lat + ',' + long

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to Weather api', undefined)
        }
        else if(body.error){
            callback('Invalid locations',undefined)
        }
        else{
            callback(undefined,`${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. This high today is ${body.daily.data[0].temperatureHigh} with a low of ${body.daily.data[0].temperatureLow}. There is a ${body.currently.precipProbability}% chances of rain.`)
        }
    })
}

module.exports = forecast
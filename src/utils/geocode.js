let request = require('request')


const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoic2hpdmFtcmFnbmFyIiwiYSI6ImNrMTRzMjVjNDBsaWIzaXBmcWtnem9saTYifQ.vRLi-Osvx6PruP9ATPelQg&limit=1'
    request({url, json: true}, (error, {body}) => {
        // console.log('testing response', response.body.features, error)
        if(error){
            callback('Unable to connect to map api', undefined)
        }
        else if(body.features.length === 0){
            callback('Unable to find location', undefined)
        }
        else{
            callback(undefined, {
                longitude : body.features[0].center[1],
                latitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode
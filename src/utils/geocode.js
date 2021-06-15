const request = require('postman-request')


const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoic2hpcm5pdmFzOTUiLCJhIjoiY2twdXNzdmhoMGYxazJ4cGF4eWJjajI2bSJ9.yCDQA44j56KJuIi6zWAkew&limit=1'
    request({url, json: true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to Location services !', undefined)

        }else if(body.features.length === 0){
            callback('Unable to find location, Try another',undefined)
        }else {
            callback(undefined, {
                longitude : body.features[0].center[0],
                latitude : body.features[0].center[1],
                location : body.features[0].place_name
            })
        }

    })

}

module.exports = geocode
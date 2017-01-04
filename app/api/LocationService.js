import {
    GOOGLE_GEOCODING_URL,
    LANGUAGE
} from '../config'
import checkStatus from './googleHelper'
const geo_options = {
  enableHighAccuracy: true,
  maximumAge        : 30000,
  timeout           : 27000
}

export default class LocationService {
    //取得地理編碼，透過google maps geocoding api將地理位址轉為座標
    requestGeocoding(address) {
        const requestUrl = `${GOOGLE_GEOCODING_URL}?address=${encodeURI(address)}&language=${LANGUAGE}`
        return fetch(requestUrl, {method: 'GET'})
            .then(checkStatus)
            .then(response => response.json())
            .then(body => {
                const location = body.results[0].geometry.location
                return {
                  latitude: location.lat,
                  longitude: location.lng
                }
            })
    }

    requestGeolocation() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition((position) => {
                resolve(position)
            }, (error) => {
                reject(error.message)
            }, {
                enableHighAccuracy: true,
                timeout: 30000,
                maximumAge: 1000
            });
        })
    }
}

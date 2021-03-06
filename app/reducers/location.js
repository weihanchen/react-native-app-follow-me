import {
    REQUEST_GEOLOCATION,
    REQUEST_GEOLOCATION_FAILED,
    REQUEST_GEOLOCATION_SUCCESS
} from '../actions'
const location = (state = {
    error: null,
    coordinate: null,
    status: 'init'
}, action) => {
    switch (action.type) {
        case REQUEST_GEOLOCATION:
            return Object.assign({}, state, {
                status: 'loading',
                error: null
            })
            break
        case REQUEST_GEOLOCATION_FAILED:
            return Object.assign({}, state, {
                status: 'error',
                error: action.error
            })
            break
        case REQUEST_GEOLOCATION_SUCCESS:
            return Object.assign({}, state, {
                status: 'success',
                coordinate: {
                    latitude: action.location.coords.latitude,
                    longitude: action.location.coords.longitude
                }
            })
            break
        default:
            return state
    }
}
export default location

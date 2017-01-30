import {
   watchRequestCheckIdentity
} from './identify'
import {
   watchRequestAddToGroup,
   watchRequestCreateGroup,
   watchRequestFetchGroup
} from './group'
import {
   watchRequestGeocoding
} from './geocoding'
import {
   watchRequestGeolocation
} from './location'
import {
   watchRequestTravelDirections,
   watchRequestTravelInit,
   watchRequestTravelUpdateCoordinate
} from './travel'
import {
   watchRequestFetchUser
} from './user'

export default function* rootSaga() {
   yield [
      watchRequestAddToGroup(),
      watchRequestCheckIdentity(),
      watchRequestCreateGroup(),
      watchRequestFetchGroup(),
      watchRequestFetchUser(),
      watchRequestGeolocation(),
      watchRequestGeocoding(),
      watchRequestTravelDirections(),
      watchRequestTravelInit(),
      watchRequestTravelUpdateCoordinate()
   ]
}

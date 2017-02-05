'use strict'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
//actions
import {
   changeTravelMode,
   requestFetchTravelInit,
   requestGeolocation,
   requestLeaveGroup,
   requestTravelDirections,
   requestTravelUpdateCoordinate,
   updateTravelMarkers,
   updateTravelRegion
} from '../actions'
//components
import {
   Alert,
   InteractionManager,
   View,
   Text,
   ToastAndroid,
   StyleSheet
} from 'react-native'
import {SideMenu} from 'react-native-elements'
import {TravelMap, TravelMenu} from '../components/Travel'
import MenuContainer from './MenuContainer'
//config
import {ERROR_MESSAGE} from '../config'
//service
import {FirebaseService} from '../api'

const firebaseService = new FirebaseService()

class TravelContainer extends Component {
   constructor(props) {
      super(props)
      this.state = {
         isMenuOpen: false
      }
   }

   watchID :
      ? number = null

   componentDidMount() {
      const groupId = this.props.groupId
      const userId = this.props.userId
      this.props.requestGeolocation()

      firebaseService.onGroupMembersChanged(groupId, (childSnapshot) => {
         const key = childSnapshot.key
         const value = childSnapshot.val()
         const coordinate = value.coordinate
         this.props.updateTravelMarkers(this.props.travel.markers, key, coordinate)
      })

      this.watchID = navigator.geolocation.watchPosition((position) => {
         const coordinate = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
         }
         this.props.requestTravelUpdateCoordinate(groupId, userId, coordinate)
      }, (error) => ToastAndroid.show(ERROR_MESSAGE.POSITION_ERROR, ToastAndroid.SHORT), {
         enableHighAccuracy: true,
         distanceFilter: 2,
         timeout: 1000,
         maximumAge: 1000
      })

   }

   componentWillReceiveProps(nextProps) {
      const groupId = this.props.groupId
      const userId = this.props.userId
      const {navigator} = nextProps
      const groupStatusFunc = {
         leave_success: () => {
            InteractionManager.runAfterInteractions(() => {
               navigator.pop()
            })
         },
         error: (error) => this.errorHandler(error)
      }
      const locationStatusFunc = {
         success: () => this.props.requestFetchTravelInit(nextProps.location.coordinate, userId, groupId),
         error: (error) => this.errorHandler(error)
      }
      const travelStatusFunc = {
         request_init_success: () => this.props.requestTravelDirections(nextProps.travel.coordinate, nextProps.travel.endPosition.coordinate, nextProps.travel.mode),
         error: (error) => this.errorHandler(error)
      }

      if (groupStatusFunc.hasOwnProperty(nextProps.group.status) && nextProps.group.status != this.props.group.status)
         groupStatusFunc[nextProps.group.status](nextProps.group.error)

      if (locationStatusFunc.hasOwnProperty(nextProps.location.status) && nextProps.location.status != this.props.location.status)
         locationStatusFunc[nextProps.location.status](nextProps.location.error)

      if (travelStatusFunc.hasOwnProperty(nextProps.travel.status) && nextProps.travel.status != this.props.travel.status)
         travelStatusFunc[nextProps.travel.status](nextProps.travel.error)
   }

   componentWillUnmount() {
      navigator.geolocation.clearWatch(this.watchID)
   }

   confirmLeaveGroup() {
      const groupId = this.props.groupId
      const userId = this.props.userId
      const isLeader = this.props.travel.isLeader
      this.props.requestLeaveGroup(groupId, userId, isLeader)
   }

   errorHandler(message) {
      ToastAndroid.show(message, ToastAndroid.SHORT)
   }

   handleChangeMode(mode) {
      this.props.changeTravelMode(mode)
      this.handleRequestDirection()
   }

   handleLeaveGroup() {
      const groupId = this.props.groupId
      const userId = this.props.userId
      const isLeader = this.props.travel.isLeader
      const alertTitle = '離開隊伍'
      let alertBody = '請確認是否離開隊伍?'
      const alertFooter = [
         {
            text: '取消'
         }, {
            text: '確定離開',
            onPress: this.confirmLeaveGroup.bind(this)
         }
      ]
      if (isLeader)
         alertBody = `您是隊長，離開隊伍後將解散群組，${alertBody}`
      Alert.alert(alertTitle, alertBody, alertFooter)
   }

   handleRequestDirection() {
      this.props.requestTravelDirections(this.props.travel.coordinate, this.props.travel.endPosition.coordinate, this.props.travel.mode)
   }

   handleRequestRegion() {
      this.props.updateTravelRegion(this.props.travel.coordinate)
   }

   handleToggleSideMenu() {
      this.setState({
         isMenuOpen: !this.state.isMenuOpen
      })

   }

   render() {
      const {travel} = this.props
      return (
         <SideMenu isOpen={this.state.isMenuOpen} menu={TravelMenu} onChange={(isMenuOpen) => this.setState({isMenuOpen})}>
            <TravelMap handleLeaveGroup={this.handleLeaveGroup.bind(this)} handleChangeMode={this.handleChangeMode.bind(this)} handleRequestDirection={this.handleRequestDirection.bind(this)} handleRequestRegion={this.handleRequestRegion.bind(this)} handleToggleSideMenu={this.handleToggleSideMenu.bind(this)} travel={travel}></TravelMap>
         </SideMenu>
      )
   }
}

const mapStateToProps = (state) => {
   return {group: state.group, travel: state.travel, user: state.user, location: state.location}
}

const mapDispatchToProps = (dispatch) => {
   return bindActionCreators({
      changeTravelMode,
      requestFetchTravelInit,
      requestGeolocation,
      requestLeaveGroup,
      requestTravelDirections,
      requestTravelUpdateCoordinate,
      updateTravelMarkers,
      updateTravelRegion
   }, dispatch)
}

const styles = StyleSheet.create({
   container: {
      flex: 1
   }
})

TravelContainer.propTypes = {
   changeTravelMode: PropTypes.func,
   group: PropTypes.object,
   groupId: PropTypes.string,
   requestDirections: PropTypes.func,
   requestFetchTravelMarkers: PropTypes.func,
   requestLeaveGroup: PropTypes.func,
   requestGeolocation: PropTypes.func,
   requestTravelUpdateCoordinate: PropTypes.func,
   travel: PropTypes.object,
   updateTravelMarkers: PropTypes.func,
   updateTravelRegion: PropTypes.func,
   user: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(TravelContainer)

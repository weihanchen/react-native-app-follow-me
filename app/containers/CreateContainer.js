'use strict'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {InteractionManager, View, StyleSheet, Text, ToastAndroid} from 'react-native'
//actions
import {requestCreateGroup, requestGeolocation, requestGeocoding, requestIdentify} from '../actions'
//components
import {CreateBody} from '../components/Create/index.js'
import MenuContainer from './MenuContainer'
import TravelContainer from './TravelContainer'

import {ERROR_MESSAGE} from '../config'

class CreateContainer extends Component {
   constructor(props) {
      super(props)
      this.state = {
         hasLocated: false
      }
   }

   watchID: ?number = null;

   componentDidMount() {
      this.props.requestGeolocation()

      this.watchID = navigator.geolocation.watchPosition((position) => {
         const {hasLocated} = this.state
         if (!hasLocated) this.props.requestGeolocation()
      }, (error) => ToastAndroid.show(ERROR_MESSAGE.POSITION_ERROR, ToastAndroid.SHORT), {
         enableHighAccuracy: true,
         timeout: 1000,
         maximumAge: 1000
      })
   }

   componentWillReceiveProps(nextProps) {
      const groupStatusFun = {
         create_success: (group) => this.props.requestIdentify(),
         error: (group) => ToastAndroid.show(group.error, ToastAndroid.SHORT)
      }
      const identifyStatusFunc = {
         request_success: (identify) => {
            const {navigator} = nextProps
            InteractionManager.runAfterInteractions(() => {
               navigator.replace({
                  component: TravelContainer,
                  passProps: {
                     groupId: identify.groupId,
                     userId: identify.userId
                  }
               })
            }, 1000)
         },
         error: (identify) => ToastAndroid.show(identify.error, ToastAndroid.SHORT)
      }

      if (groupStatusFun.hasOwnProperty(nextProps.group.status) && nextProps.group.status != this.props.group.status)
         groupStatusFun[nextProps.group.status](nextProps.group)

      if (identifyStatusFunc.hasOwnProperty(nextProps.identify.status) && nextProps.identify.status != this.props.identify.status)
         identifyStatusFunc[nextProps.identify.status](nextProps.identify)
   }

   handleCreateGroup(groupName, username, expiredTime, startPosition, endPosition) {
      this.props.requestCreateGroup(groupName, username, expiredTime, startPosition, endPosition)
   }

   handleMarkLocated() {
      this.setState({hasLocated: true})
   }

   handleSearchAddress(address) {
      this.props.requestGeocoding(address)
   }

   render() {
      const {location, geocoding, group} = this.props
      return (
         <View style={styles.container}>
            <CreateBody location={location} geocoding={geocoding} group={group}
                        handleSearchAddress={this.handleSearchAddress.bind(this)} handleCreateGroup={this.handleCreateGroup.bind(this)} handleMarkLocated={this.handleMarkLocated.bind(this)}></CreateBody>
         </View>
      )
   }
}

const mapStateToProps = (state) => {
   return {location: state.location, geocoding: state.geocoding, group: state.group, identify: state.identify}
}

const mapDispatchToProps = (dispatch) => {
   return bindActionCreators({
      requestCreateGroup,
      requestGeocoding,
      requestGeolocation,
      requestIdentify
   }, dispatch)
}

const styles = StyleSheet.create({
   container: {
      flex: 1
   }
})

CreateContainer.propTypes = {
   geocoding: PropTypes.object,
   group: PropTypes.object,
   identify: PropTypes.object,
   location: PropTypes.object,
   requestCreateGroup: PropTypes.func,
   requestGeocoding: PropTypes.func,
   requestGeolocation: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateContainer)

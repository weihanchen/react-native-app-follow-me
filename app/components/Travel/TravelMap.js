'use strict'
import React, {Component, PropTypes} from 'react'
//plugins
import {Dimensions, Text, TouchableOpacity, View} from 'react-native'
import MapView, {Marker, Polyline} from 'react-native-maps'
import Icon from 'react-native-vector-icons/FontAwesome'
//stylesheets
import styles from './styles'
import mainStyle from '../../stylesheets'
const screen = Dimensions.get('window')
const ASPECT_RATIO = screen.width / screen.height
const LATITUDE = 23.6010548
const LONGITUDE = 120.4536408
const LATITUDE_DELTA = 0.0122
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

class TravelMap extends Component {
   constructor(props) {
      super(props)
      this.state = {
         region: {
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
         }
      }
   }

   componentDidMount() {
     this.onLocated()
   }

   componentWillReceiveProps(nextProps) {}

   onLocated() {
      const {currentUser} = this.props
      const region = Object.assign({}, this.state.region, currentUser.coordinate)
      this.setState({region})
   }

   onRequestDirection() {
      this.props.handleRequestDirection()
   }

   render() {
      const {travel} = this.props
      return (
         <View style={styles.container}>
            <MapView style={styles.map} region={this.state.region} >
               <Polyline coordinates={travel.directions} strokeWidth={3} strokeColor={mainStyle.color.skyblue}></Polyline>
               {travel.markers.map(marker => _markerSection(marker))}
            </MapView>
            <View style={styles.toolContainer}>
               <TouchableOpacity style={[styles.toolButton, styles.toolButtonAlert]} activeOpacity={0.6}>
                  <Icon name="bell" style={[styles.toolButtonIcon, styles.toolButtonIconAlert]}></Icon>
               </TouchableOpacity>
               <TouchableOpacity style={styles.toolButton} activeOpacity={0.6} onPress={this.onRequestDirection.bind(this)}>
                  <Icon name="location-arrow" style={styles.toolButtonIcon}></Icon>
               </TouchableOpacity>
               <TouchableOpacity style={styles.toolButton} activeOpacity={0.6} onPress={this.onLocated.bind(this)}>
                  <Icon name="arrows" style={styles.toolButtonIcon}></Icon>
               </TouchableOpacity>
            </View>
         </View>
      )
   }
}

//private methods
const _markerSection = (marker) => {
   const renderType = {
      self: () => (
         <View style={styles.member}>
            <Icon name='circle' style={styles.selfText}/>
         </View>
      ),
      member: () => (
         <View style={styles.member}>
            <Icon name='user' style={styles.memberText}/>
            <Text style={styles.memberText}>{marker.username}</Text>
         </View>
      ),
      leader: () => (
         <View style={styles.member}>
            <Icon name='user' style={styles.leaderText}/>
            <Text style={styles.leaderText}>{marker.username}</Text>
         </View>
      ),
      endPosition: () => (
         <View style={styles.member}>
            <Icon name='flag' style={styles.endText}/>
            <Text style={styles.endText}>終點</Text>
         </View>
      )
   }
   return (
      <Marker {...marker}>
         {renderType[marker.type]()}
      </Marker>
   )
}

TravelMap.propTypes = {
   handleRequestDirection: PropTypes.func,
   travel: PropTypes.object
}

export default TravelMap

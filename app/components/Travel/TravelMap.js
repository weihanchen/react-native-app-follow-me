'use strict'
import React, {Component, PropTypes} from 'react'
//plugins
import {Dimensions, Text, TextInput, TouchableOpacity, View} from 'react-native'
import {Button, Icon} from 'react-native-elements'
import MapView, {Marker, Polyline} from 'react-native-maps'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import FoundationIcon from 'react-native-vector-icons/Foundation'
//stylesheets
import styles from './styles'
import mainStyle from '../../stylesheets'
const screen = Dimensions.get('window')
const ASPECT_RATIO = screen.width / screen.height
const LATITUDE_DELTA = 0.0122
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

class TravelMap extends Component {
   constructor(props) {
      super(props)
      this.state = {
         region: {
            latitude: 0,
            longitude: 0,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
         }
      }
   }

   componentWillReceiveProps(nextProps) {
      if (nextProps.travel.status === 'update_region') {
         const region = Object.assign({}, this.state.region, nextProps.travel.region)
         this.setState({region})
      }
   }

   onChangeMode(mode) {
      this.props.handleChangeMode(mode)
   }

   onLeaveGroup() {
      this.props.handleLeaveGroup()
   }

   onLocated() {
      this.props.handleRequestRegion()
   }

   onRequestDirection() {
      this.props.handleRequestDirection()
   }

   render() {
      const {travel} = this.props
      console.log(travel)
      return (
         <View style={styles.container}>
            <MapView style={styles.map} region={this.state.region} onRegionChange={(region) => this.setState({region})}>
               <Polyline coordinates={travel.directions} strokeWidth={3} strokeColor={mainStyle.color.skyblue}></Polyline>
               {travel.markers.map(marker => _markerSection(marker))}
            </MapView>
            <View style={styles.topContainer}>
               <View style={styles.modeContainer}>
                  <TouchableOpacity style={_getModeStyle(travel.mode, 'driving')} activeOpacity={0.6} onPress={this.onChangeMode.bind(this, 'driving')}>
                     <FontAwesomeIcon name="car" style={styles.modeButtonIcon}></FontAwesomeIcon>
                  </TouchableOpacity>
                  <TouchableOpacity style={_getModeStyle(travel.mode, 'bicycling')} activeOpacity={0.6} onPress={this.onChangeMode.bind(this, 'bicycling')}>
                     <FontAwesomeIcon name="bicycle" style={styles.modeButtonIcon}></FontAwesomeIcon>
                  </TouchableOpacity>
                  <TouchableOpacity style={_getModeStyle(travel.mode, 'walking')} activeOpacity={0.6} onPress={this.onChangeMode.bind(this, 'walking')}>
                     <FontAwesomeIcon name="male" style={styles.modeButtonIcon}></FontAwesomeIcon>
                  </TouchableOpacity>
               </View>
            </View>
            <View style={styles.bottomContainer}>
               <View style={styles.leaveContainer}>
                  <Button raised title="離開隊伍"
                          backgroundColor={mainStyle.color.danger}
                          borderRadius={mainStyle.radius.medium}
                          icon={{name: 'sign-out', type: 'font-awesome'}} onPress={this.onLeaveGroup.bind(this)}></Button>

               </View>
               <View style={styles.toolContainer}>
                  <TouchableOpacity activeOpacity={0.6}>
                     <Icon raised name="bell" color={mainStyle.color.warning} type="font-awesome"></Icon>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.6} onPress={this.onRequestDirection.bind(this)}>
                     <Icon raised name="location-arrow" color={mainStyle.color.navy} type="font-awesome"></Icon>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.6} onPress={this.onLocated.bind(this)}>
                     <Icon raised name="arrows" color={mainStyle.color.navy} type="font-awesome"></Icon>
                  </TouchableOpacity>
               </View>
            </View>
         </View>
      )
   }
}

//private methods
const _getModeStyle = (activeMode, currentMode) => {
   const results = [styles.modeButton]
   if (activeMode === currentMode)
      results.push(styles.modeButtonActive)
   return results
}

const _markerSection = (marker) => {
   const renderType = {
      self: () => (
         <View style={styles.member}>
            <FontAwesomeIcon name='circle' style={styles.memberText}/>
         </View>
      ),
      member: () => (
         <View style={styles.member}>
            <FontAwesomeIcon name='user' style={styles.memberText}/>
            <Text style={styles.memberText}>{marker.username}</Text>
         </View>
      ),
      leader: () => (
         <View style={styles.member}>
            <FoundationIcon name="crown" style={styles.leaderText}></FoundationIcon>
            <Text style={styles.leaderText}>{marker.username}</Text>
         </View>
      ),
      endPosition: () => (
         <View style={styles.member}>
            <FontAwesomeIcon name='flag' style={styles.endText}/>
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
   handleChangeMode: PropTypes.func,
   handleLeaveGroup: PropTypes.func,
   handleRequestDirection: PropTypes.func,
   handleRequestRegion: PropTypes.func,
   travel: PropTypes.object
}

export default TravelMap

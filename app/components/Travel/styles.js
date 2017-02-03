import {StyleSheet} from 'react-native'
import MainStyle from '../../stylesheets'

export default StyleSheet.create({
   container: {
      ...StyleSheet.absoluteFillObject,
      flex: 1
   },
   map: {
      ...StyleSheet.absoluteFillObject
   },
   end: {
      borderColor: MainStyle.color.danger,
      borderRadius: 10,
      borderStyle: 'solid',
      borderWidth: 1,
      flexDirection: 'row'
   },
   endText: {
      color: MainStyle.color.blue,
      fontSize: MainStyle.font.medium,
      fontWeight: "bold",
      margin: 2
   },
   leaderText: {
      color: MainStyle.color.danger,
      fontSize: MainStyle.font.medium,
      fontWeight: "bold",
      margin: 2
   },
   leaveContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start'
   },
   member: {
      flexDirection: 'row'
   },
   memberText: {
      color: MainStyle.color.skyblue,
      fontSize: MainStyle.font.medium,
      fontWeight: "bold",
      marginRight: 2
   },
   messageContainer: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      ...StyleSheet.absoluteFillObject
   },
   modeButton: {
      alignItems: 'center',
      backgroundColor: MainStyle.color.white,
      borderColor: MainStyle.color.skyblue,
      borderRadius: 5,
      borderWidth: 1,
      flexDirection: 'column',
      height: 30,
      justifyContent: 'center',
      width: 30
   },
   modeButtonActive: {
      backgroundColor: MainStyle.color.skyblue
   },
   modeButtonIcon: {
      fontSize: MainStyle.font.big
   },
   modeButtonIconActive: {
      color: MainStyle.color.white
   },

   modeContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end'
   },
   bottomContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginLeft: 10,
      marginRight: 10,
      marginVertical: 40,
      ...StyleSheet.absoluteFillObject
   },
   toolContainer: {
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
   },
   topContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 10,
      marginRight: 10,
      marginLeft: 10
   }
})

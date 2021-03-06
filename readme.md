React-Native-App-Follow-Me
===
This application will help keep the car team traveling
## Requirements
* [Nodejs 7.1.0+](https://nodejs.org/en/)
* [NPM 3.10.9+](https://www.npmjs.com/)
* [React Native 0.39](https://facebook.github.io/react-native/docs/getting-started.html)
* SDK Platforms `Androis 6.0(Marshmallow)`
* SDK Tools
  * [Google Play services](https://developers.google.com/android/guides/setup)
  * `Android SDK Build-Tools 23.0.3+`

## Dependencies
* [react-native-animatable](https://github.com/oblador/react-native-animatable)
* [react-native-maps](https://github.com/airbnb/react-native-maps)
* [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)
* [react-native-elements](https://github.com/react-native-community/react-native-elements)
* [react-native-push-notification](https://github.com/zo0r/react-native-push-notification)

## Development
### General requirements before running project
>1. `$ npm install` install all dependencies
>2. `$ npm run link` link with android libraries
>3. edit app/config.js `GOOGLE_API_KEY = 'Your API Key'`

### Start with server
>1. Open an emulator(Android Studio/AVD Manager)
>2. `$ npm start`

### Running the Mobile Apps

#### Android
>1. [Offical document](http://facebook.github.io/react-native/docs/getting-started.html)
>2. Modify your google map api key in `./android/app/src/main/AndroidManifest.xml`

  ```xml
  <meta-data android:name="com.google.android.geo.API_KEY" android:value="YOUR_API_KEY"/>
  ```
>3. `$ npm run dev-android`
>4. on emulator then press `ctrl + m` can use reload、live reload、hot reload、remote debug

#### iOS
Pending...

## Resources ##
* google place search： [geocoding](https://developers.google.com/maps/documentation/geocoding/intro?hl=zh-tw#JSON)
* google directions： [directions](https://developers.google.com/maps/documentation/directions/intro?hl=zh-tw)
* Emulator's location: [Mock Location Plugin](http://www.jesusamieiro.com/android-studio-simulate-multiple-gps-points-with-mock-location-plugin/)

## Troubleshooting ##
### Unknown source file : UNEXPECTED TOP-LEVEL EXCEPTION:

  ```
  $  cd android/ && ./gradlew clean && cd .. && npm run run-android
  ```

### Unknown source file : com.android.dex.DexException: Multiple dex files define
Duplicate dependencies we can reference [here](https://medium.com/@suchydan/how-to-solve-google-play-services-version-collision-in-gradle-dependencies-ef086ae5c75f#.lc0a563d5)

### Running on real device cause Execution failed for task ':app:installDebug'.

trying some step like(recommand):
>1. `$ adb install ./android/app/build/outputs/apk/app-debug.apk`
>2. open the app
>3. `$ npm start`
>4. `$ adb reverse tcp:8081 tcp:8081`
>5. `$ npm run log-android`

or edit android/build.grandle
```
dependencies {
    classpath 'com.android.tools.build:gradle:1.3.1'//change this version like 1.2.0
}
```

### Could not find tools.jar

>1. Environment variables
>2. Setting JAVA_HOME=(Your java path)

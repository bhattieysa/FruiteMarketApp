import { Navigation } from "react-native-navigation";
import { SafeAreaView } from "react-native-safe-area-context"
import React, { useState, useRef, useEffect } from "react"
import {SplashScreen} from "react-native-splash-screen"
import OnBoarding from './components/OnBoarding';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import CartScreen from './screens/CartScreen';
import FavScreen from './screens/FavScreen';
import MyAccountScreen from './screens/MyAccountScreen';



 Navigation.registerComponent('HomeScreen', () => HomeScreen);
 Navigation.registerComponent('LoginScreen', () => LoginScreen);
 Navigation.registerComponent('OnBoarding', () => OnBoarding);  
 Navigation.registerComponent('SignupScreen', () => SignupScreen);  
 Navigation.registerComponent('CartScreen', () => CartScreen);
 Navigation.registerComponent('FavScreen', () => FavScreen);
 Navigation.registerComponent('MyAccountScreen', () => MyAccountScreen);  
 
 Navigation.events().registerAppLaunchedListener(() => {
  
  
   Navigation.setRoot({
     root: {
       stack: {
         id:'MyStack',
         children: [
           {
             component: {
               name: 'OnBoarding'
 
              
                 
              
             }
           }
         ]
       }
     }
   });
 });
 HomeScreen.options = {
  topBar: {
      visible: false,
  }, hardwareBackButton: {
    dismissModalOnPress: false,
    popStackOnPress: false,
  },popGesture: false

}
OnBoarding.options = {
  topBar: {
      visible: false
  }
}
LoginScreen.options = {
  topBar: {
      visible: false
  },  hardwareBackButton: {
    dismissModalOnPress: false,
    popStackOnPress: false,
  },popGesture: false
}
SignupScreen.options = {
  topBar: {
      visible: false
  }, 
}

CartScreen.options = {
  topBar: {
      visible: false
  },  hardwareBackButton: {
    dismissModalOnPress: false,
    popStackOnPress: false,
  },popGesture: false
}
FavScreen.options = {
  topBar: {
      visible: false
  },  hardwareBackButton: {
    dismissModalOnPress: false,
    popStackOnPress: false,
  },popGesture: false
}
MyAccountScreen.options = {
  topBar: {
      visible: false
  },  hardwareBackButton: {
    dismissModalOnPress: false,
    popStackOnPress: false,
  },popGesture: false
}



import { Navigation } from "react-native-navigation";
import { SafeAreaView } from "react-native-safe-area-context"
import React, { useState, useRef, useEffect } from "react"
import {SplashScreen} from "react-native-splash-screen"
import OnBoarding from './components/OnBoarding';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';



 Navigation.registerComponent('HomeScreen', () => HomeScreen);
 Navigation.registerComponent('LoginScreen', () => LoginScreen);
 Navigation.registerComponent('OnBoarding', () => OnBoarding);  
 Navigation.registerComponent('SignupScreen', () => SignupScreen);  
 
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
  },

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



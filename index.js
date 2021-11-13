import { Navigation } from "react-native-navigation";

// import App from "./App";

// Navigation.registerComponent('com.myApp.WelcomeScreen', () => App);
// Navigation.events().registerAppLaunchedListener(() => {
//    Navigation.setRoot({
//      root: {
//        stack: {
//          children: [
//            {
//              component: {
//                name: 'com.myApp.WelcomeScreen'
//             }
//            }
//          ]
//       }
//     }
//  });
// });


import OnBoarding from './components/OnBoarding';
import HomeScreen from './screens/HomeScreen';

 Navigation.registerComponent('HomeScreen', () => HomeScreen);
 Navigation.registerComponent('OnBoarding', () => OnBoarding);
 
 Navigation.events().registerAppLaunchedListener(() => {
   Navigation.setRoot({
     root: {
       stack: {
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
      visible: false
  }
}
OnBoarding.options = {
  topBar: {
      visible: false
  }
}
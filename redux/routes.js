import { Navigation } from "react-native-navigation";
import { SafeAreaView } from "react-native-safe-area-context"
import React, { useState, useRef, useEffect } from "react"

import OnBoarding from '../components/OnBoarding';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import CartScreen from '../screens/CartScreen';
import FavScreen from '../screens/FavScreen';
import MyAccountScreen from '../screens/MyAccountScreen';
import { RNNDrawer } from "react-native-navigation-drawer-extension";
import CustomDrawer from "../components/CustomDrawer"
import { Provider } from 'react-redux'
import reduxStore from './store'
import { withNavigationProvider, NavigationProvider } from 'react-native-navigation-hooks'
import { PersistGate } from 'redux-persist/integration/react'




const WrapScreen = (ReduxScreen, store,persistor) => props => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ReduxScreen {...props} />
    </PersistGate>
  </Provider>
);


export const registerScreens = (store,persistor) => {


  Navigation.registerComponent(
    'HomeScreen',
    () => withNavigationProvider(WrapScreen(HomeScreen, store,persistor)),
    () => HomeScreen,
  );


  Navigation.registerComponent(
    'LoginScreen',
    () => withNavigationProvider(WrapScreen(LoginScreen, store,persistor)),
    () => LoginScreen,
  );
  Navigation.registerComponent(
    'OnBoarding',
    () => withNavigationProvider(WrapScreen(OnBoarding, store,persistor)),
    () => OnBoarding,
  );
  Navigation.registerComponent(
    'SignupScreen',
    () => withNavigationProvider(WrapScreen(SignupScreen, store,persistor)),
    () => SignupScreen,
  );
  Navigation.registerComponent(
    'CartScreen',
    () => withNavigationProvider(WrapScreen(CartScreen, store,persistor)),
    () => CartScreen,
  );
  Navigation.registerComponent(
    'FavScreen',
    () => withNavigationProvider(WrapScreen(FavScreen, store,persistor)),
    () => FavScreen,
  );
  Navigation.registerComponent(
    'MyAccountScreen',
    () => withNavigationProvider(WrapScreen(MyAccountScreen, store,persistor)),
    () => MyAccountScreen,
  );




};



HomeScreen.options = {
  topBar: {
    visible: false,
  }, hardwareBackButton: {
    dismissModalOnPress: false,
    popStackOnPress: false,
  }, popGesture: false

}
OnBoarding.options = {
  topBar: {
    visible: false
  }
}
LoginScreen.options = {
  topBar: {
    visible: false
  }, hardwareBackButton: {
    dismissModalOnPress: false,
    popStackOnPress: false,
  }, popGesture: false
}
SignupScreen.options = {
  topBar: {
    visible: false
  },
}

CartScreen.options = {
  topBar: {
    visible: false
  }, hardwareBackButton: {
    dismissModalOnPress: false,
    popStackOnPress: false,
  }, popGesture: false
}
FavScreen.options = {
  topBar: {
    visible: false
  }, hardwareBackButton: {
    dismissModalOnPress: false,
    popStackOnPress: false,
  }, popGesture: false
}
MyAccountScreen.options = {
  topBar: {
    visible: false
  }, hardwareBackButton: {
    dismissModalOnPress: false,
    popStackOnPress: false,
  }, popGesture: false
}



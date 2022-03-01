import React from 'react'
import { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, AppState, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Navigation } from 'react-native-navigation';

import { SafeAreaView } from 'react-native-safe-area-context';
import { SideMenuView } from "react-native-navigation-drawer-extension";

import { Button } from 'react-native-elements';
import Header from '../components/Header';
import decode from 'jwt-decode';
import NetInfo from "@react-native-community/netinfo";
import { useDispatch, useSelector } from 'react-redux';
import * as AppAction from '../redux/actions/login';

import {
  widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import InternetConnection from '../components/InternetConnection';
import Toast from 'react-native-root-toast'



const HomeScreen = () => {
  const dispatch = useDispatch()
  const login = useSelector(state => state.login_reducer.isLoggedIn)
  const token = useSelector(state => state.login_reducer.token)




  //console.log(login)
  //console.log(token)


  useEffect(() => {
    if (token) {
      const decodedToken = decode(token)
      if (decodedToken.exp * 1000 < new Date().getTime()) {
          dispatch(AppAction.logout()),
          dispatch(AppAction.token(null))
      }
    }
  })



  return (



    <SafeAreaView style={{ flex: 1 }}>

      <Header />


      <InternetConnection />

      <View style={{ flex: 1 }}>

        <Text>Home Screen</Text>




      </View>
    </SafeAreaView>

  )
}

// Navigation.setDefaultOptions({
//   topBar: {
//     visible: true,
//     drawBehind: false,
//     animate: true,
//   }
// });
const styles = StyleSheet.create({



})

export default HomeScreen

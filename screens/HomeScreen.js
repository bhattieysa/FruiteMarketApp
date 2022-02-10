import React from 'react'
import {useState,useEffect,useRef} from "react";
import { View, Text, TouchableOpacity ,AppState} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Navigation } from 'react-native-navigation';

import { SafeAreaView } from 'react-native-safe-area-context';
import { SideMenuView } from "react-native-navigation-drawer-extension";

import { Button } from 'react-native-elements';
import Header from '../components/Header';






const HomeScreen = () => {

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  



   const showDialoge =()=>{






   }
  const clearOnboarding = async () => {
    try {

      await AsyncStorage.removeItem('@viewedOnboarding')

    } catch (err) {

    }
  }


  return (


   
    <SafeAreaView style={{ flex: 1 }}>
       
    <Header/>


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


export default HomeScreen

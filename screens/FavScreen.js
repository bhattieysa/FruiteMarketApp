import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Navigation} from 'react-native-navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import InternetConnection from '../components/InternetConnection';
const FavScreen = () => {

  const clearOnboarding = async () => {
    try {

      await AsyncStorage.removeItem('@viewedOnboarding')

    } catch (err) {

    }
  }


  return (
    <SafeAreaView style={{ flex: 1 }}>
         <Header/>
         <InternetConnection />
    <View style={{ flex: 1 }}>

      <Text>Account Screen</Text>

      <TouchableOpacity onPress={clearOnboarding}>
        <Text>Clear On Boarding</Text>






      </TouchableOpacity>



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


export default FavScreen

import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Navigation } from 'react-native-navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import axios from 'axios';
import {
  widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { Avatar, ActivityIndicator } from 'react-native-paper';
import Fontisto from 'react-native-vector-icons/Fontisto'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
const MyAccountScreen = () => {

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [cnic, setCnic] = useState("");
  const [mobile_number, setMobileNumber] = useState("");
  

  // run when bottom tab press
  Navigation.events().registerBottomTabSelectedListener((selectedTabIndex, unselectedTabIndex) => {

    axios({
      method: 'POST',
      url: "http://192.168.10.11:5000/api/user/myaccount",
      data: {
        mobile_number: '03069603634',

      },
      responseType: 'json',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOlt7ImlkIjo1OCwibmFtZSI6IkV5c2EgQXpoYXIiLCJjbmljIjoiMzg0MDMyNTY2Mzk3MSIsIm1vYmlsZV9udW1iZXIiOiIwMzA2OTYwMzYzNCIsInBhc3MiOiIkMmIkMTAkclBYbTBrQ0duMTBZeE1Ia0lDdTdSdUVocnRBNk5YMTkzcE9GZjkyb3RiVWlDQ1pISTJkVFMiLCJpbWFnZV91cmwiOiIzODQwMzI1NjYzOTcxLmpwZyJ9XSwiaWF0IjoxNjQ1NjEyOTM2LCJleHAiOjE2NDU2MTY1MzZ9.oklUSheJO6iZV6W8JRAV9d2IInr-6aCiLtuehyontrQ'
      }
    })
      .then(function (response) {

        //console.log(response.data)


        setImage(response.data.image_url)
        setName(response.data.name)
        setCnic(response.data.cnic)
        setMobileNumber(response.data.mobile_number)

       
      
      })
      .catch(function (error) {

        console.log("error", error)
      })

  });








  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <View style={{ flex: 1 }}>

        <View style={styles.imageView}>
          <Avatar.Image
            size={wp('30%')}
            source={{uri:`http://192.168.10.11:5000/image?image_url=${image}`}}
            // containerStyle={styles.item}
            style={{ marginBottom: wp('10%') }}
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>
        <View style={styles.accountView}>

          <Text style={{ fontSize: 25, fontWeight: '700' }}>Account Info</Text>

          <View style={styles.detailsView}>
            <Fontisto name="person" size={wp('7%')} />
            <View style={styles.innerDetailsView}>
              <Text style={{ fontSize: 15, fontWeight: '700' }}>Name</Text>
              <Text style={{ fontSize: 12, fontWeight: '400' }}>{name}</Text>
            </View>
          </View>
          <View style={styles.detailsView}>
            <FontAwesome5 name="id-card" size={wp('7%')} />
            <View style={styles.innerDetailsView}>
              <Text style={{ fontSize: 15, fontWeight: '700' }}>CNIC</Text>
              <Text style={{ fontSize: 12, fontWeight: '400' }}>{cnic}</Text>
            </View>
          </View>
          <View style={styles.detailsView}>
            <FontAwesome5 name="phone" size={wp('7%')} />
            <View style={styles.innerDetailsView}>
              <Text style={{ fontSize: 15, fontWeight: '700' }}>Mobile Number</Text>
              <Text style={{ fontSize: 12, fontWeight: '400' }}>{mobile_number}</Text>
            </View>
          </View>


        </View>







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


  imageView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('5%'),

    backgroundColor: '#69A03A'
  }, accountView: {
    flexDirection: 'column',
    margin: wp('10%')
  }, detailsView: {

    marginLeft: wp('3%'),
    marginTop: wp('8%'),
    flexDirection: 'row'
  },
  innerDetailsView: {
    flexDirection: 'column',
    marginLeft: wp('4%')
  }

})
export default MyAccountScreen

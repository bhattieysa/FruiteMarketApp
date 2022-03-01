import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'


import { Navigation } from 'react-native-navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import axios from 'axios';
import {
  widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { Avatar } from 'react-native-paper';
import Fontisto from 'react-native-vector-icons/Fontisto'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import * as api from '../apis/api';
import AsyncStorage from "@react-native-async-storage/async-storage"

import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import * as AppAction from '../redux/actions/login';
import { ActivityIndicator, Colors, Surface } from 'react-native-paper';
import InternetConnection from '../components/InternetConnection';
//import jsonwebtoken from 'jsonwebtoken';


const MyAccountScreen = () => {
  const dispatch = useDispatch()
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [cnic, setCnic] = useState("");
  const [pass, setPass] = useState("");
  const [user_id, setUserId] = useState("");
  const [mobile_number, setMobileNumber] = useState("");
  const [showLoading, setShowLoading] = useState(true);


  const token = useSelector(state => state.login_reducer.token)

  Navigation.events().registerBottomTabSelectedListener((selectedTabIndex, unselectedTabIndex) => {


if(selectedTabIndex.selectedTabIndex==3){
  axios({

    method: 'POST',
    url: api.MYACCOUNT_URL,
    data: {
      mobile_number: '03069603634',


    },

    responseType: 'json',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'authorization': token
    }
  })
    .then(function (response) {
      setShowLoading(false)
      //console.log(response.data)
     

      setImage(response.data.image_url)
      setName(response.data.name)
      setCnic(response.data.cnic)
      setMobileNumber(response.data.mobile_number)
      setPass(response.data.pass)
      setUserId(response.data.id)



    })
    .catch(function (error) {
      setShowLoading(false)
      console.log("error", error)
    })

  }

  })






  return (
    <SafeAreaView style={{ flex: 1 }}>

      {showLoading &&
        <View style={styles.loading}>
          <ActivityIndicator animating={true} size={'large'} color={Colors.green900} />
        </View>
      }
      <Header />
      <InternetConnection />
      <View style={{ flex: 1 }}>

        <View style={styles.imageView}>
          <Avatar.Image
            size={wp('30%')}
            source={{ uri: api.VIEWIMAGE_URL + image }}
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


        <View style={styles.logout}>

          <Button mode="contained" color='#69A03A' labelStyle={{ color: "white", fontSize: 15, fontWeight: '700' }}
            onPress={() => {
              dispatch(AppAction.logout()),
                dispatch(AppAction.token(null))
            }
            }>
            Logout
          </Button>
          <Text style={styles.editAccount} onPress={() => {

            Navigation.push('MyStack', {
              component: {
                name: 'EditAccountScreen',
                passProps:{
                  name:name,
                  cnic:cnic,
                  number:mobile_number,
                  pass:pass,
                  id:user_id

                }

              }
            })
          }}> Edit Account Info</Text>

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


  }, accountView: {
    flexDirection: 'column',
    marginRight: wp('10%'),
    marginLeft: wp('10%'),
    marginBottom: wp('10%')
  }, detailsView: {

    marginLeft: wp('3%'),
    marginTop: wp('8%'),

    flexDirection: 'row'
  },
  innerDetailsView: {
    flexDirection: 'column',
    marginLeft: wp('4%')
  },
  logout: {
    marginLeft: wp('15%'),
    marginRight: wp('15%'),

  }, loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center'
  },
  editAccount: {
    textAlign: 'center',
    margin: wp('3%'),
    fontSize: 15,
    fontWeight: '500',
    color: 'red'
  },

})
export default MyAccountScreen

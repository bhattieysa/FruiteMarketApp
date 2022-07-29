import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ToastAndroid, Alert, ImageBackground } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as api from '../apis/api';
import { Navigation } from 'react-native-navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native-elements';
import Header from '../components/Header';
import InternetConnection from '../components/InternetConnection';
import * as AppAction from '../redux/actions/login';
import { useState, useEffect, useRef } from "react";
import {
  widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Rating, AirbnbRating } from 'react-native-ratings';
const FavScreen = () => {
  const dispatch = useDispatch()
  const [API, setAPI] = useState(true);
  const [Like, setLike] = useState(false);
  const userId = useSelector(state => state.login_reducer.userId)
  const token = useSelector(state => state.login_reducer.token)
  const [API_DATA, setAPI_DATA] = useState('');
  const cart = useSelector(state => state.login_reducer.cart)
  

//   Navigation.events().registerBottomTabSelectedListener((selectedTabIndex, unselectedTabIndex) => {


//     if(selectedTabIndex.selectedTabIndex==2){


//     axios({

//       method: 'POST',
//       url: api.FAV_VIEW_FRUITES_URL,

//       data: {

//         user_id: userId


//       },
//       responseType: 'json',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'authorization': token
//       }
//     })
//       .then(function (response) {


//         const result = Object.keys(response.data).map(key => ( response.data[key]));

//         setAPI_DATA(result)
//         console.log("fav",response.data)
      

//       })
//       .catch(function (error) {

//         console.log("error", error)
//       })






//   }
// })
  // function AddToCart(fruite_id){


  //   axios({

  //       method: 'POST',
  //       url: api.HOME_ADDTOCART_FRUITES_URL,

  //       data: {

  //           fruite_id: fruite_id,
  //           user_id:userId


  //       },
  //       responseType: 'json',
  //       headers: {
  //           'Accept': 'application/json',
  //           'Content-Type': 'application/json',
  //           'authorization': token
  //       }
  //   })
  //       .then(function (response) {

  //           if (Platform.OS === 'android') {
  //               ToastAndroid.show(response.data.message, ToastAndroid.SHORT)
  //             } else {
  //               Alert.alert(response.data.message);
  //             }
  //       })
  //       .catch(function (error) {

  //           console.log("error", error)
  //       })



  //       }


  // useEffect(()=>{

   
  
  // },[])
  axios({

    method: 'POST',
    url: api.FAV_VIEW_FRUITES_URL,

    data: {

      user_id: userId


    },
    responseType: 'json',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'authorization': token
    }
  })
    .then(function (response) {

// remove objects
   //   const result = Object.keys(response.data).map(key => ( response.data[key]));

      setAPI_DATA(response.data)

    console.log("test",response.data)

    })
    .catch(function (error) {

      console.log("error", error)
    })

  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <InternetConnection />
      <View style={{ flex: 1 }}>
        <FlatList
          data={API_DATA}
          keyExtractor={item => item.id}
          renderItem={({ item }) =>


            <View style={styles.fruiteView}>
              <Image
                source={{ uri: item.image }}
                style={styles.fruiteImage}

                imageStyle={{ borderRadius: 10 }}



              />
              <View style={styles.nameView}>

                <Text style={styles.fruiteTitle}> {item.name} </Text>
                <Text style={styles.fruiteCategory}>{item.category_name}</Text>

                <Rating
                  type='star'

                  onFinishRating={(rating) => { console.log(rating) }}
                  style={styles.rattings}
                  ratingCount={5}
                  startingValue={item.ratings}
                  imageSize={16}
                  readonly


                />



              </View>
              <View style={styles.nameView}>
                <Text style={styles.fruitePrice}> {item.price}Rs {item.unit}  </Text>
                <Button mode="contained" color='#CC7D00' labelStyle={{ color: "white", fontSize: 10, fontWeight: '600' }}
                  // disabled={!isValid}
                  // onPress={handleSubmit}
                  style={{ alignSelf: 'flex-end', borderRadius: 7, marginTop: hp('4%') }}
                  onPress={() => {
                     // CHECK ALREADY EXIST OR NOT
                    const results = cart.filter(cartItem => cartItem.id === item.id);

                    if (results!="") { 
                     console.log("eysaa",item)

            if (Platform.OS === 'android') {
                ToastAndroid.show("Product Already Exist In Cart", ToastAndroid.SHORT)
              } else {
                Alert.alert('Product Already Exist In Cart');
              }
                    } else {

                      // ADD quantity to already existing JSON
                      item.quantity = 1
                      //console.log(item)
                      dispatch(AppAction.cart(item))
                      if (Platform.OS === 'android') {
                        ToastAndroid.show("Product Added Successful", ToastAndroid.SHORT)
                      } else {
                        Alert.alert('Product Added Successful');
                      }

                    }
                  }
                  }
                >
                  Add To Cart
                </Button>

              </View>


            </View>
          }



        />





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

  fruiteView: {
    marginTop: wp('5%'),

    marginLeft: wp('3%'),
    marginRight: wp('3%'),
    flexDirection: 'row',
    flex: 1
  },

  fruiteTitle: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginTop: hp('2%'),
    alignSelf: 'flex-start',

    marginLeft: hp('1%')



  },
  fruitePrice: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
    marginTop: hp('2%'),



    alignSelf: 'flex-end'




  },
  fruiteImage: {

    height: hp('15%'),
    width: wp('27%'),


    borderRadius: 15

  },
  rattings: {

    marginTop: hp('1%'),

    alignItems: 'flex-start',
    marginLeft: hp('1.2%')
  },
  nameView: {
    flexDirection: 'column',
    flex: 1
  },
  fruiteCategory: {
    marginLeft: hp('1.1%'),
    marginTop: hp('0.5%'),
    fontSize: 15

  }



})


export default FavScreen

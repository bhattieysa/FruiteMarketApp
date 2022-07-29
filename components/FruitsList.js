import React from 'react';
import { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, AppState, StyleSheet, FlatList, ImageBackground, Dimensions ,Alert,ToastAndroid} from 'react-native'
import axios from 'axios';
import * as api from '../apis/api';
import Ionicons from 'react-native-vector-icons/FontAwesome5'
import {
  widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { RNNDrawer } from "react-native-navigation-drawer-extension";
import { Image } from 'react-native-elements';
import { ActivityIndicator, Colors, Surface } from 'react-native-paper';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { white } from 'react-native-paper/lib/typescript/styles/colors';
import { useDispatch, useSelector } from 'react-redux';
import LikeFruite from './LikeFruite';
import { Navigation } from 'react-native-navigation'




const FruiteList = ({ id,category_name }) => {

  const [API_DATA1, setAPI_DATA1] = useState('');
  const [API, setAPI] = useState(true);
  const [Like, setLike] = useState(false);
  const userId = useSelector(state => state.login_reducer.userId)
  const token = useSelector(state => state.login_reducer.token)


    if (API) {
     


        axios({

          method: 'POST',
          url: api.HOME_FRUITES_URL,

          data: {
            category_id: id,
            user_id:userId
          },
          responseType: 'json',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
             'authorization': token
          }
        })
          .then(function (response) {

           

           
          

            
            
            setAPI_DATA1(response.data)
           // console.log(response.data)
            setAPI(false)

          })
          .catch(function (error) {

            console.log("error4", error)
          })


    



    }

  function  viewFruite(id,name,image,price,details,ratings,unit,category_id,category_name) {
    Navigation.push('MyStack', {
      component: {
          name: 'FruiteScreen',
          id: 'HOME_SCREEN_ID',
          passProps: {
            id: id,
            name: name,
            image:image,
            price: price,
            details: details,
            ratings: ratings,
            unit: unit,
            category_id: category_id,
            category_name: category_name,
            
          }

      }
  })
  }


function buttomPressEvent(user_id,fruite_id,like){
 


  axios({

      method: 'POST',

      url: like? api.HOME_UNLIKE_FRUITES_URL : api.HOME_LIKE_FRUITES_URL,

      data: {
          user_id: user_id,
          fruite_id: fruite_id


      },
      responseType: 'json',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'authorization': token
      }
  })
      .then(function (response) {

        setAPI_DATA1(API_DATA1=>API_DATA1.map(data=>data.id===fruite_id ? {...data,like:!like} :data))
         
          
              // Toast.show(response.data.message, {
              //     duration: Toast.durations.LONG,
              //     position: Toast.positions.BOTTOM,
              //     shadow: true,
              //     animation: true,
              //     hideOnPress: true,
              // });
              if (Platform.OS === 'android') {
                  ToastAndroid.show(response.data.message, ToastAndroid.SHORT)
                } else {
                  Alert.alert(response.data.message);
                }



      })
      .catch(function (error) {

          console.log("error5", error)
      })



  }



  return (
    <FlatList
      horizontal
      pagingEnabled={true}
      showsHorizontalScrollIndicator={false}
      legacyImplementation={false}
      data={API_DATA1}
      keyExtractor={item => item.id}
      renderItem={({ item }) =>
        <View style={styles.fruiteView}>
           <TouchableOpacity activeOpacity = { .5 } onPress={ ()=>{viewFruite(item.id,item.name,item.image,item.price,item.details,item.ratings,item.unit,item.category_id,category_name)}}>
          <ImageBackground
            source={{ uri: item.image }}
            style={styles.fruiteImage}
            
            imageStyle={{ borderRadius: 10 }}>






<LikeFruite fruite_id={item.id} like={item.like} buttomPressEvent={buttomPressEvent} />





       


          </ImageBackground>
          </TouchableOpacity>

          <Rating
            type='star'

            onFinishRating={(rating) => { console.log(rating) }}
            style={styles.rattings}
            ratingCount={5}
            startingValue={item.ratings}
            imageSize={16}
            readonly


          />
          <Text style={styles.fruiteTitle}> {item.name} </Text>
          <Text style={styles.fruitePrice}> 
          
          
          {item.price}Rs {item.unit}  </Text>


        



        </View>
      }

    />

  );
}
const styles = StyleSheet.create({

  fruiteView: {
    marginTop: wp('2%'),
    marginBottom: wp('8%'),
    marginLeft: wp('2%'),
    marginRight: wp('2%'),
  },

  fruiteTitle: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
    marginTop: hp('0.5%'),
    width:wp('25%'),
    textAlign: 'center',
 
   
  },
  fruitePrice: {
    fontSize: 11,
    color: 'black',
    marginTop: 3,
    textAlign: 'center',

  },
  fruiteImage: {

    height: hp('15%'),
    width: wp('27%'),

    alignItems: 'flex-end',

  },
  rattings: {

    marginTop: hp('1%'),

    alignItems: 'flex-start',
  },
  



})

export default FruiteList;
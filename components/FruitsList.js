import React from 'react';
import { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, AppState, StyleSheet, FlatList, ImageBackground, Dimensions } from 'react-native'
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




const FruiteList = ({ id }) => {

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

           

           
          
          
            const result = Object.keys(response.data).map(key => ( response.data[key]));


            
            
            setAPI_DATA1(result)
           // console.log(response.data)
            setAPI(false)

          })
          .catch(function (error) {

            console.log("error4", error)
          })


    



    }

  function  viewFruite(id,name,image,price,details) {
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
            
          }

      }
  })
  }



  return (
    <FlatList
      horizontal
      pagingEnabled={true}
      showsHorizontalScrollIndicator={false}
      legacyImplementation={false}
      data={API_DATA1}
      keyExtractor={item => item[0].id}
      renderItem={({ item }) =>
        <View style={styles.fruiteView}>
           <TouchableOpacity activeOpacity = { .5 } onPress={ ()=>{viewFruite(item[0].id,item[0].name,item[0].image,item[0].price,item[0].details)}}>
          <ImageBackground
            source={{ uri: item[0].image }}
            style={styles.fruiteImage}
            
            imageStyle={{ borderRadius: 10 }}>

{item[0].like == false? 

<LikeFruite fruite_id={item[0].id} like={false}/>


: 
<LikeFruite fruite_id={item[0].id} like={true} />


 }


       


          </ImageBackground>
          </TouchableOpacity>

          <Rating
            type='star'

            onFinishRating={(rating) => { console.log(rating) }}
            style={styles.rattings}
            ratingCount={5}
            startingValue={item[0].ratings}
            imageSize={16}
            readonly


          />
          <Text style={styles.fruiteTitle}> {item[0].name} </Text>
          <Text style={styles.fruitePrice}> 
          
          
          {item[0].price}Rs {item[0].unit}  </Text>


        



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
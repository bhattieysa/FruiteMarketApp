import React from 'react'
import { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, AppState, StyleSheet, FlatList } from 'react-native'


import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '../components/Header';
import decode from 'jwt-decode';
import axios from 'axios';
import * as api from '../apis/api';
import { useDispatch, useSelector } from 'react-redux';
import * as AppAction from '../redux/actions/login';
import { Image } from 'react-native-elements';
import {
  widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import InternetConnection from '../components/InternetConnection';
import { ActivityIndicator, Colors, Surface } from 'react-native-paper';
import { Navigation } from 'react-native-navigation';
import FruiteList from '../components/FruitsList';


const HomeScreen = () => {
  const dispatch = useDispatch()

  const token = useSelector(state => state.login_reducer.token)
  const userId = useSelector(state => state.login_reducer.userId)
  const [showLoading, setShowLoading] = useState(true);
  const [API_DATA, setAPI_DATA] = useState('');
  const [API, setAPI] = useState(true);


  const componentMounted = useRef(true);


  // const componentMounted = useRef(true); // (3) component is mounted

  useEffect(() => {
    if (token) {
      const decodedToken = decode(token)
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch(AppAction.logout()),
          dispatch(AppAction.token(null))
      }
//       if (componentMounted.current){ 
  
//       fetchMyAPI()
     
          
      
    
//     }
//   }
//   return () => { // This code runs when component is unmounted
//     componentMounted.current = false; // (4) set it to false when we leave the page
// }
    }
  })
 

  if(API) {

setAPI(false)

    axios({

        method: 'GET',
        url: api.HOME_FRUITE_CATEGORIES_URL,


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
       
  
        setAPI_DATA(response.data)
     
       
  
  
      })
      .catch(function (error) {
        setShowLoading(false)
        console.log("error", error)
      })
  




      // //....For Multiple URL RUNS
      // axios.all([API1, API2]).then(axios.spread((...response) => {

      //   setAPI_DATA(response[0].data)
      //   setAPI_DATA1(response[1].data)
      //   if (response[0].data && response[1].data) {
      //     setShowLoading(false)
      //     setAPI(false)
      //   }


      // })) .catch(function (error) {

      //   setShowLoading(false)
      //   setAPI(false)
      //   console.log("error", error)
      // })






    }
 
  







  return (



    <SafeAreaView style={{ flex: 1 }}>
      {showLoading &&
        <View style={styles.loading}>
          <ActivityIndicator animating={true} size={'large'} color={Colors.green900} />
        </View>
      }
      <Header />


      <InternetConnection />

      <View style={{ flex: 1, padding: wp('3%') }}>


        <FlatList
          data={API_DATA}
          keyExtractor={item => item.id}
          renderItem={({ item }) =>
          
            <View>
            
              <View style={styles.categoriesTitleView}>
                <Text style={styles.categoriesTitle}> {item.name} </Text>
                <Text style={styles.categoriesDiscount}>  ({item.discount}% off)</Text>
              </View>
              <View style={styles.categoriesDetailsView}>
                <Text style={styles.categoriesDetailsTitle}> {item.details} </Text>
              </View>

            <FruiteList id={item.id} category_name={item.name}/>
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



  categoriesTitleView: {
    flexDirection: 'row'
  },

  categoriesTitle: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold'
  },
  categoriesDiscount: {
    fontSize: 15,
    color: '#4CA300',
    fontWeight: 'bold'
  },
  categoriesDetailsView: {
    marginTop: wp('2%'),
    
  },
  categoriesDetailsTitle: {
    fontSize: 13,
    color: 'black',

  
  },
  fruiteView: {
    marginTop: wp('2%'),
    marginBottom: wp('8%'),
    marginLeft:wp('2%'),
    marginRight:wp('2%'),
  },
  
  fruiteTitle: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
    marginTop:hp('1%')
  },
  fruitePrice: {
    fontSize: 10,
    color: 'black',
   
  },
  fruiteImage: {
   
   height:hp('15%'),
   width:wp('27%'),
   borderRadius: 10,
  },


  loading: {
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

})

export default HomeScreen

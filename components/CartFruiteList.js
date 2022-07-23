import React from 'react';
import { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, AppState, StyleSheet, FlatList, ImageBackground, Dimensions, ToastAndroid, Alert, } from 'react-native'
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
import AntDesign from 'react-native-vector-icons/AntDesign'
import CartQuantity from './CartQuantity';
import Toast from 'react-native-root-toast'
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as AppAction from '../redux/actions/login';

const CartFruiteList = ({ id, sendDataToParent }) => {
  const dispatch = useDispatch()
  var [API_DATA1, setAPI_DATA1] = useState('');
  const [TotalPrice, setTotal] = useState('');
  const [API, setAPI] = useState(true);
  const [Quantity, setQuantity] = useState(1);
  const userId = useSelector(state => state.login_reducer.userId)
  const token = useSelector(state => state.login_reducer.token)
  const cart = useSelector(state => state.login_reducer.cart)
// REMOVE 0 ,1,2, Indexes
  //const result = Object.keys(cart).map(key => ( cart[key]));
// SEARCH FROM JSON
	const duplicates =cart.filter(cartItem => cartItem.category_id === id);

// useEffect(() => {
//   duplicates.map(ele=>{

//     var total=ele.price*ele.quantity

//     x=parseInt(x)+parseInt(total)
    
    
//     })
//     if(x!=0){
//     sendDataToParent(x);

//     }
// });




  var x =0
  var sum=0


  


 


  function viewFruite(id, name, image, price, details) {
    Navigation.push('MyStack', {
      component: {
        name: 'FruiteScreen',
        id: 'HOME_SCREEN_ID',
        passProps: {
          id: id,
          name: name,
          image: image,
          price: price,
          details: details,

        }

      }
    })
  }
   function Delete(fruite_id) {


    const result = Object.keys(cart).map(key => ( cart[key]));
    const updatedCart = cart.filter(cartItem => cartItem.id !== fruite_id);



console.log("test1",updatedCart)


      //console.log(updatedCart)
      dispatch(AppAction.deleteCart(updatedCart))
     
      //console.log(cart)
    // axios({

    //   method: 'POST',
    //   url: api.CART_QUANTITY_URL,

    //   data: {
    //     user_id: userId,

    //     fruite_id: fruite_id,


    //   },
    //   responseType: 'json',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //     'authorization': token
    //   }
    // })
    //   .then(function (response) {


    //     if (Platform.OS === 'android') {
    //       ToastAndroid.show(response.data.message, ToastAndroid.SHORT)
    //     } else {
    //       Alert.alert(response.data.message);
    //     }





    //   })
    //   .catch(function (error) {

    //     console.log("error", error)
    //   })

  }




  return (


    <FlatList

      pagingEnabled={true}

      showsVerticalScrollIndicator={false}
      legacyImplementation={false}
      data={duplicates}
      keyExtractor={item => item.id}
      renderItem={({ item }) =>



        <View style={styles.fruiteView}>


          

       
          <View style={{ padding: 12, flexDirection: 'row', }}>
            <Image
              source={{ uri: item.image }}
              style={styles.fruiteImage}
              imageStyle={{ borderRadius: 10 }}
            />
            <View style={styles.nameView}>
              <Text style={styles.fruiteTitle}>{item.name} </Text>
              <Text style={styles.fruitePrice}>{item.price} {item.unit}</Text>
            </View>

            <View style={styles.iconView}>
              <AntDesign name="delete" size={hp('2.5%')} style={{ alignSelf: 'flex-end' }} onPress={() => { Delete(item.id) }} />


              <CartQuantity quantity={item.quantity} fruite_id={item.id} category_id={id}/>

            </View>

          </View>
        </View>
      }



    />
    


  );
}
const styles = StyleSheet.create({

  fruiteView: {

    marginTop: wp('2%'),
    backgroundColor: 'white',

  },

  fruiteTitle: {

    fontSize: 17,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: hp('2%'),
    marginTop: hp('2%'),

  },

  fruiteImage: {

    height: hp('10%'),
    width: wp('21%'),
    marginLeft: wp('2.5%'),
    borderRadius: 15

  },
  fruitePrice: {
    marginLeft: hp('2%'),
    marginTop: hp('0.5%'),
    fontSize: 15

  },
  nameView: {
    flexDirection: 'column',
    flex: 1
  },
  iconView: {
    marginRight: wp('2.5%')
  },
  quantityView: {
    flexDirection: 'row',
    flex: 1,

    justifyContent: 'flex-end',

    marginTop: wp('10%')

  },

  minusView: {



    width: wp('6%'),
    height: wp('6%'),
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },

  minus: {

    fontSize: 25,

    height: wp('8%'),


  },
  plusView: {


    width: wp('6%'),
    height: wp('6%'),
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },

  plus: {

    fontSize: 20,

    height: wp('7%'),


  },
  quantity: {
    fontSize: 15,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 3,

  },




})

export default CartFruiteList;
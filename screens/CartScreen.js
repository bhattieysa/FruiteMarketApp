import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Navigation } from 'react-native-navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { Button, Image } from 'react-native-paper';
import InternetConnection from '../components/InternetConnection';
import {
  widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import * as api from '../apis/api';
import { useState, useEffect, useRef } from "react";
import CartFruiteList from '../components/CartFruiteList';
const CartScreen = () => {

  const [API, setAPI] = useState(true);

  const userId = useSelector(state => state.login_reducer.userId)
  const cart = useSelector(state => state.login_reducer.cart)



// REMOVE 0 ,1,2, Indexes
  //const result = Object.keys(cart).map(key => ( cart[key]));
 // console.log("eysa",Object.keys(cart).map(key => ( cart[key])))
// GET DATA WITHOUT DUPLICATE FROM JSON
//https://thewebdev.info/2021/02/23/how-to-remove-duplicates-from-an-array-of-objects-in-javascript/
  const result1 = cart.filter((thing, index, self) =>
  index === self.findIndex((t) => (
    t.category_id === thing.category_id 
  ))
)

 var sortData=result1.sort((a, b) => a['id'] - b['id'])




 
    


  const token = useSelector(state => state.login_reducer.token)
  const [API_DATA, setAPI_DATA] = useState('');

  var [TotalPrice, setTotalPrice] = useState('0');
var price=0;



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#E6E6E6' }}>
      <Header />
      <InternetConnection />

      <FlatList
        data={sortData}
        keyExtractor={item => item.id}
        renderItem={({ item }) =>
          <View style={{ flex: 1 }}>

            
            <View style={styles.fruiteCategoryView}>
              <Text style={styles.fruiteCategoryName}>{item.category_name}</Text>
            </View>

            {/* <CartFruiteList id={item.category_id} sendDataToParent={sendDataToParent} /> */}
            <CartFruiteList id={item.category_id} />
          </View>
        }
      />
      <View style={styles.orderView}>


{
cart.map(ele=>{

var total=ele.price*ele.quantity


price=parseInt(price)+parseInt(total)


})


}

<Text style={styles.orderPrice}>Total {price}</Text>


        <Button
          style={styles.orderButton}
        mode="contained" color='#769E49'
        onPress={()=>{
          
          
      
          Navigation.push('MyStack', {
            component: {
              name: 'PaymentScreen',
              passProps:{
              cart:cart

              }

            }
          })
        
         
      
        
        
        
        
        }}
        labelStyle={{ color: "white", fontSize: 10, fontWeight: '600' }}
        > Place Order</Button>
      </View>



    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  fruiteCategoryView: {

    marginTop: wp('2%'),
    marginLeft: wp('3%'),


  },
  fruiteCategoryName:{

    fontSize:20,
    fontWeight:'700'
  },


  orderView: {
    flexDirection:'row',

 height:hp('7%'),  
    paddingLeft: wp('3%'),
    paddingRight: wp('3%'),
    backgroundColor:'white',
   



  },
  orderButton: {
 
  
    marginTop:wp('3%'),
    marginBottom:wp('3%'),
    justifyContent:'center',
    borderRadius:7
    



    
  
  },
  orderPrice:{
 marginTop:wp('5%'),
 marginBottom:wp('5%'),
 flex:1,
 fontSize:15,
 fontWeight:'bold'

  },



})

// Navigation.setDefaultOptions({
//   topBar: {
//     visible: true,
//     drawBehind: false,
//     animate: true,
//   }
// });


export default CartScreen

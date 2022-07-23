import React from 'react';
import { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, AppState, StyleSheet, FlatList, ImageBackground, Dimensions } from 'react-native'

import {
    widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as loc,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';

import { useDispatch, useSelector } from 'react-redux';

import * as AppAction from '../redux/actions/login';



const CartQuantity = ({ quantity, fruite_id, category_id }) => {
    const dispatch = useDispatch()
    const [API_DATA1, setAPI_DATA1] = useState('');
    const [API, setAPI] = useState(true);
    const [Quantity, setQuantity] = useState(quantity);
    const userId = useSelector(state => state.login_reducer.userId)
    const token = useSelector(state => state.login_reducer.token)

    const cart = useSelector(state => state.login_reducer.cart)
    // REMOVE 0 ,1,2, Indexes
    //const result = Object.keys(cart).map(key => (cart[key]));
    // SEARCH FROM JSON
    const duplicates = cart.filter(cartItem => cartItem.id === fruite_id);





    function Increment() {
        var increment = parseInt(Quantity) + 1;

        setQuantity(increment)


        // Update Data in JSON
        for (var i = 0; i < duplicates.length; i++) {
            if (duplicates[i].id === fruite_id) {
                duplicates[i].quantity = increment;
            }
        }

        const updatedCart = cart.filter(cartItem => cartItem.id !== fruite_id);



     
        
        
              //console.log(updatedCart)
              dispatch(AppAction.deleteCart(updatedCart))


console.log(duplicates[0])
        //UPLOAD Updated Quantity Into Redux
        dispatch(AppAction.cart(duplicates[0]))
    }
    function Decrement() {
        var decrement = parseInt(Quantity) - 1;
        setQuantity(decrement)
        // Update Data in JSON
        for (var i = 0; i < duplicates.length; i++) {
            if (duplicates[i].id === fruite_id) {
                duplicates[i].quantity = decrement;


            }
        }

 const updatedCart = cart.filter(cartItem => cartItem.id !== fruite_id);



     
        
        
              //console.log(updatedCart)
              dispatch(AppAction.deleteCart(updatedCart))


        //UPLOAD Updated Quantity Into Redux
        dispatch(AppAction.cart(duplicates[0]))
    }


    return (



        <View style={styles.quantityView}>
            <TouchableOpacity onPress={() => {
                if (Quantity >= 2) {
                    Decrement()


                }

            }}>
                <View style={styles.minusView}>

                    <Text style={styles.minus}>-</Text>

                </View>
            </TouchableOpacity>
            {




            }
            <Text style={styles.quantity}>{Quantity}</Text>

            <TouchableOpacity onPress={() => { Increment() }}>
                <View style={styles.plusView} >

                    <Text style={styles.plus}>+</Text>

                </View>
            </TouchableOpacity>
        </View>









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

export default CartQuantity;
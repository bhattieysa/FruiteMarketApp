import React, { useState, useEffect} from 'react'
import { View, Text, TextInput, Button, Alert,StyleSheet } from "react-native";
import { PaymentView } from '../components/PaymentView'
import axios  from 'axios';
import * as api from '../apis/api';
import { getClientToken } from '../apis/apiCalls';

import stripe from 'react-native-stripe-payments';



stripe.setOptions({ publishingKey: 'pk_test_51L415IJiREfmU884Sg6ttsAxCe5hc1OosBTqAu2VmS3QgnYOaQFXiNgoIAtvZJeh1vNnqYDXrJyhLR8N3IxouEsu002jck3cpk' });

const PaymentScreen =  () => {

    const [name, setName] = useState("");




  const subscribe = async () => {

      // sending request
      const response = await fetch("http://192.168.10.4:5000/api/stripe/payment", {
        method: "POST",
        body: JSON.stringify({ name }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data)

      const clientSecret = data.clientSecret;



      const cardDetails = {
        number: '4242424242424247',
        expMonth: 10,
        expYear: 2026,
        cvc: '888',
      }
      stripe.confirmPayment(clientSecret, cardDetails)
        .then(result => {
          // result of type PaymentResult
          console.error(result);
          Alert.alert("Payment complete, thank you!");
        })
        .catch(err =>{
            console.error(err);
            Alert.alert("Something went wrong, try again later!");
        }
        )




    //   const initSheet = await stripe.initPaymentSheet({
    //     paymentIntentClientSecret: clientSecret,
    //   });
    //   if (initSheet.error) return Alert.alert(initSheet.error.message);
    //   const presentSheet = await stripe.presentPaymentSheet({
    //     clientSecret,
    //   });
    //   if (presentSheet.error) return Alert.alert(presentSheet.error.message);






  };









return (

    <View>
      <TextInput
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Name"
        style={{
          width: 300,
          fontSize: 20,
          padding: 10,
          borderWidth: 1,
        }}
      />
      <Button title="Subscribe - 25 INR" onPress={subscribe} />
    </View>

)}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    
})

 export default PaymentScreen 
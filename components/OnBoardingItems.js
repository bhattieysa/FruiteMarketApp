
import React from 'react';
import { Text, useWindowDimensions, View, Image,StyleSheet } from 'react-native';



// This is the Intro slider screen 
const OnBoardingItem = ({ item }) => {
  const { width } = useWindowDimensions();
  


  return (
    <View style={[styles.container, { width }]}>

      <Image source={item.image} style={[styles.image, { resizeMode: 'contain' },{flex:0.5}]} />
      <View style={{flex:0.5}} >

        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        




      </View>
      

    </View>
    
    
  );
};


export default OnBoardingItem;


const styles = StyleSheet.create({

    container: {
     flex:1,
     flexDirection:'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
       
     
      justifyContent: 'center',
     
      
      
    },
    title: {
      fontWeight:'400',
      fontSize:20,
      color:'#2F2E41',
      textAlign:'center',
      paddingHorizontal:64,
      marginBottom:20
  
    },
    description: {
      
      fontSize:15,
      color:'#78787C',
      textAlign:'center',
      paddingHorizontal:64,
  
    },
  })
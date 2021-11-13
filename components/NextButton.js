import React,{useState,useRef,useEffect} from "react"

import { FlatList, View,StyleSheet ,Text,Animated, TouchableOpacity} from "react-native"
import Svg,{G,Circle} from 'react-native-svg'
import AntDesign from 'react-native-vector-icons/AntDesign'



const NextButton = ({percentage,scrollTo}) => {
    const size=128;
    const strokeWidth=2;
    const center=size/2;
    const radius=size/2-strokeWidth/2
    const circumference=2*Math.PI * radius

    const progressAnimation=useRef(new Animated.Value(0)).current
    const progressRef=useRef(null)
   


    const animation=(toValue)=>{
        return Animated.timing(progressAnimation,{
            toValue,
            duration:250,
            useNativeDriver:true
        }).start
    }
    // useEffect(()=>{
    //     animation(percentage)
      
    // },[percentage])
    // useEffect(()=>{
    //     console.log("test=>")
    //     progressAnimation.addListener((value)=>{
    //         const strokeDashoffset=circumference- (circumference* value.value)/100

    //         if(progressRef?.current){
    //             progressRef.current.setNativeProps({
    //                 strokeDashoffset
                    
    //             })
    //             console.log("eysa")
    //         }
    //     },[percentage])
    //     return ()=>{
    //         progressAnimation.removeAllListeners()
    //     }
    // },[])
 


return(

    <View style={styles.container} >
       <Svg width={size} height ={size}>
           <G rotation="-90" origin={center}>
            <Circle
            stroke="#E6E7E8" 
            cx={center} 
            cy={center} 
            r={radius} 
            strokeWidth={strokeWidth}
            

            
            
            />



                <Circle
                        stroke="#F4338F" 
                        cx={center} 
                        cy={center} 
                        r={radius} 
                        strokeWidth={strokeWidth}
                        ref={progressRef}

                        strokeDasharray={circumference}
                        strokeDashoffset={circumference- (circumference* percentage)/100}
                       
                        
                        />
           </G>
           


       </Svg>
       <TouchableOpacity onPress={scrollTo} style={styles.button} activeOpacity ={0.6}>
<AntDesign name="arrowright" size={32} color="#fff"/>

       </TouchableOpacity>

      
    </View>
)
};
const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'


    },
    button:{
        position:'absolute',
        backgroundColor:'#f4338f',
        borderRadius:100,
        padding:20,
    }
})

export default NextButton

import React, { useState, useRef, useEffect } from "react"
import slides from "../backend/slides"
import { FlatList, View, StyleSheet, Text, Animated ,SafeAreaView} from "react-native"
import { Navigation } from 'react-native-navigation';
import OnBoardingItem from "./OnBoardingItems"
import Paginator from "../components/Paginator"
import NextButton from "./NextButton"

import SplashScreen from 'react-native-splash-screen'
import AsyncStorage from "@react-native-async-storage/async-storage"
import Home from "../screens/HomeScreen"



const OnBoarding = (props) => {
  
  const [viewedOnboarding, setViewedOnBoarding] = useState(false)

  useEffect(() => {
    SplashScreen.hide()
    checkOnboarding()
    if (viewedOnboarding) {
      HomeScreen()
    }



  })

  const checkOnboarding = async () => {

    try {
      const value = await AsyncStorage.getItem('@viewedOnboarding')

      if (value !== null) {
        setViewedOnBoarding(true)
      }



    } catch (err) {
      console.log('Error @checkOnboarding:', err)



    }

  }





  const HomeScreen = () => {
    Navigation.registerComponent('HomeScreen', () => Home);
    Navigation.push(props.componentId, {
      component: {
        name: 'HomeScreen',

      }
    })
  }

  const [currentIndex, setCurrentIndex] = useState(0)

  const scrollx = useRef(new Animated.Value(0)).current
  const slidesRef = useRef(null)


  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index)
  }).current



  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 }).current

  const scrollTo = async () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 })
    } else {

      // Last Item Of Slide
      Navigation.registerComponent('HomeScreen', () => Home);

      Navigation.push(props.componentId, {
        component: {
          name: 'HomeScreen',



        }
      })

      try {
        await AsyncStorage.setItem('@viewedOnboarding', 'true')

      } catch (err) {




      }
    }

  }


  return (
    <SafeAreaView>


      <View style={[styles.container]} >





        <FlatList
          style={{ flex: 2 }}
          data={slides}
          renderItem={({ item }) => <OnBoardingItem item={item} />}

          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollx } } }], {
            useNativeDriver: false
          })}
          scrollEventThrottle={32}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewConfigRef}
          ref={slidesRef}

        />
        <Paginator data={slides} scrollx={scrollx} />
        <NextButton style={{ flex: 1 }} scrollTo={scrollTo} percentage={(currentIndex + 1) * (100 / slides.length)} />


      </View>


    </SafeAreaView>
  )
};

const styles = StyleSheet.create({


  container: {


    justifyContent: 'center',

    alignItems: 'center',
    height: '100%'
  }
});
// Navigation.setDefaultOptions({
//   topBar: {
//     visible: false,
//     drawBehind: false,
//     animate: true,
//   }
// });


export default OnBoarding

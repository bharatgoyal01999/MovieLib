import 'react-native-gesture-handler'
import React from 'react';
import {View , Text, Image,StyleSheet, FlatList} from 'react-native';
import {NavigationContainer} from '@react-navigation/native'


import 'react-native-gesture-handler'


import Populer from './components/Home'

import Search from './components/Search'
import DetailPage from './components/Details'
import {createStackNavigator} from '@react-navigation/stack'

export default function Home(){
    var Stack=createStackNavigator();
   
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home' headerMode='none' 
        screenOptions={{
            gestureEnabled:true,
            gestureDirection:'horizontal',
            
        }}>
<Stack.Screen  name='Home'  component={Populer}/>
<Stack.Screen  name='Search' component={Search}/>
<Stack.Screen name='Details' component={DetailPage} />

        </Stack.Navigator></NavigationContainer>
       
    )
}

const styles=StyleSheet.create({
    mainContainer:{
        // backgroundColor:'#FFFAFA',
       
        flex:1,
     
    },
    text:{
        color:'#8B0000',
        fontSize:20,
        textDecorationColor:'black',
        
       
    }
})

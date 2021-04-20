import React ,{useState}from 'react';
import {View,Text,StyleSheet,Dimensions, TextInput} from 'react-native';
import Icons from 'react-native-vector-icons/Feather';
import axios from 'axios';

export default function Search(){
    const getData=(text)=>{

const url="https://api.themoviedb.org/3/search/multi?api_key=cf8306fe28bdfb68e3345ba8b217eb9e&language=en&query="+text+"&page=1&include_adult=false";
axios.get(url)
.then(res=>console.log(res.data))
.catch(err=>console.log(err))
    }
    const [data,setData]=useState('');
    return(
    <View style={styles.main}>
        <View style={styles.navContainer}>
            <Icons name='search' color='white' size={30} />
            <TextInput placeholder='Movie title'  placeholderTextColor='rgba(256,256,256,0.3)' 
            style={styles.input}
            onChangeText={getData}
            ></TextInput>
        </View>
    </View>)
}
const styles=StyleSheet.create({
main:{
    flex:1,
    backgroundColor:'#000000',

},
navContainer:{
    height:Dimensions.get('window').height*0.1,
    elevation:0.5,
    
    
    backgroundColor:'#8B0000',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'space-between'
},
navHeading:{
    fontSize:Dimensions.get('window').width*0.06,
    color:'white'
},
input:
    {width:Dimensions.get('window').width*0.8,
    textDecorationLine:'underline',
    textDecorationColor:'white',
    borderColor:'white',
    color:'white',
    borderBottomWidth:1,
    fontSize:25}

})
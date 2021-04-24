import React from 'react';
import {View,Text,FlatList,StyleSheet, ScrollView} from 'react-native';
import Nav from './Nav'
import axios from 'axios'
import Icon from 'react-native-vector-icons/AntDesign'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SingleItem} from './Home'
export default function FavData(props){
const [data,setData]=React.useState([]);
const [numberOfCols,setNumberOfCols]=React.useState(2)
React.useEffect(async ()=>{
try{

var value=await AsyncStorage.getItem('favMovies');
if (value!==null){
var d=[]
value.split(',').forEach(async item=>{
   await axios.get("https://api.themoviedb.org/3/movie/"+item+"?api_key=cf8306fe28bdfb68e3345ba8b217eb9e&language=en-US")
    .then(res=>{
    d.push(res.data)
    
    })
    .catch(err=>{console.log(err)});
    if (d.length>=3){
        setNumberOfCols(3)
    }
    else{
        setNumberOfCols(d.length)
    }
    setData(d)
})

}
else{
    console.log("No Favourite Item")
}

}catch(e){
    console.log(e)
}



},[])

console.log(data)
return (
    <View style={{flex:1,backgroundColor:'black'}}>
        <Nav isFav={true} ></Nav>
        <View style={{flexDirection:'row',alignItems:'center'}}>
        <Text style={styles.text}>{'Favourite Movie'}</Text>
        <Icon name='play' color='white' size={30} style={{marginLeft:10}}/></View>
    {
    data.length>=3 && <FlatList 
    numColumns={numberOfCols}
    keyExtractor={item=>item.id}
    data={data}
    renderItem={(item)=>{
       
        return <SingleItem data={item} navigation={props.navigation}/>
    }}
    
    /> }
    {
        data.length<3 && <View style={{flexDirection:'row',justifyContent:'space-evenly'}} >

        {
            data.map(item=>{
                
                return (<SingleItem data={{item:item}} navigation={props.navigation}/> )
            })
        }
        </View>
    }
    {
        data.length==0 && (<View style={{justifyContent:'center',alignItems:'center',flex:1}}>
            <Text style={{fontSize:30}}>No Movie</Text>
        </View>)
    }
   
    </View>
        );
    }


    const styles=StyleSheet.create({
    
        text:{
            color:'#FFFAFA',
            fontSize:30,
            textDecorationColor:'black',
            fontWeight:'bold'
            
           
        }
    }
    )

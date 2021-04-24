import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icons from 'react-native-vector-icons/Feather';
import axios from 'axios';

export const SearchTile = ({imgSrc, title, navigation, data, date}) => {
  console.log(imgSrc);
  return (
    <TouchableOpacity
      style={styles.searchTile}
      onPress={() => {
        navigation.push('Details', {details: data});
      }}>
      <Image
        resizeMode="stretch"
        style={{
          width: Dimensions.get('window').width * 0.25,
          height: Dimensions.get('window').height * 0.18,
        }}
        source={{uri: imgSrc}}
      />
      <View>
        <Text style={styles.searchTitle}>{title}</Text>
        <Text style={styles.searchTitle}>{date}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function Search({navigation}) {
  const [data, setData] = useState('');
  const getData = text => {
    const url =
      'https://api.themoviedb.org/3/search/multi?api_key=cf8306fe28bdfb68e3345ba8b217eb9e&language=en&query=' +
      text +
      '&page=1&include_adult=false';
    axios
      .get(url)
      .then(res => setData(res.data.results))
      .catch(err => console.log(err));
  };

  return (
    <View style={styles.main}>
      <View style={styles.navContainer}>
        <Icons name="search" color="white" size={30} />
        <TextInput
          placeholder="Movie title"
          placeholderTextColor="rgba(256,256,256,0.3)"
          style={styles.input}
          onChangeText={getData}></TextInput>
      </View>
      <FlatList
        data={data}
        renderItem={item => {
          console.log(item);
          return (
            <SearchTile
              navigation={navigation}
              data={item}
              imgSrc={
                'https://image.tmdb.org/t/p/w200' + item.item['poster_path']
              }
              title={item.item.title}
              date={item.item.release_date}
            />
          );
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#000000',
  },
  navContainer: {
    height: Dimensions.get('window').height * 0.1,
    elevation: 0.5,

    backgroundColor: '#8B0000',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navHeading: {
    fontSize: Dimensions.get('window').width * 0.06,
    color: 'white',
  },
  input: {
    width: Dimensions.get('window').width * 0.8,
    textDecorationLine: 'underline',
    textDecorationColor: 'white',
    borderColor: 'white',
    color: 'white',
    borderBottomWidth: 1,
    fontSize: 25,
  },

  searchTile: {
    flexDirection: 'row',
    height: Dimensions.get('window').height * 0.2,
    width: Dimensions.get('window').width * 0.9,
    marginVertical: 5,
    elevation: 10,
    shadowColor: 'rgba(255,255,255,0.8)',
  },
  searchTitle: {
    color: 'white',
    fontSize: Dimensions.get('window').width * 0.055,
    textShadowColor: 'rgba(0,0,0,0.3)',
    flex: 1,
    marginHorizontal: 10,
  },
});

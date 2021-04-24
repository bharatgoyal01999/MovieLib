import React, {useEffect, useState} from 'react';
import Nav from './Nav';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';

import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import ShowAllButton from './ShowAllButton';

export const SingleItem = ({data, navigation}) => (
  <TouchableOpacity
    style={{width: 130, height: 200, marginTop: 5, marginBottom: 15}}
    onPress={() => {
      navigation.push('Details', {details: data});
    }}>
    <Image
      style={{
        width: Dimensions.get('window').width * 0.3058,
        height: Dimensions.get('window').height * 0.259,
        borderRadius: 4,
        backgroundColor: '#2E2C2C',
      }}
      resizeMode="stretch"
      source={{
        uri: 'https://image.tmdb.org/t/p/w200' + data['item']['poster_path'],
      }}
    />
  </TouchableOpacity>
);

function SingleCat({heading, url, navigation}) {
  const [data, setData] = useState([]);

  useEffect(async () => {
    axios
      .get(url)
      .then(res => {
        var data = res.data.results;
        data.push(<ShowAllButton />);
        setData(data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.text}>{heading}</Text>
        <Icon name="play" color="white" size={30} style={{marginLeft: 10}} />
      </View>

      {data.length > 0 && (
        <FlatList
          data={data}
          horizontal
          renderItem={item => {
            if (item.item.id) {
              return <SingleItem data={item} navigation={navigation} />;
            } else {
              return (
                <ShowAllButton
                  dataUrl={url}
                  navigation={navigation}
                  heading={heading}
                />
              );
            }
          }}
        />
      )}
      {data.length == 0 && (
        <View
          style={{
            height: Dimensions.get('window').height * 0.3,
            justifyContent: 'center',
          }}>
          <ActivityIndicator color="#8B0000" size={'large'} />
        </View>
      )}
    </>
  );
}

export default function Populer(props) {
  const fun = () => {
    console.log('add to fav');
    props.navigation.push('FavData');
  };

  return (
    <View style={styles.mainContainer}>
      <Nav navigation={props.navigation} isFav={false} addToFav={fun} />
      <ScrollView>
        <SingleCat
          url={
            'https://api.themoviedb.org/3/movie/popular?api_key=cf8306fe28bdfb68e3345ba8b217eb9e&language=en-US&page=1'
          }
          heading="Populer Movies"
          navigation={props.navigation}
        />
        <SingleCat
          url={
            'https://api.themoviedb.org/3/movie/now_playing?api_key=cf8306fe28bdfb68e3345ba8b217eb9e&language=en&page=1'
          }
          heading="Latest Movies"
          navigation={props.navigation}
        />
        <SingleCat
          url={
            'https://api.themoviedb.org/3/movie/top_rated?api_key=cf8306fe28bdfb68e3345ba8b217eb9e&language=en-US&page=1'
          }
          heading="Top Rated Movies"
          navigation={props.navigation}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    // backgroundColor:'#FFFAFA',
    backgroundColor: '#000000',
    flex: 1,
  },
  text: {
    color: '#FFFAFA',
    fontSize: 30,
    textDecorationColor: 'black',
    fontWeight: 'bold',
  },
});

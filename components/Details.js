import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
} from 'react-native';
import Nav from './Nav';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import GlobalFont from 'react-native-global-font'
export default function Details(props) {
  const [details, setDetails] = React.useState({});
  const [isFav, setIsFav] = React.useState(false);
  var data = props.route.params.details.item;

  React.useEffect(async () => {
    var data = props.route.params.details.item;
    axios
      .get(
        'https://api.themoviedb.org/3/movie/' +
          data.id +
          '?api_key=cf8306fe28bdfb68e3345ba8b217eb9e&language=en-US',
      )
      .then(res => {
        setDetails(res.data);
      })
      .catch(err => {
        console.log(err);
      });
    try {
      const value = await AsyncStorage.getItem('favMovies');
      if (value !== null) {
        // value previously stored

        value.split(',').forEach(item => {
          console.log(item, data.id);
          if (item == data.id) {
            console.log(item);
            setIsFav(true);
          }
        });
      } else {
        console.log('In Else');
      }
    } catch (e) {
      console.log('In Catch');
    }
  }, [isFav]);

  const addToFav = async () => {
    if (isFav) {
      try {
        const value = await AsyncStorage.getItem('favMovies');
        if (value !== null) {
          var oldData = value.split(',');
          var index;
          for (var i = 0; i < oldData.length; i++) {
            if (oldData[i] == data.id) {
              index = i;
            }
          }
          oldData.splice(index, 1);

          await AsyncStorage.setItem('favMovies', String(oldData));
          setIsFav(false);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const value = await AsyncStorage.getItem('favMovies');
        if (value !== null) {
          // value previously stored
          console.log('value is ' + value);

          var updatedFav = [...value.split(','), data.id];
          await AsyncStorage.setItem('favMovies', String(updatedFav));
          setIsFav(true);
        } else {
          var d = String([data.id]);
          AsyncStorage.setItem('favMovies', d);
          setIsFav(true);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  // console.log(data)
  return (
    <View style={{flex: 1}}>
      <Nav navigation={props.navigation} isFav={isFav} addToFav={addToFav} />
      <ScrollView style={styles.detailContainer}>
        <Image
          style={{
            width: Dimensions.get('window').width * 0.99,
            height: Dimensions.get('window').height * 0.3,
          }}
          source={{
            uri: 'https://image.tmdb.org/t/p/w500' + data['backdrop_path'],
          }}
          resizeMode="cover"
        />
        <View style={{paddingHorizontal: 4}}>
          <Text style={styles.title}>{details.title}</Text>
          <Text style={styles.subTitle}>{details.tagline}</Text>

          <Text style={styles.discription}>{data.overview}</Text>
          <FlatList
            horizontal
            data={details.genres}
            renderItem={item => {
              return (
                <View
                  style={{
                    borderWidth: 0.5,
                    borderColor: 'white',
                    marginTop: 10,
                    marginHorizontal: 2,
                    paddingHorizontal: 2,
                  }}>
                  <Text style={styles.details}>{item.item.name}</Text>
                </View>
              );
            }}
          />
          <Text style={styles.details}>
            {' '}
            {'Rating: ' + details.vote_average}{' '}
          </Text>
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <Text style={styles.details}> {details.release_date} </Text>
            <Text style={styles.details}> {details.runtime + ' min'} </Text>
          </View>
        </View>
        {/* <View>
                        <Text style={{color:'white'}}>Images</Text>
                    </View> */}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  detailContainer: {
    backgroundColor: '#000000',
    flex: 1,
  },
  title: {
    color: 'white',
    fontSize: Dimensions.get('window').width * 0.08,
    fontFamily: 'AbrilFatface',
  },
  discription: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: Dimensions.get('window').width * 0.05,
  },
  subTitle: {
    color: 'white',
    marginVertical: 5,
    fontSize: Dimensions.get('window').width * 0.06,
  },
  details: {
    marginVertical: 5,

    color: 'rgba(255,255,255,0.8)',
    fontSize: Dimensions.get('window').width * 0.05,
  },
});

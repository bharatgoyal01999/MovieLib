import axios from 'axios';
import React from 'react';
import {FlatList, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {SingleItem} from './Home';
import Nav from './Nav';
import Icon from 'react-native-vector-icons/AntDesign';
export default function ShowAll(props) {
  const [data, setData] = React.useState();

  React.useEffect(async () => {
    await axios
      .get(props.route.params['url'])
      .then(res => setData(res.data.results))
      .catch(err => console.log(err));
  }, [props]);

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <Nav
        isFav={false}
        addToFav={() => {
          props.navigation.push('FavData');
        }}></Nav>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.text}>{props.route.params.heading}</Text>
        <Icon name="play" color="white" size={30} style={{marginLeft: 10}} />
      </View>
      {data && (
        <FlatList
          numColumns={3}
          keyExtractor={item => item.id}
          data={data}
          renderItem={item => {
            console.log(item);
            return <SingleItem data={item} navigation={props.navigation} />;
          }}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    color: '#FFFAFA',
    fontSize: 30,
    textDecorationColor: 'black',
    fontWeight: 'bold',
  },
});

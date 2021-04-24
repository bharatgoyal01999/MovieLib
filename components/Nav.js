import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import Sicon from 'react-native-vector-icons/Feather';
import Aicon from 'react-native-vector-icons/AntDesign';

export default function Nav({navigation, isFav, addToFav}) {
  const IconName = isFav ? 'star' : 'staro';

  var [search_text, setSearch] = useState('');
  return (
    <View style={styles.navContainer}>
      <Text style={styles.navHeading}>MovieApp</Text>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={addToFav}>
          <Aicon name={IconName} color="white" size={30} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.push('Search');
          }}>
          <Sicon name="search" color="white" size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    height: Dimensions.get('window').height * 0.1,
    elevation: 0.5,
    paddingHorizontal: 5,

    backgroundColor: '#8B0000',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navHeading: {
    fontSize: Dimensions.get('window').width * 0.075,
    color: 'white',
    fontWeight: 'bold',
  },
  input: {
    color: 'white',
    fontSize: 20,
  },
});

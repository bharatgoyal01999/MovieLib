import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

export default function ShowAllButton({navigation, dataUrl, heading}) {
  return (
    <TouchableOpacity
      style={styles.buttonConatiner}
      onPress={() => {
        navigation.push('ShowAll', {url: dataUrl, heading: heading});
      }}>
      <Text style={styles.btnText}>Show All</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonConatiner: {
    width: Dimensions.get('window').width * 0.3058,
    height: Dimensions.get('window').height * 0.259,
    borderRadius: 4,
    backgroundColor: '#2E2C2C',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  btnText: {
    fontSize: 20,
    color: 'rgba(255,255,255,0.7)',
  },
});

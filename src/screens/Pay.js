import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class Pay extends Component {
  render() {
    return (
      <View style={styles.parent}>
        <View style={styles.parentWarp}>
          <View style={styles.parentBot}>
            <TouchableOpacity style={styles.parentIcon}>
              <View style={styles.parentInside}>
                <Icon name={'file-invoice-dollar'} color="white" size={25} />
                <Text style={styles.textIcon}>Mobile Bill</Text>
              </View>
              <View style={styles.right}>
                <Icon name={'chevron-right'} color="white" size={20} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.parentIcon}
              onPress={() => this.props.navigation.navigate('Mobile Topup')}>
              <View style={styles.parentInside}>
                <Icon name={'coins'} color="white" size={25} />
                <Text style={styles.textIcon}>Mobile Topup</Text>
              </View>
              <View style={styles.right}>
                <Icon name={'chevron-right'} color="white" size={20} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#00bfff',
  },
  parentWarp: {
    marginHorizontal: 30,
  },
  parentIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  textIcon: {
    color: 'white',
    paddingHorizontal: 15,
  },
  parentInside: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

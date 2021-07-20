import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class Transfer extends Component {
  render() {
    return (
      <View style={styles.parent}>
        <View style={styles.parentWarp}>
          <View style={styles.parentBot}>
            <TouchableOpacity
              style={styles.parentIcon}
              onPress={() =>
                this.props.navigation.navigate('Transfer To Friend')
              }>
              <View style={styles.parentInside}>
                <Icon name={'user'} color="white" size={25} />
                <Text style={styles.textIcon}>Transfer to Friend</Text>
              </View>
              <View style={styles.right}>
                <Icon name={'chevron-right'} color="white" size={20} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.parentIcon}>
              <View style={styles.parentInside}>
                <Icon name={'credit-card'} color="white" size={25} />
                <Text style={styles.textIcon}>Transfer to Bank Account</Text>
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

import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/FontAwesome5Pro';

export default class TopupViaTransfer extends Component {
  render() {
    return (
      <View style={styles.parent}>
        <View style={styles.parentNotif}>
          <Icon name={'info-with-circle'} size={13} color="#00bfff" />
          <Text style={styles.textNotif}>
            Anda bisa transfer dari layanan perbankan apapun (m-bangking, SMS
            bangking atau ATM)
          </Text>
        </View>
        <Text style={styles.label}>Pilih Bank</Text>
        <View>
          <TouchableOpacity style={styles.parentBar}>
            <View style={styles.parentIcon}>
              <Icon2 name={'cc-mastercard'} size={30} />
              <Text style={styles.Bank}>BCA</Text>
            </View>
            <Icon name={'chevron-right'} size={30} color="#00bfff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.parentBar}
            onPress={() => this.props.navigation.navigate('Via Mandiri')}>
            <View style={styles.parentIcon}>
              <Icon2 name={'cc-mastercard'} size={30} />
              <Text style={styles.Bank}>Mandiri</Text>
            </View>
            <Icon name={'chevron-right'} size={30} color="#00bfff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.parentBar}>
            <View style={styles.parentIcon}>
              <Icon2 name={'cc-mastercard'} size={30} />
              <Text style={styles.Bank}>BNI</Text>
            </View>
            <Icon name={'chevron-right'} size={30} color="#00bfff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.parentBar}>
            <View style={styles.parentIcon}>
              <Icon2 name={'cc-mastercard'} size={30} />
              <Text style={styles.Bank}>BRI</Text>
            </View>
            <Icon name={'chevron-right'} size={30} color="#00bfff" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parentNotif: {
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: '#f7fdff',
    paddingHorizontal: 20,
  },
  textNotif: {
    paddingLeft: 10,
  },
  label: {
    fontWeight: 'bold',
    paddingTop: 40,
    paddingLeft: 20,
    fontSize: 15,
    paddingBottom: 10,
  },
  parentBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#d6d6d6',
  },
  parentIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Bank: {
    paddingLeft: 20,
    fontSize: 15,
  },
});

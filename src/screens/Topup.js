import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome5Pro';

export default class Topup extends Component {
  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.warpAll}>
          <Text style={styles.label}>Isi Ulang via:</Text>
          <TouchableOpacity style={styles.container}>
            <View style={styles.top}>
              <Text style={styles.textTop}>Virtual Account</Text>
              <Icon name={'angle-right'} size={25} color="#00bfff" />
            </View>
            <View style={styles.Mid}>
              <Icon2
                name={'cc-mastercard'}
                style={{paddingRight: 10}}
                size={25}
              />
              <Icon2 name={'cc-paypal'} style={{paddingRight: 10}} size={25} />
              <Icon2 name={'cc-visa'} style={{paddingRight: 10}} size={25} />
            </View>
            <View style={styles.Bot}>
              <Text style={{color: '#00bfff'}}>
                Min. top-up Rp.100.000 for BCA
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.container}
            onPress={() =>
              this.props.navigation.navigate('Topup Via Transfer Bank')
            }>
            <View style={styles.top}>
              <Text style={styles.textTop}>Transfer</Text>
              <Icon name={'angle-right'} size={25} color="#00bfff" />
            </View>
            <View style={styles.Mid}>
              <Icon2
                name={'cc-mastercard'}
                style={{paddingRight: 10}}
                size={25}
              />
              <Icon2 name={'cc-paypal'} style={{paddingRight: 10}} size={25} />
              <Icon2 name={'cc-visa'} style={{paddingRight: 10}} size={25} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.container}>
            <View style={styles.top}>
              <Text style={styles.textTop}>Payment Counter</Text>
              <Icon name={'angle-right'} size={25} color="#00bfff" />
            </View>
            <View style={styles.Mid}>
              <Icon2
                name={'cc-mastercard'}
                style={{paddingRight: 10}}
                size={25}
              />
              <Icon2 name={'cc-paypal'} style={{paddingRight: 10}} size={25} />
              <Icon2 name={'cc-visa'} style={{paddingRight: 10}} size={25} />
            </View>
          </TouchableOpacity>
          <View style={{alignItems: 'center', marginVertical: 30}}>
            <View style={styles.parentDev}>
              <Icon2 name={'dev'} size={30} color="#a3a3a3" />
              <Text style={styles.textCuan}>CUANKU</Text>
            </View>
            <Text style={styles.textBot}>
              CUANKU is an electronic money product issued & managed by PT
              Cupaxx.co
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  parentTop: {
    backgroundColor: '#00bfff',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBalance: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: 'white',
    elevation: 5,
    marginVertical: 10,
    borderRadius: 8,
  },
  warpAll: {
    marginHorizontal: 15,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 13,
    borderBottomWidth: 0.5,
  },
  textTop: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  Mid: {
    padding: 13,
    flexDirection: 'row',
  },
  Bot: {
    padding: 13,
    backgroundColor: '#f5f5f5',
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,
  },
  label: {
    paddingVertical: 15,
    fontWeight: 'bold',
  },
  parentDev: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textCuan: {
    color: '#a3a3a3',
    fontWeight: 'bold',
    paddingLeft: 7,
    fontSize: 17,
  },
  textBot: {
    color: '#a3a3a3',
    textAlign: 'center',
  },
});

import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';

import {mobileTopup} from '../redux/actions/transaction';
import {showMessage} from 'react-native-flash-message';

class MobileTopup extends Component {
  state = {
    phone: '',
    balance: '',
  };

  mobile = () => {
    const {token} = this.props.auth;
    this.props
      .mobileTopup(this.state.balance, this.state.phone, token)
      .then(() => {
        if (this.props.transaction.errMsg === '') {
          showMessage({
            message: 'Mobile Topup Success',
            type: 'default',
            backgroundColor: '#01937C',
            color: 'white',
          });
          return this.props.navigation.reset({
            index: 0,
            routes: [{name: 'Home'}],
          });
        } else {
          showMessage({
            message: 'Mobile Topup Failed',
            type: 'default',
            backgroundColor: '#D54C4C',
            color: 'white',
          });
        }
      });
  };

  render() {
    return (
      <View style={styles.parent}>
        <View style={styles.parentWarp}>
          <View style={styles.parentTop}>
            <Text style={styles.labelPhoto}>Mobile Topup</Text>
          </View>
          <Text style={styles.labelInput}>Enter Your Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#fff"
            keyboardType="numeric"
            value={this.state.phone}
            onChangeText={val => this.setState({phone: val})}
          />
          <Text style={styles.labelInput}>Set Amount</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#fff"
            keyboardType="numeric"
            value={this.state.balance}
            onChangeText={val => this.setState({balance: val})}
          />
          <View style={styles.parentTop}>
            <Text style={styles.info}>
              Minimum pengisian pulsa semua operator Rp 10.000
            </Text>
            <TouchableOpacity style={styles.btn} onPress={() => this.mobile()}>
              <Text style={styles.textBtn}>CONFIRM</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  transaction: state.transaction,
});

const mapDispatchToProps = {mobileTopup};

export default connect(mapStateToProps, mapDispatchToProps)(MobileTopup);

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#00bfff',
  },
  parentWarp: {
    marginHorizontal: 30,
  },
  image: {
    width: 130,
    height: 130,
  },
  parentTop: {
    alignItems: 'center',
  },
  labelPhoto: {
    color: 'white',
    fontSize: 24,
    paddingTop: 10,
    paddingBottom: 10,
  },
  labelInput: {
    color: 'white',
    paddingTop: 20,
  },
  input: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    fontSize: 18,
    height: 40,
    color: 'white',
  },
  btn: {
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 13,
    marginTop: 20,
    borderRadius: 4,
  },
  textBtn: {
    color: '#00bfff',
  },
  info: {
    color: 'white',
    fontSize: 13,
    paddingTop: 5,
  },
});

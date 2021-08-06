import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';

import {transferToFriend} from '../redux/actions/transaction';
import {showMessage} from 'react-native-flash-message';

class TransferToFriend extends Component {
  state = {
    phoneRecipient: '',
    balance: '',
  };

  transfer = () => {
    const {token} = this.props.auth;
    this.props
      .transferToFriend(this.state.phoneRecipient, this.state.balance, token)
      .then(() => {
        if (this.props.transaction.errMsg === '') {
          showMessage({
            message: 'Transfer Success',
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
            message: `${this.props.transaction.errMsg}`,
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
            <Text style={styles.labelPhoto}>Transfer</Text>
          </View>
          <Text style={styles.labelInput}>Enter Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Example : 0808080808"
            placeholderTextColor="#fff"
            keyboardType="numeric"
            value={this.state.phoneRecipient}
            onChangeText={val => this.setState({phoneRecipient: val})}
          />
          <Text style={styles.labelInput}>Set Amount</Text>
          <TextInput
            style={styles.input}
            placeholder="Minimum : 1000"
            placeholderTextColor="#fff"
            keyboardType="numeric"
            value={this.state.balance}
            onChangeText={val => this.setState({balance: val})}
          />
          <View style={styles.parentTop}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => this.transfer()}>
              <Text style={styles.textBtn}>Send</Text>
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

const mapDispatchToProps = {transferToFriend};

export default connect(mapStateToProps, mapDispatchToProps)(TransferToFriend);

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
  },
  textBtn: {
    color: '#00bfff',
  },
});

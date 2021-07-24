import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import {usersGet} from '../redux/actions/users';
import {usersTopup} from '../redux/actions/transaction';
import {showMessage} from 'react-native-flash-message';

class ViaMandiri extends Component {
  state = {
    balance: '',
  };

  topup = () => {
    const {token} = this.props.auth;
    this.props.usersTopup(this.state.balance, token).then(() => {
      if (this.props.users.errMsg === '') {
        showMessage({
          message: 'Topup Success',
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
          message: 'Topup Success',
          type: 'default',
          backgroundColor: '#01937C',
          color: 'white',
        });
      }
    });
  };

  render() {
    return (
      <View>
        <View style={styles.parentTop}>
          <Text style={styles.textNotif}>
            Pilih jumlah pengisian ulang (Rp)
          </Text>
        </View>
        <View style={styles.parentMid}>
          <View style={styles.parentBtn}>
            <TouchableOpacity
              style={styles.btn}
              onPress={e => this.setState({balance: '10000'})}>
              <Text style={styles.textBtn}>10.000</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              onPress={e => this.setState({balance: '25000'})}>
              <Text style={styles.textBtn}>25.000</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              onPress={e => this.setState({balance: '50000'})}>
              <Text style={styles.textBtn}>50.000</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              onPress={e => this.setState({balance: '100000'})}>
              <Text style={styles.textBtn}>100.000</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              onPress={e => this.setState({balance: '300000'})}>
              <Text style={styles.textBtn}>300.000</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              onPress={e => this.setState({balance: '500000'})}>
              <Text style={styles.textBtn}>500.000</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.textLabel}>
            Atau ketik jumlah yang anda inginkan
          </Text>
          <View style={styles.parentInput}>
            <Text>Rp</Text>
            <TextInput
              style={styles.input}
              value={this.state.balance}
              onChangeText={val => this.setState({balance: val})}
            />
          </View>
          <Text style={styles.textLabel}>
            Limit pengisian saldo anda adalah Rp 1.999.000
          </Text>
        </View>
        <View style={styles.parentBot}>
          <TouchableOpacity style={styles.btnBot} onPress={this.topup}>
            <Text style={styles.textBtnBot}>Lanjutkan</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
  auth: state.auth,
});

const mapDispatchToProps = {usersTopup, usersGet};

export default connect(mapStateToProps, mapDispatchToProps)(ViaMandiri);

const styles = StyleSheet.create({
  parentTop: {
    backgroundColor: '#e3e3e3',
    padding: 20,
  },
  textNotif: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  parentBtn: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  parentMid: {
    backgroundColor: 'white',
    padding: 10,
  },
  btn: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 5,
    width: 104,
    borderRadius: 4,
    elevation: 5,
    margin: 10,
    alignItems: 'center',
  },
  textBtn: {
    color: '#00ace0',
    fontWeight: 'bold',
  },
  parentInput: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  textLabel: {
    paddingVertical: 10,
    fontSize: 13,
    paddingHorizontal: 10,
  },
  parentBot: {
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 20,
  },
  btnBot: {
    backgroundColor: '#ff5319',
    paddingHorizontal: 135,
    paddingVertical: 10,
    borderRadius: 5,
  },
  textBtnBot: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
  },
});

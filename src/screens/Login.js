import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';
import {connect} from 'react-redux';
import {authLogin} from '../redux/actions/auth';

class Login extends Component {
  state = {
    phone: '',
    pin: '',
  };

  login = () => {
    this.props.authLogin(this.state.phone, this.state.pin).then(() => {
      if (this.props.auth.errMsg === '') {
        ToastAndroid.showWithGravity(
          'Login success',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
        return this.props.navigation.navigate('Home');
      } else {
        ToastAndroid.showWithGravity(
          `${this.props.auth.errMsg}`,
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      }
    });
  };
  render() {
    return (
      <View style={styles.parent}>
        <View style={styles.parentWarp}>
          <View>
            <Text style={styles.textWelc}>Welcome To CUANKU</Text>
          </View>
          <View style={styles.parentBtn}>
            <TouchableOpacity
              style={styles.btnWhite}
              onPress={() => this.props.navigation.navigate('Sign')}>
              <Text style={styles.textBtnWhite}>CREATE ACCOUNT</Text>
            </TouchableOpacity>
            <Text style={styles.or}>OR</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Your Mobile Number"
            placeholderTextColor="#fff"
            keyboardType="numeric"
            value={this.state.phone}
            onChangeText={val => this.setState({phone: val})}
          />
          <TextInput
            style={styles.input2}
            placeholder="PIN"
            secureTextEntry={true}
            placeholderTextColor="#fff"
            keyboardType="numeric"
            value={this.state.pin}
            onChangeText={val => this.setState({pin: val})}
          />
          <TouchableOpacity>
            <Text style={styles.forgot}>Forgot ?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.parentBtn}>
          <TouchableOpacity style={styles.btnOutline} onPress={this.login}>
            <Text style={styles.textBtnOutline}>SIGN IN</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = {authLogin};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#00bfff',
  },
  parentWarp: {
    marginTop: 50,
    marginHorizontal: 20,
  },
  textWelc: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
  parentBtn: {
    alignItems: 'center',
  },
  btnWhite: {
    backgroundColor: 'white',
    paddingVertical: 7,
    paddingHorizontal: 7,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  textBtnWhite: {
    color: '#00bfff',
    fontSize: 15,
  },
  or: {
    color: 'white',
    fontSize: 15,
    paddingBottom: 5,
  },
  input: {
    color: 'white',
    borderBottomWidth: 2,
    borderBottomColor: 'white',
    fontSize: 15,
  },
  input2: {
    color: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    fontSize: 15,
  },
  btnOutline: {
    backgroundColor: '#00bfff',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'white',
  },
  textBtnOutline: {
    color: 'white',
    fontSize: 15,
  },
  forgot: {
    textAlign: 'right',
    color: 'white',
    fontSize: 15,
    paddingTop: 10,
  },
});

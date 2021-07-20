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
import {usersOldPin} from '../redux/actions/users';

class ChangePin extends Component {
  state = {
    pin: '',
  };
  oldPin = () => {
    const {token} = this.props.auth;
    this.props.usersOldPin(this.state.pin, token).then(() => {
      if (this.props.auth.errMsg === '') {
        ToastAndroid.showWithGravity(
          'Pin Match',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
        return this.props.navigation.navigate('New Pin');
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
    console.log(this.state.pin);
    return (
      <View style={styles.parent}>
        <View style={styles.parentWarp}>
          <View style={styles.parentTop} />
          <TextInput
            style={styles.input}
            placeholder="Enter Old PIN"
            placeholderTextColor="#fff"
            keyboardType="numeric"
            secureTextEntry={true}
            value={this.state.pin}
            onChangeText={val => this.setState({pin: val})}
          />
          <View style={styles.parentTop}>
            <TouchableOpacity style={styles.btn} onPress={this.oldPin}>
              <Text style={styles.textBtn}>NEXT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  users: state.users,
});

const mapDispatchToProps = {usersOldPin};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePin);

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#00bfff',
  },
  parentWarp: {
    marginTop: 50,
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
    marginVertical: 15,
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

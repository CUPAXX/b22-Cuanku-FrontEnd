import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import {usersUpdatePin} from '../redux/actions/users';
import {showMessage} from 'react-native-flash-message';

class NewPin extends Component {
  state = {
    pin: '',
    confirmPin: '',
  };

  update = () => {
    if (this.state.pin === this.state.confirmPin) {
      const {token} = this.props.auth;
      this.props.usersUpdatePin(this.state.pin, token).then(() => {
        if (this.props.users.errMsg === '') {
          showMessage({
            message: 'Change PIN Success',
            type: 'default',
            backgroundColor: '#01937C',
            color: 'white',
          });
          return this.props.navigation.reset({
            index: 0,
            routes: [{name: 'Change Pin Success'}],
          });
        } else {
          showMessage({
            message: 'Change PIN Failed',
            type: 'default',
            backgroundColor: '#D54C4C',
            color: 'white',
          });
        }
      });
    } else {
      showMessage({
        message: 'PIN Didnt Match',
        type: 'default',
        backgroundColor: '#D54C4C',
        color: 'white',
      });
    }
  };
  render() {
    return (
      <View style={styles.parent}>
        <View style={styles.parentWarp}>
          <View style={styles.parentTop} />

          <TextInput
            style={styles.input}
            placeholder="Enter New PIN"
            placeholderTextColor="#fff"
            keyboardType="numeric"
            secureTextEntry={true}
            value={this.state.pin}
            onChangeText={val => this.setState({pin: val})}
          />
          <TextInput
            style={styles.input}
            placeholder="Re-Enter New PIN"
            placeholderTextColor="#fff"
            keyboardType="numeric"
            secureTextEntry={true}
            value={this.state.confirmPin}
            onChangeText={val => this.setState({confirmPin: val})}
          />
          <View style={styles.parentTop}>
            <TouchableOpacity style={styles.btn} onPress={this.update}>
              <Text style={styles.textBtn}>SAVE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
  auth: state.auth,
});

const mapDispatchToProps = {usersUpdatePin};

export default connect(mapStateToProps, mapDispatchToProps)(NewPin);

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

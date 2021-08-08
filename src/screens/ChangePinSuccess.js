import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {authLogout} from '../redux/actions/auth';
class ChangePinSuccess extends Component {
  onLogout = () => {
    this.props.authLogout();
  };

  render() {
    return (
      <View style={styles.parent}>
        <View style={styles.parentWarp}>
          <View>
            <View style={styles.parentIcon}>
              <Icon style={styles.icon} name={'check'} size={25} />
            </View>
            <Text style={styles.labelInput}>
              Your PIN has changed successfully.
            </Text>
            <Text style={styles.labelInput}>
              Please login with your new PIN
            </Text>
          </View>
          <View style={styles.parentTop}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => this.props.navigation.navigate('Login')}>
              <Text style={styles.textBtn}>LOGIN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = {authLogout};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePinSuccess);

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#00bfff',
  },
  parentWarp: {
    marginVertical: 50,
    marginHorizontal: 30,
    justifyContent: 'space-between',
    flex: 1,
  },
  parentTop: {
    alignItems: 'center',
  },

  labelInput: {
    color: 'white',
    fontSize: 15,
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
  parentIcon: {
    backgroundColor: 'white',
    width: 40,
    height: 40,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  icon: {
    color: '#00bfff',
  },
});

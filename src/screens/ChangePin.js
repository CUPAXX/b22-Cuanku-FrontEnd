import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import {usersOldPin} from '../redux/actions/users';
import {showMessage} from 'react-native-flash-message';
import {Formik} from 'formik';
import * as yup from 'yup';
import {CommonActions} from '@react-navigation/native';

class ChangePin extends Component {
  state = {
    pin: '',
  };
  oldPin = values => {
    const {token} = this.props.auth;
    const {pin} = values;
    this.props.usersOldPin(pin, token).then(() => {
      if (this.props.users.errMsg === '') {
        showMessage({
          message: 'Pin Match',
          type: 'default',
          backgroundColor: '#01937C',
          color: 'white',
        });
        // return this.props.navigation.reset({
        //   index: 0,
        //   routes: [{name: 'New Pin'}],
        // });
        return this.props.navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              {name: 'Home'},
              {
                name: 'New Pin',
              },
            ],
          }),
        );
      } else {
        showMessage({
          message: `${this.props.users.errMsg}`,
          type: 'default',
          backgroundColor: '#D54C4C',
          color: 'white',
        });
      }
    });
  };
  render() {
    console.log(this.state.pin);
    return (
      <View style={styles.parent}>
        <View style={styles.parentWarp}>
          <View style={styles.parentTop} />
          <Formik
            initialValues={{
              pin: '',
            }}
            onSubmit={values => this.oldPin(values)}
            validationSchema={yup.object().shape({
              pin: yup
                .string()
                .matches(/^[0-9]+$/, 'Must be only number')
                .min(6, 'Pin at least 6 character')
                .max(6, 'Pin max 6 chars.')
                .required(),
            })}>
            {({
              values,
              handleChange,
              errors,
              setFieldTouched,
              touched,
              isValid,
              handleSubmit,
            }) => (
              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Old PIN"
                  placeholderTextColor="#fff"
                  keyboardType="numeric"
                  secureTextEntry={true}
                  value={values.pin}
                  onChangeText={handleChange('pin')}
                  onBlur={() => setFieldTouched('pin')}
                />
                {touched.pin && errors.pin && (
                  <Text style={styles.errmsg}>{errors.pin}</Text>
                )}
                <View style={styles.parentTop}>
                  <TouchableOpacity
                    style={styles.btn}
                    disabled={!isValid}
                    onPress={handleSubmit}>
                    <Text style={styles.textBtn}>NEXT</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
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
  errmsg: {
    fontSize: 15,
    textTransform: 'capitalize',
    color: 'red',
    fontWeight: 'bold',
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

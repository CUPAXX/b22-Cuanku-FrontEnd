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
import {authLogout} from '../redux/actions/auth';
import {Formik} from 'formik';
import * as yup from 'yup';
import {CommonActions} from '@react-navigation/native';

class NewPin extends Component {
  // state = {
  //   pin: '',
  //   confirmPin: '',
  // };

  update = values => {
    const {pin, confirmPin} = values;
    if (pin === confirmPin) {
      const {token} = this.props.auth;
      this.props.usersUpdatePin(pin, token).then(() => {
        if (this.props.users.errMsg === '') {
          showMessage({
            message: 'Change PIN Success',
            type: 'default',
            backgroundColor: '#01937C',
            color: 'white',
          });
          this.props.authLogout();

          // this.props.navigation.dispatch(
          //   CommonActions.reset({
          //     index: 1,
          //     routes: [
          //       {name: 'Login'},
          //       {
          //         name: 'Change Pin Success',
          //       },
          //     ],
          //   }),
          // );
          return this.props.navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [
                {name: 'Login'},
                {
                  name: 'Change Pin Success',
                },
              ],
            }),
          );
          // this.props.navigation.reset({
          //   index: 0,
          //   routes: [{name: 'Change Pin Success'}],
          // });
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
          <Formik
            initialValues={{
              pin: '',
              confirmPin: '',
            }}
            onSubmit={values => this.update(values)}
            validationSchema={yup.object().shape({
              pin: yup
                .string()
                .matches(/^[0-9]+$/, 'Must be only number')
                .min(6, 'Pin at least 6 character')
                .max(6, 'Pin max 6 chars.')
                .required(),
              confirmPin: yup
                .string()

                .matches(/^[0-9]+$/, 'Must be only number')
                .min(6, 'Pin at least 6 character')
                .max(6, 'Pin max 6 chars.')
                .required(' Confirm Pin Is Required'),
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
                  placeholder="Enter New PIN"
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
                <TextInput
                  style={styles.input}
                  placeholder="Re-Enter New PIN"
                  placeholderTextColor="#fff"
                  keyboardType="numeric"
                  secureTextEntry={true}
                  value={values.confirmPin}
                  onChangeText={handleChange('confirmPin')}
                  onBlur={() => setFieldTouched('confirmPin')}
                />
                {touched.confirmPin && errors.confirmPin && (
                  <Text style={styles.errmsg}>{errors.confirmPin}</Text>
                )}
                <View style={styles.parentTop}>
                  <TouchableOpacity
                    style={styles.btn}
                    disabled={!isValid}
                    onPress={handleSubmit}>
                    <Text style={styles.textBtn}>SAVE</Text>
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
  users: state.users,
  auth: state.auth,
});

const mapDispatchToProps = {usersUpdatePin, authLogout};

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
  errmsg: {
    fontSize: 15,
    textTransform: 'capitalize',
    color: 'red',
    fontWeight: 'bold',
  },
});

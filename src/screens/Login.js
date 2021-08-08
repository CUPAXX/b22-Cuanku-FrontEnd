import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import {authLogin, cobaGet} from '../redux/actions/auth';
import {showMessage} from 'react-native-flash-message';
import {Formik} from 'formik';
import * as yup from 'yup';

class Login extends Component {
  state = {
    phone: '',
    pin: '',
  };

  componentDidMount() {
    this.props.cobaGet();
  }

  login = values => {
    const {phone, pin} = values;
    this.props.authLogin(phone, pin).then(() => {
      if (this.props.auth.errMsg === '') {
        showMessage({
          message: 'Login Success',
          type: 'default',
          backgroundColor: '#01937C',
          color: 'white',
        });
        return this.props.navigation.navigate('Home');
      } else {
        showMessage({
          message: `${this.props.auth.errMsg}`,
          type: 'default',
          backgroundColor: '#D54C4C',
          color: 'white',
        });
      }
    });
  };
  render() {
    const {data} = this.props.auth;
    console.log(data);
    return (
      <View style={styles.parent}>
        <Formik
          initialValues={{
            pin: '',
            phone: '',
          }}
          onSubmit={values => this.login(values)}
          validationSchema={yup.object().shape({
            pin: yup
              .string()
              .matches(/^[0-9]+$/, 'Must be only number')
              .min(6, 'Pin at least 6 character')
              .max(6, 'Pin max 6 chars.')
              .required(),
            phone: yup
              .string()
              .matches(/^[0-9]+$/, 'Must be only number')
              .min(11, 'Phone Number at least 11 character')
              .max(13, 'Phone Number max 13 chars.')
              .required('Phone Number Is Required'),
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
            <React.Fragment>
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
                  value={values.phone}
                  onChangeText={handleChange('phone')}
                  onBlur={() => setFieldTouched('phone')}
                />
                {touched.phone && errors.phone && (
                  <Text style={styles.errmsg}>{errors.phone}</Text>
                )}
                <TextInput
                  style={styles.input2}
                  placeholder="PIN"
                  secureTextEntry={true}
                  placeholderTextColor="#fff"
                  keyboardType="numeric"
                  value={values.pin}
                  onChangeText={handleChange('pin')}
                  onBlur={() => setFieldTouched('pin')}
                />
                {touched.pin && errors.pin && (
                  <Text style={styles.errmsg}>{errors.pin}</Text>
                )}
                <TouchableOpacity>
                  <Text style={styles.forgot}>Forgot ?</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.parentBtn}>
                <TouchableOpacity
                  style={styles.btnOutline}
                  disabled={!isValid}
                  onPress={handleSubmit}>
                  <Text style={styles.textBtnOutline}>SIGN IN</Text>
                </TouchableOpacity>
              </View>
            </React.Fragment>
          )}
        </Formik>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = {authLogin, cobaGet};
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
  errmsg: {
    fontSize: 15,
    textTransform: 'capitalize',
    color: 'red',
    fontWeight: 'bold',
  },
});

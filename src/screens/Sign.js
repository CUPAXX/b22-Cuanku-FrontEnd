import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import {Formik} from 'formik';
import * as yup from 'yup';
import {authRegister} from '../redux/actions/auth';
import {showMessage} from 'react-native-flash-message';

class Sign extends Component {
  state = {
    name: '',
    email: '',
    pin: '',
    phone: '',
  };

  register = values => {
    const {name, email, pin, phone} = values;
    this.props.authRegister(name, email, pin, phone).then(() => {
      if (this.props.auth.errMsg === '') {
        showMessage({
          message: 'Register Success',
          type: 'default',
          backgroundColor: '#01937C',
          color: 'white',
        });
        return this.props.navigation.navigate('Login');
      } else {
        showMessage({
          message: 'Register Failed',
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
          <View>
            <Text style={styles.textWelc}>Welcome To CUANKU</Text>
          </View>
          <View style={styles.parentBtn}>
            <TouchableOpacity
              style={styles.btnWhite}
              onPress={() => this.props.navigation.navigate('Login')}>
              <Text style={styles.textBtnWhite}>BACK TO LOGIN</Text>
            </TouchableOpacity>
          </View>
          <Formik
            initialValues={{
              phone: '',
              name: '',
              email: '',
              pin: '',
            }}
            onSubmit={values => this.register(values)}
            validationSchema={yup.object().shape({
              name: yup.string().required('Please, provide your name!'),
              phone: yup
                .string()
                .min(11, 'phone number min 11 chars')
                .required('Please, provide your phone number!'),
              email: yup.string().email().required(),
              pin: yup
                .string()
                .min(6, 'pin at least 6 character')
                .max(6, 'pin should not exceed 6 chars.')
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
                  value={values.name}
                  placeholder="Name"
                  placeholderTextColor="#fff"
                  onChangeText={handleChange('name')}
                  onBlur={() => setFieldTouched('name')}
                />
                {touched.name && errors.name && (
                  <Text style={styles.errmsg}>{errors.name}</Text>
                )}
                <TextInput
                  style={styles.input}
                  value={values.email}
                  placeholder="Email"
                  placeholderTextColor="#fff"
                  onChangeText={handleChange('email')}
                  onBlur={() => setFieldTouched('email')}
                />
                {touched.email && errors.email && (
                  <Text style={styles.errmsg}>{errors.email}</Text>
                )}
                <TextInput
                  style={styles.input}
                  value={values.phone}
                  placeholder="Your Mobile Number"
                  placeholderTextColor="#fff"
                  keyboardType="numeric"
                  onChangeText={handleChange('phone')}
                  onBlur={() => setFieldTouched('phone')}
                />
                {touched.phone && errors.phone && (
                  <Text style={styles.errmsg}>{errors.phone}</Text>
                )}
                <TextInput
                  style={styles.input}
                  value={values.pin}
                  placeholder="PIN"
                  secureTextEntry={true}
                  placeholderTextColor="#fff"
                  keyboardType="numeric"
                  onChangeText={handleChange('pin')}
                  onBlur={() => setFieldTouched('pin')}
                />
                {touched.pin && errors.pin && (
                  <Text style={styles.errmsg}>{errors.pin}</Text>
                )}
                <View style={styles.parentBtn}>
                  <TouchableOpacity
                    style={styles.btnOutline}
                    disabled={!isValid}
                    onPress={handleSubmit}>
                    <Text style={styles.textBtnOutline}>CREATE</Text>
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
});

const mapDispatchToProps = {authRegister};

export default connect(mapStateToProps, mapDispatchToProps)(Sign);

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
    paddingHorizontal: 3,
    color: 'red',
  },
});

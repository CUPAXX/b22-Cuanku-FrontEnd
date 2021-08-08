import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {usersGet, usersUpdate} from '../redux/actions/users';
import {REACT_APP_BASE_URL} from '@env';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';

class EditProfile extends Component {
  state = {
    picture: null,
    name: '',
  };
  componentDidMount() {
    const {token} = this.props.auth;
    this.props.usersGet(token).then(() => {
      this.setState({
        picture: this.props.users.data.picture,
        name: this.props.users.data.name,
      });
    });
  }

  update = () => {
    const {token} = this.props.auth;
    this.props
      .usersUpdate(this.state.picture, this.state.name, token)
      .then(() => {
        if (this.props.users.errMsg === '') {
          showMessage({
            message: 'Update Success',
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
            message: 'Update Failed',
            type: 'default',
            backgroundColor: '#D54C4C',
            color: 'white',
          });
        }
      });
  };

  onPick = () => {
    Alert.alert('Option', 'Choose your image', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Camera',
        onPress: () => this.selectLaunch(),
      },
      {
        text: 'Galery',
        onPress: () => this.selectPict(),
      },
    ]);
  };

  selectPict = e => {
    // let options = {
    //   mediaType: 'photo',
    //   maxWidth: 150,
    //   maxHeight: 150,
    // };
    launchImageLibrary({}, response => {
      if (!response.didCancel) {
        const maxSize = 1024 * 1024 * 2;
        if (response.assets[0].fileSize < maxSize) {
          this.setState({picture: response.assets[0].uri});
        } else {
          showMessage({
            message: 'File To Large!, Max Size 2MB',
            type: 'danger',
            backgroundColor: '#d63031',
            color: '#fff',
            duration: 2000,
          });
        }
      }
    });
  };

  selectLaunch = e => {
    let options = {
      mediaType: 'photo',
      maxWidth: 150,
      maxHeight: 150,
    };
    launchCamera(options, response => {
      if (!response.didCancel) {
        this.setState({picture: response.assets[0].uri});
      }
    });
  };

  render() {
    return (
      <View style={styles.parent}>
        <View style={styles.parentWarp}>
          <View style={styles.parentTop}>
            {this.state.picture !== null ? (
              <Image
                style={styles.image}
                source={
                  this.state.picture.includes('upload')
                    ? {uri: `${REACT_APP_BASE_URL}${this.state.picture}`}
                    : {uri: `${this.state.picture}`}
                }
              />
            ) : (
              <Image
                style={styles.image}
                source={require('../assets/profile.png')}
              />
            )}

            <TouchableOpacity onPress={this.onPick}>
              <Text style={styles.labelPhoto}>Change Photo</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.labelInput}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="fiqry"
            placeholderTextColor="#fff"
            keyboardType="numeric"
            value={this.state.name}
            onChangeText={val => this.setState({name: val})}
          />
          <View style={styles.parentTop}>
            <TouchableOpacity style={styles.btn} onPress={() => this.update()}>
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

const mapDispatchToProps = {usersGet, usersUpdate};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);

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
    borderRadius: 100,
  },
  parentTop: {
    alignItems: 'center',
  },
  labelPhoto: {
    color: 'white',
    fontSize: 24,
    paddingTop: 10,
  },
  labelInput: {
    color: 'white',
  },
  input: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    fontSize: 18,
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

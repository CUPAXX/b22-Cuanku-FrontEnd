import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {usersGet} from '../redux/actions/users';
import {REACT_APP_BASE_URL} from '@env';

class Home extends Component {
  state = {
    name: '',
    phone: '',
    picture: '',
    balance: '',
  };
  componentDidMount() {
    const {token} = this.props.auth;
    this.props.usersGet(token).then(() => {
      this.setState({
        picture: this.props.users.data.picture,
        name: this.props.users.data.name,
        balance: this.props.users.data.balance,
        phone: this.props.users.data.phone,
      });
    });
  }

  render() {
    return (
      <View style={styles.parent}>
        <View style={styles.parentWarp}>
          <View style={styles.parentTop}>
            <Image
              style={styles.Image}
              source={{uri: `${REACT_APP_BASE_URL}${this.state.picture}`}}
            />
            <Text style={styles.textName}>{this.state.name}</Text>
            <Text style={styles.textPhone}>{this.state.phone}</Text>
          </View>
          <View style={styles.parentTop}>
            <Text style={styles.textSaldo}>
              Rp {this.state.balance?.toLocaleString('en')}
            </Text>
            <TouchableOpacity
              style={styles.btnWhite}
              onPress={() => this.props.navigation.navigate('Topup')}>
              <Text style={styles.topup}>TOP UP</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('Transaction History')
              }>
              <Text style={styles.history}>Transaction History</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.parentBot}>
            <TouchableOpacity style={styles.parentIcon}>
              <Icon name={'file-invoice-dollar'} color="white" size={30} />
              <Text style={styles.textIcon}>Mobile Bill</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.parentIcon}
              onPress={() => this.props.navigation.navigate('Mobile Topup')}>
              <Icon name={'coins'} color="white" size={30} />
              <Text style={styles.textIcon}>Mobile Topup</Text>
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

const mapDispatchToProps = {usersGet};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#00bfff',
  },
  parentWarp: {
    marginHorizontal: 30,
  },
  parentTop: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    paddingVertical: 20,
  },
  textName: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 8,
  },
  textPhone: {
    fontSize: 17,
    paddingTop: 5,
    color: 'white',
  },
  Image: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  textSaldo: {
    color: 'white',
    fontSize: 24,
    paddingTop: 8,
  },
  btnWhite: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 4,
    marginVertical: 20,
  },
  topup: {
    color: '#00b7ff',
    fontSize: 17,
  },
  history: {
    color: 'white',
    fontSize: 15,
    textDecorationLine: 'underline',
  },
  parentBot: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  parentIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  textIcon: {
    color: 'white',
  },
});

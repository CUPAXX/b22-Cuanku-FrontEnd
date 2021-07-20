import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {authLogout} from '../redux/actions/auth';

class More extends Component {
  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.parent}>
        <View style={styles.parentWarp}>
          <View style={styles.parentTop}>
            <TouchableOpacity style={styles.parentIcon}>
              <View style={styles.parentInside}>
                <View style={styles.parentText}>
                  <Icon name={'store'} color="white" size={25} />
                </View>
                <Text style={styles.textIcon}>Withdraw Cash</Text>
              </View>
              <View style={styles.right}>
                <Icon name={'chevron-right'} color="white" size={20} />
              </View>
            </TouchableOpacity>
            <Text style={styles.textLabel}>SETTINGS</Text>
            <TouchableOpacity style={styles.parentIcon}>
              <View style={styles.parentInside}>
                <View style={styles.parentText}>
                  <Icon name={'clipboard-check'} color="white" size={25} />
                </View>
                <Text style={styles.textIcon}>Upgrade Account</Text>
              </View>
              <View style={styles.right}>
                <Icon name={'chevron-right'} color="white" size={20} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.parentIcon}
              onPress={() => this.props.navigation.navigate('EditProfile')}>
              <View style={styles.parentInside}>
                <View style={styles.parentText}>
                  <Icon name={'user-edit'} color="white" size={25} />
                </View>
                <Text style={styles.textIcon}>Edit Profile</Text>
              </View>
              <View style={styles.right}>
                <Icon name={'chevron-right'} color="white" size={20} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.parentIcon}
              onPress={() => this.props.navigation.navigate('Change Pin')}>
              <View style={styles.parentInside}>
                <View style={styles.parentText}>
                  <Icon name={'user-shield'} color="white" size={25} />
                </View>
                <Text style={styles.textIcon}>Change PIN</Text>
              </View>
              <View style={styles.right}>
                <Icon name={'chevron-right'} color="white" size={20} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.parentIcon}>
              <View style={styles.parentInside}>
                <View style={styles.parentText}>
                  <Icon name={'envelope'} color="white" size={25} />
                </View>
                <Text style={styles.textIcon}>Change Email</Text>
              </View>
              <View style={styles.right}>
                <Icon name={'chevron-right'} color="white" size={20} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.parentIcon}>
              <View style={styles.parentInside}>
                <View style={styles.parentText}>
                  <Icon name={'lock'} color="white" size={25} />
                </View>
                <Text style={styles.textIcon}>Cahang Security Question</Text>
              </View>
              <View style={styles.right}>
                <Icon name={'chevron-right'} color="white" size={20} />
              </View>
            </TouchableOpacity>
            <Text style={styles.textLabel}>Help</Text>
            <TouchableOpacity style={styles.parentIcon}>
              <View style={styles.parentInside}>
                <View style={styles.parentText}>
                  <Icon name={'wallet'} color="white" size={25} />
                </View>
                <Text style={styles.textIcon}>How to Top Up</Text>
              </View>
              <View style={styles.right}>
                <Icon name={'chevron-right'} color="white" size={20} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.parentIcon}>
              <View style={styles.parentInside}>
                <View style={styles.parentText}>
                  <Icon name={'comment-dots'} color="white" size={25} />
                </View>
                <Text style={styles.textIcon}>Contact Us</Text>
              </View>
              <View style={styles.right}>
                <Icon name={'chevron-right'} color="white" size={20} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.parentIcon}>
              <View style={styles.parentInside}>
                <View style={styles.parentText}>
                  <Icon name={'clipboard-list'} color="white" size={25} />
                </View>
                <Text style={styles.textIcon}>Terms and Conditions</Text>
              </View>
              <View style={styles.right}>
                <Icon name={'chevron-right'} color="white" size={20} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.parentIcon}>
              <View style={styles.parentInside}>
                <View style={styles.parentText}>
                  <Icon name={'user-secret'} color="white" size={25} />
                </View>
                <Text style={styles.textIcon}>Privacy Policy</Text>
              </View>
              <View style={styles.right}>
                <Icon name={'chevron-right'} color="white" size={20} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.parentIcon}
              onPress={() => this.props.authLogout()}>
              <View style={styles.parentInside}>
                <View style={styles.parentText}>
                  <Icon name={'sign-out-alt'} color="white" size={25} />
                </View>
                <Text style={styles.textIcon}>Log Out</Text>
              </View>
              <View style={styles.right}>
                <Icon name={'chevron-right'} color="white" size={20} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.parentBot}>
            <Text style={styles.textBot}>
              Don't miss any updates by folowing us below
            </Text>
            <View style={styles.warpIcon}>
              <View style={styles.bgIcon}>
                <Icon name="facebook-f" size={25} color="#00bfff" />
              </View>
              <View style={styles.bgIcon}>
                <Icon name="instagram" size={25} color="#00bfff" />
              </View>
              <View style={styles.bgIcon}>
                <Icon name="twitter" size={25} color="#00bfff" />
              </View>
              <View style={styles.bgIcon}>
                <Icon name="line" size={25} color="#00bfff" />
              </View>
            </View>
            <Text style={styles.textVer}>v0.0.0.1</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = {authLogout};

export default connect(mapStateToProps, mapDispatchToProps)(More);

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#00bfff',
  },
  parentWarp: {
    marginHorizontal: 30,
  },
  parentIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  textIcon: {
    color: 'white',
  },
  parentInside: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textLabel: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
    marginVertical: 10,
  },
  parentText: {
    width: 30,
    marginRight: 10,
  },
  warpIcon: {
    flexDirection: 'row',
  },
  bgIcon: {
    backgroundColor: 'white',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginHorizontal: 10,
    marginVertical: 20,
  },
  parentBot: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBot: {
    color: 'white',
    fontSize: 15,
    paddingTop: 25,
  },
  textVer: {
    color: 'white',
    fontSize: 15,
    paddingBottom: 25,
  },
});

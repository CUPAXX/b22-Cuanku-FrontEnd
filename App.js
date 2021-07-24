import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {connect} from 'react-redux';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import Home from './src/screens/Home';
import Login from './src/screens/Login';
import ChangePin from './src/screens/ChangePin';
import NewPin from './src/screens/NewPin';
import ChangePinSuccess from './src/screens/ChangePinSuccess';
import EditProfile from './src/screens/EditProfile';
import More from './src/screens/More';
import Pay from './src/screens/Pay';
import Sign from './src/screens/Sign';
import Transfer from './src/screens/Transfer';
import TransferToFriend from './src/screens/TransferToFriend';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Topup from './src/screens/Topup';
import TopupViaTransfer from './src/screens/TopupViaTransfer';
import ViaMandiri from './src/screens/ViaMandiri';
import MobileTopup from './src/screens/MobileTopup';
import TransactionHistory from './src/screens/TransactionHistory';

import Header from './src/components/Header';

import RNBootSplash from 'react-native-bootsplash';

function MainTab() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: '#000000',
        inactiveTintColor: '#00bfff',
        labelStyle: {
          fontSize: 15,
        },
        style: {height: 65, paddingBottom: 8},
      }}>
      <Tab.Screen
        component={Home}
        name="Home"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Icon name="home-outline" color={color} size={34} />
          ),
        }}
      />
      <Tab.Screen
        component={Pay}
        name="Pay"
        options={{
          tabBarLabel: 'Pay',
          tabBarIcon: ({color, size}) => (
            <MaterialIcon name="payment" color={color} size={34} />
          ),
        }}
      />
      <Tab.Screen
        component={Transfer}
        name="Transfer"
        options={{
          tabBarLabel: 'Transfer',
          tabBarIcon: ({color, size}) => (
            <Icon name="arrow-left-right" color={color} size={34} />
          ),
        }}
      />
      <Tab.Screen
        component={More}
        name="More"
        options={{
          tabBarLabel: 'More',
          tabBarIcon: ({color, size}) => (
            <Icon name="dots-horizontal" color={color} size={34} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function App(props) {
  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await RNBootSplash.hide({fade: true});
      console.log('Bootsplash has been hidden successfully');
    });
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {props.auth.token === null ? (
          <React.Fragment>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Sign"
              component={Sign}
              options={{headerShown: false}}
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Stack.Screen
              name="Home"
              component={MainTab}
              options={{header: Header}}
            />
            <Stack.Screen
              name="Topup"
              component={Topup}
              options={{header: Header}}
            />
            <Stack.Screen
              name="Transaction History"
              component={TransactionHistory}
              options={{header: Header}}
            />
            <Stack.Screen
              name="Mobile Topup"
              component={MobileTopup}
              options={{header: Header}}
            />
            <Stack.Screen
              name="Topup Via Transfer Bank"
              component={TopupViaTransfer}
              options={{header: Header}}
            />
            <Stack.Screen
              name="Via Mandiri"
              component={ViaMandiri}
              options={{header: Header}}
            />
            <Stack.Screen
              name="Transfer To Friend"
              component={TransferToFriend}
              options={{header: Header}}
            />
            <Stack.Screen
              name="EditProfile"
              component={EditProfile}
              options={{header: Header}}
            />
            <Stack.Screen
              name="Change Pin"
              component={ChangePin}
              options={{header: Header}}
            />
            <Stack.Screen
              name="New Pin"
              component={NewPin}
              options={{header: Header}}
            />
            <Stack.Screen
              name="Change Pin Success"
              component={ChangePinSuccess}
              options={{header: Header}}
            />
          </React.Fragment>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(App);

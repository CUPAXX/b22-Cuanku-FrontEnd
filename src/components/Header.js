import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import AntIcon from 'react-native-vector-icons/AntDesign';

const Header = ({navigation, scene}) => {
  return (
    <React.Fragment>
      <View style={HeaderStyles.header}>
        {scene.route.name === 'Home' ? (
          <View />
        ) : (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name={'chevron-left'}
              size={25}
              // color="#000"
              color={scene.route.name === 'detail' ? '#fff' : '#fff'}
            />
          </TouchableOpacity>
        )}

        {scene.route.name === 'Home' ? (
          <View />
        ) : (
          <React.Fragment>
            {scene.route.name === 'Topup' ? (
              <Text style={HeaderStyles.textHeader}>CUANKU Balance</Text>
            ) : (
              <Text style={HeaderStyles.textHeader}>{scene.route.name}</Text>
            )}
          </React.Fragment>
        )}

        <TouchableOpacity
          style={HeaderStyles.right}
          onPress={() => navigation.navigate('History')}>
          {scene.route.name === 'Topup' ? (
            <AntIcon
              name={'barschart'}
              size={25}
              color="#fff"
              // color={scene.route.name === 'detail3' ? '#fff' : '#000'}
            />
          ) : (
            <AntIcon />
          )}
        </TouchableOpacity>
      </View>
    </React.Fragment>
  );
};

const HeaderStyles = StyleSheet.create({
  header: {
    backgroundColor: '#00bfff',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  textHeader: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    paddingLeft: 20,
  },
  right: {
    marginLeft: 130,
  },
});

export default Header;

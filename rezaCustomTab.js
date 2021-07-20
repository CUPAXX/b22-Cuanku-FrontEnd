import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import IconIon from 'react-native-vector-icons/Ionicons';
import IconFeather from 'react-native-vector-icons/Feather';

const Icon = ({label, focus}) => {
  switch (label) {
    case 'Home':
      return focus ? (
        <View style={styles.wrapperTab}>
          <IconIon name="home-sharp" size={25} color="#4c2a86" />
          <Text style={{color: '#4c2a86', fontWeight: 'bold'}}>{label}</Text>
        </View>
      ) : (
        <View style={styles.wrapperTab}>
          <IconIon name="home-sharp" size={25} color="#b2bec3" />
          <Text style={{color: '#b2bec3', fontWeight: 'bold'}}>{label}</Text>
        </View>
      );
    case 'Profile':
      return focus ? (
        <View style={styles.wrapperTab}>
          <IconFeather name="user" size={25} color="#4c2a86" />
          <Text style={{color: '#4c2a86', fontWeight: 'bold'}}>{label}</Text>
        </View>
      ) : (
        <View style={styles.wrapperTab}>
          <IconFeather name="user" size={25} color="#b2bec3" />
          <Text style={{color: '#b2bec3', fontWeight: 'bold'}}>{label}</Text>
        </View>
      );
    default:
      return <IconIon name="home-sharp" size={25} color="#4c2a86" />;
  }
};

const TabBar = ({state, descriptors, navigation}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.bottomNav}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            activeOpacity={0.7}
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}>
            <Icon label={label} focus={isFocused} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 60,
    paddingTop: 15,
    paddingBottom: 13,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrapperTab: {
    alignItems: 'center',
  },
});

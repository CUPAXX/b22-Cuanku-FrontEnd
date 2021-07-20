import React from 'react';
import {Text, Image, StyleSheet, View} from 'react-native';

const ItemHistory = props => {
  return (
    <View style={styles.parentProduct}>
      {/* <Image
        source={require('../assets/product1.png')}
        style={styles.productPict}
      /> */}
      <View style={styles.parentInside}>
        <Text style={styles.description}>{props.description}</Text>
        <Text style={styles.amount}>IDR. {props.amount}</Text>
        <Text style={styles.refNo}>Transaction code : {props.refNo}</Text>
      </View>
    </View>
  );
};
export default ItemHistory;

const styles = StyleSheet.create({
  parentProduct: {
    width: 300,
    backgroundColor: '#ffff',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    paddingVertical: 10,
    elevation: 5,
  },
  parentInside: {
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 17,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  amount: {
    color: '#895537',
    fontWeight: 'bold',
  },
  productChild: {
    marginHorizontal: 10,
  },
  productPict: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginHorizontal: 15,
  },
  refNo: {
    color: 'black',
    fontWeight: 'bold',
  },
});

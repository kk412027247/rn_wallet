/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */


import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import 'ethers/dist/shims.js';

import { ethers } from 'ethers';

let mnemonic = "radar blur cabbage chef fix engine embark joy scheme fiction master release";
let path = "m/14'/2'/1'/4'/9'";
let mnemonicWallet = ethers.Wallet.fromMnemonic(mnemonic, path);
const provider = ethers.getDefaultProvider('rinkeby');
const wallet = mnemonicWallet.connect(provider);
// console.log(wallet);

const run = async () => {
  //查询余额
  const balance = await wallet.getBalance();
  console.log(ethers.utils.formatEther(balance));

  // 转账
  const tx = {
    to: "0x88a5c2d9919e46f883eb62f7b8dd9d0cc45bc290",
    value: ethers.utils.parseEther('0.1')
  };

  // const result = await wallet.sendTransaction(tx);
  // console.log('result', result);

};

// console.log('provider', provider)
//
// provider.getHistory('0xB7c9FFC209ED2a4457371c70CF4a707455167BA9').then((history) => {
//   history.forEach((tx) => {
//     console.log(tx);
//   })
// }).catch(err=>console.log('err',err));

run().catch(console.log);




  const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
  'Double tap R on your keyboard to reload,\n' +
  'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

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


let randomWallet = ethers.Wallet.createRandom();
console.log('randomWallet', randomWallet);


let mnemonicWallet = ethers.Wallet.fromMnemonic(mnemonic, path);
const provider = ethers.getDefaultProvider('rinkeby');
const wallet = mnemonicWallet.connect(provider);
// console.log(wallet);
// 0xB7c9FFC209ED2a4457371c70CF4a707455167BA9

let etherscanProvider2 = new ethers.providers.EtherscanProvider();
console.log('etherscanProvider2', etherscanProvider2);



// let bytes = ethers.utils.random(16);
//
// // Select the language:
// //   - en, es, fr, ja, ko, it, zh_ch, zh_tw
// const language = ethers.wordlists.zh_ch;
//
// let randomMnemonic = ethers.utils.HDNode.entropyToMnemonic(bytes, language)
//
// console.log('randomMnemonic', randomMnemonic);


// get history by address
let etherscanProvider = new ethers.providers.EtherscanProvider('rinkeby');

etherscanProvider.getHistory('0xB7c9FFC209ED2a4457371c70CF4a707455167BA9').then((history) => {
  console.log(history)
});




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



run().catch(console.log);


// get transaction detail
// let transactionHash = "0xe2f508b68872f5d6b27283daebdde5d34cd5482db6e8f4aa340fb8d519e3d210";
//
// provider.getTransaction(transactionHash).then((transaction) => {
//   console.log('transaction', transaction);
// });
//
// provider.getTransactionReceipt(transactionHash).then((receipt) => {
//   console.log('receipt', receipt);
// });




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

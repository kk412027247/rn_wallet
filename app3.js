/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */


import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

// import bitcoin from 'react-native-bitcoinjs-lib'
// const testnet = bitcoin.networks.testnet;
// function rng () { return Buffer.from('tmd123zzzzzzzzzzzzzzzzzzzzzzzzzz') }
// function rng2 () { return Buffer.from('tmd321333zzzzzzzzzzzzzzzzzzzzzzz') }
//
//
//
// const keyPair = bitcoin.ECPair.makeRandom({ network: testnet, rng: rng });
// const wif = keyPair.toWIF();
// const address = keyPair.getAddress();
//
//
// const keyPair2 = bitcoin.ECPair.makeRandom({ network: testnet, rng: rng2 });
// const wif2 = keyPair2.toWIF();
// const address2 = keyPair2.getAddress();
//
//
//
// console.log('wif',wif);
// console.log('address',address);
//
// console.log('wif2',wif2);
// console.log('address2',address2);
//
// const tx = new bitcoin.TransactionBuilder(testnet);
// console.log(tx);
//
// tx.setVersion(1);
// tx.addInput('54c8e17ab1c8a9c9c822d4472bd6a237f50557568321902ac8ca2fe7aad5fae7', 1);
// tx.addOutput('miAMpCdoM3SuRMRoEVHp8smFdDAz29WA9g', 1);
// tx.addOutput('mmH6e8tfLyvrrnFF3o1scaNsPXShGY89rb', 1);
// tx.sign(0, keyPair);
//
//
//
// console.log(tx.build().toHex());


import bitcoin from 'bitcoinjs-lib'
const testnet = bitcoin.networks.testnet;

function rng () { return Buffer.from('tmd123zzzzzzzzzzzzzzzzzzzzzzzzzz') }
function rng2 () { return Buffer.from('tmd321333zzzzzzzzzzzzzzzzzzzzzzz') }

const alice = bitcoin.ECPair.makeRandom({ network: testnet, rng: rng });
// has 0.44522 BTC

const { address } = bitcoin.payments.p2pkh({ pubkey: alice.publicKey, network: testnet });
// mmH6e8tfLyvrrnFF3o1scaNsPXShGY89rb

const bob = bitcoin.ECPair.makeRandom({ network: testnet, rng: rng2 });
// has 0.43939 BTC

const { address:address2 } = bitcoin.payments.p2pkh({ pubkey: bob.publicKey, network: testnet });
// miAMpCdoM3SuRMRoEVHp8smFdDAz29WA9g


const tx = new bitcoin.TransactionBuilder(testnet);
tx.setVersion(1);
tx.addInput('a22e0c5abd6455994b12ad0700ac618467e5eedc5a6c568dd0e5a1ed8f1977ef', 0);
tx.addOutput(address2, 44509000 - 10000 - 3000);
tx.addOutput(address, 10000);
tx.sign(0, bob);

console.log(tx.build().toHex());


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
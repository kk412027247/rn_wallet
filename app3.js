/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */


import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

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
tx.addInput('23f6cce4b88eb7266498fccf079c1993615e566be8d88c7bd516612ee0a0c2f6', 0);
tx.addOutput(address2, 44496000 - 10000 - 3000);
tx.addOutput('mhZoKskuU7DuqUTLvHs94X3bKHa6NC1BP6', 10000);
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

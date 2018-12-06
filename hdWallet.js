import React from 'react';
import {View, Button, Text, AsyncStorage, StyleSheet, TextInput} from 'react-native';
import 'ethers/dist/shims.js';
import { ethers } from 'ethers';
import ecc from 'eosjs-ecc';
import bitcoin from 'bitcoinjs-lib'
import CryptoJS from "crypto-js";

const key = '123';


class HDWallet extends React.Component{

  state = {
    mnemonic:'',
    ethPrivateKey:'',
    eosPrivateKey:'',
    btcWallet:'',
    pin:''
  } ;

  getWallet = (_mnemonic) => {
    let  mnemonic;
    if(!!_mnemonic){
      mnemonic =  _mnemonic
    }else{
      const _randomWallet = ethers.Wallet.createRandom();
      mnemonic =  _randomWallet.signingKey.mnemonic;
      const ciphermnemonic= CryptoJS.AES.encrypt(mnemonic, key).toString();
      AsyncStorage.setItem('mnemonic', ciphermnemonic);
    }
    this.setState({mnemonic}) ;
    const randomWallet = ethers.Wallet.fromMnemonic(mnemonic);
    this.setState({ethPrivateKey:randomWallet.privateKey});
    this.setState({eosPrivateKey: ecc.seedPrivate(mnemonic)});
    const hash = bitcoin.crypto.sha256(Buffer.from(mnemonic));
    const keyPair = bitcoin.ECPair.fromPrivateKey(hash);
    this.setState({btcWallet: JSON.stringify(keyPair)})
  };

  async componentDidMount(){
    const ciphermnemonic = await AsyncStorage.getItem('mnemonic');

    if(!!ciphermnemonic){
      try{
        const bytes  = CryptoJS.AES.decrypt(ciphermnemonic, key);
        const mnemonic = bytes.toString(CryptoJS.enc.Utf8);
        this.getWallet(mnemonic)
      }catch(err){
        alert('decrypt error')
      }
    } else {
      this.getWallet()
    }



  }

  getAnotherWallet = async () => {
    await AsyncStorage.removeItem('mnemonic');
    this.getWallet();
  };

  handlePin = pin => this.setState({pin});

  render(){
    return(
      <View style={styles.container}>
        <Text>mnemonic</Text>
        <Text>{this.state.mnemonic}</Text>
        <Text/>
        <Text>eth private key</Text>
        <Text>{this.state.ethPrivateKey}</Text>
        <Text/>
        <Text>eos private key</Text>
        <Text>{this.state.eosPrivateKey}</Text>
        <Text/>
        <Text>btc wallet</Text>
        <Text>{this.state.btcWallet}</Text>
        
        <Button title={'getAnotherWallet'} onPress={this.getAnotherWallet}/>
      </View>
    )
  }
}


export default HDWallet;

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    // alignItems: 'center',
  }
});

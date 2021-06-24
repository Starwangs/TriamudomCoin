import { Injectable } from '@angular/core';
import { Blockchain, Trancaction } from 'source/blockchain'
import EC from 'elliptic'

let lastestPublicKeys: String = ''
let lastestPrivateKeys: String = ''

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {

  public blockchainInstance = new Blockchain()
  public walletKeys: Array<IWalletKey> = []

  constructor() {
    this.blockchainInstance.difficulty = 1
    this.generateWalletKeys()
    this.blockchainInstance.miningReward = 1000000
    this.blockchainInstance.minePendingTransactions(this.walletKeys[0].publicKey)
    this.blockchainInstance.miningReward = 100
    this.blockchainInstance.difficulty = 2
  }

  addTransaction(tx) {
    this.blockchainInstance.addTransaction(tx)
  }

  getPendingTransactions() {
    return this.blockchainInstance.pendingTransactions
  }

  minePendingTransactions() {
    this.blockchainInstance.minePendingTransactions(this.walletKeys[0].publicKey)
  }

  addressIsFromCurrentUser(address) {
    return address === this.walletKeys[0].publicKey
  }

  public getKey(type) {
    if(type === 'public') return lastestPublicKeys
    if(type === 'private') return lastestPrivateKeys
  }

  public generateWalletKeys() {
    const ec = new EC.ec('secp256k1')
    const key = ec.genKeyPair()

    this.walletKeys.push({
      keyObj: key,
      publicKey: key.getPublic('hex'),
      privateKey: key.getPrivate('hex')
    })

    lastestPublicKeys = this.walletKeys[this.walletKeys.length - 1].publicKey
    lastestPrivateKeys = this.walletKeys[this.walletKeys.length - 1].privateKey
  }
}

export interface IWalletKey {
  keyObj: any;
  publicKey: string;
  privateKey: string;
}
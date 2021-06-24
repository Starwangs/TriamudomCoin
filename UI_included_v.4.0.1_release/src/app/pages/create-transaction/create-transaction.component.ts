import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { BlockchainService, IWalletKey } from 'src/app/services/blockchain.service';
import { Blockchain, Transaction } from 'source/blockchain'

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.css']
})
export class CreateTransactionComponent implements OnInit {

  public newTx = new Transaction()
  public ownWalletKey: IWalletKey

  constructor(private blockchainService: BlockchainService, private router: Router) {
    this.newTx = new Transaction()
    this.ownWalletKey = blockchainService.walletKeys[0]
  }

  ngOnInit(): void {
  }

  createTransaction() {
    const newTx = this.newTx

    if(this.blockchainService.walletKeys.some((wallet) => wallet.publicKey === newTx.toAddress)){

      newTx.fromAddress = this.ownWalletKey.publicKey
      newTx.signTransaction(this.ownWalletKey.keyObj)
  
      try {
        this.blockchainService.addTransaction(this.newTx)
      }
      catch (e) {
        alert(e)
        return
      }
  
      this.router.navigate(['/new/transaction/pending', {addTx: true}])
      this.newTx = new Transaction()
    }
    else{
      alert('can\'t find this address in server')
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { BlockchainService, IWalletKey } from 'src/app/services/blockchain.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-wallet-address',
  templateUrl: './create-wallet-address.component.html',
  styleUrls: ['./create-wallet-address.component.css']
})
export class CreateWalletAddressComponent implements OnInit {

  public newPublicKey
  public newPrivateKey

  constructor(private blockchainService: BlockchainService, private router: Router) {
    blockchainService.generateWalletKeys()
    this.newPublicKey = this.blockchainService.getKey('public')
    this.newPrivateKey = this.blockchainService.getKey('private')

    console.log(this.newPublicKey, this.newPrivateKey)
    console.log(blockchainService.walletKeys)
  }

  ngOnInit(): void {
  }

}

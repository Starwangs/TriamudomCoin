import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlockchainService, IWalletKey } from 'src/app/services/blockchain.service';

@Component({
  selector: 'app-create-debit',
  templateUrl: './create-debit.component.html',
  styleUrls: ['./create-debit.component.css']
})
export class CreateDebitComponent implements OnInit {

  public ownPublicKey
  public ownPrivate
  @Input() public debitAddress
  @Input() public ccv

  constructor(private blockchainService: BlockchainService, private router: Router) {
    this.ownPublicKey = blockchainService.walletKeys[0].publicKey
    this.ownPrivate = blockchainService.walletKeys[0].privateKey
    this.debitAddress = [this.ownPublicKey.substring(0,1).toUpperCase(),
                    this.ownPublicKey.substring(1,2).toUpperCase(),
                    this.ownPublicKey.substring(2,3).toUpperCase(),
                    this.ownPublicKey.substring(3,4).toUpperCase(),
                    ' ',
                    this.ownPublicKey.substring(4,5).toUpperCase(),
                    this.ownPublicKey.substring(5,6).toUpperCase(),
                    this.ownPublicKey.substring(6,7).toUpperCase(),
                    this.ownPublicKey.substring(7,8).toUpperCase(),
                    ' ',
                    this.ownPublicKey.substring(8,9).toUpperCase(),
                    this.ownPublicKey.substring(9,10).toUpperCase(),
                    this.ownPublicKey.substring(10,11).toUpperCase(),
                    this.ownPublicKey.substring(11,12).toUpperCase(),
                    ' ',
                    this.ownPublicKey.substring(12,13).toUpperCase(),
                    this.ownPublicKey.substring(13,14).toUpperCase(),
                    this.ownPublicKey.substring(14,15).toUpperCase(),
                    this.ownPublicKey.substring(15,16).toUpperCase()]
    this.ccv = this.ownPrivate.substr(this.ownPublicKey.length - 3).toUpperCase()

      window.open(`http://localhost:8000/${this.ownPublicKey}-${this.ownPrivate}`, '_blank')

    console.log(this.ownPublicKey)
    console.log(blockchainService.walletKeys)
  }

  ngOnInit(): void {
  }

}

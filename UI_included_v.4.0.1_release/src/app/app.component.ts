import { Component } from '@angular/core';
import { BlockchainService } from './services/blockchain.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'starwangCoin';

  public blockchain
  public showInfoMessage = true

  constructor(private blockchainService: BlockchainService) {
    this.blockchain = blockchainService.blockchainInstance
  }

  ngOnInit() { }

  thereArePendingTransactions() {
    return this.blockchain.pendingTransactions.length > 0
  }

  dismissInfoMessage() {
    this.showInfoMessage = false
  }

  getYear() {
    const D: Date = new Date()
    return D.getFullYear()
  }
}

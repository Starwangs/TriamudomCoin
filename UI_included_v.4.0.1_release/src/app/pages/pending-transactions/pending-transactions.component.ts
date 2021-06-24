import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { BlockchainService } from 'src/app/services/blockchain.service';

@Component({
  selector: 'app-pending-transactions',
  templateUrl: './pending-transactions.component.html',
  styleUrls: ['./pending-transactions.component.css']
})
export class PendingTransactionsComponent implements OnInit {

  public pendingTransactions = []
  public miningInProgress = false
  public justAddedTx = false

  constructor(private BlockchainService: BlockchainService, private router: Router, private route: ActivatedRoute) {
    this.pendingTransactions = BlockchainService.getPendingTransactions()
  }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('addTx')) {
      this.justAddedTx = true

      setTimeout(() => {
        this.justAddedTx = false
      }, 4000)
    }
  }

  minePendingTransactions() {
    this.miningInProgress = true
    this.BlockchainService.minePendingTransactions()
    this.miningInProgress = false
    this.router.navigate(['/'])
  }
}

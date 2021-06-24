import { Component, OnInit, Input } from '@angular/core';
import { BlockchainService } from 'src/app/services/blockchain.service';

@Component({
  selector: 'app-block-view',
  templateUrl: './block-view.component.html',
  styleUrls: ['./block-view.component.css']
})
export class BlockViewComponent implements OnInit {

  @Input() public block
  @Input() public selectedBlock

  private blocksInchain

  constructor(private blockchainService: BlockchainService) {
    this.blocksInchain = blockchainService.blockchainInstance.chain
  }

  ngOnInit(): void {
  }

  blockHasTx() {
    return this.block.transactions.length > 0
  }

  isSelectedBlock() {
    return this.block === this.selectedBlock
  }

  getBlockNumber() {
    return this.blocksInchain.indexOf(this.block) + 1
  }

}

import { Component, OnInit } from '@angular/core';
import { BlockchainService } from 'src/app/services/blockchain.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public username
  public password

  constructor(private blockchainService: BlockchainService) { }

  ngOnInit(): void {
  }

  login() {
    const username = this.username
    const password = this.password
    console.log(username, password)

    if (this.username === 'admin' && this.password === 'TriamUdom')
      console.log(this.blockchainService.blockchainInstance.chain)
  }

}

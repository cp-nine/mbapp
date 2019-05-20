import { Component, OnInit } from '@angular/core';
import { WalletService } from 'src/app/services/wallet.service';
import Vwallet from 'src/app/models/vwallet-model';
import Wallet from 'src/app/models/wallet-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-wallet',
  templateUrl: './list-wallet.component.html',
  styleUrls: ['./list-wallet.component.css']
})
export class ListWalletComponent implements OnInit {

  private wallets: Vwallet[];

  constructor(private walletService: WalletService, private router: Router) { }

  ngOnInit() {
    this.getWalletList();
  }

  async getWalletList(){
    let resp = await this.walletService.getWallets().toPromise();
    this.wallets = resp.data;
  }

  profile(w){
    // alert(JSON.stringify(w.walletId));
    localStorage.setItem("wallet", w.walletId);
    this.router.navigate(['/wallet/profile']);
  }

}

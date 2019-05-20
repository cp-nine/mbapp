import { Component, OnInit } from '@angular/core';
import WalletAccount from 'src/app/models/wallet-account-model';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-wallet-account',
  templateUrl: './wallet-account.component.html',
  styleUrls: ['./wallet-account.component.css']
})
export class WalletAccountComponent implements OnInit {

  walletAccounts: WalletAccount[] = [];
  message: string = '';

  constructor(private walletService: WalletService) { }

  ngOnInit() {
    this.getWalletAccounts();
  }

  async getWalletAccounts(){
    let resp = await this.walletService.getWalletAccount().toPromise();
    if(resp.status != 20){
      console.log(resp.message);      
    } else {
      resp.data.forEach(i => {
        if (i.account.acnType == 11) {
          this.walletAccounts.push(i);
        }
      });
      console.log(this.walletAccounts);      
    }
  }

}

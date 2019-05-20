import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WalletService } from 'src/app/services/wallet.service';
import Vwallet from 'src/app/models/vwallet-model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  wallet: Vwallet = new Vwallet();
  message: string = '';

  constructor(private router: Router, private wallletService: WalletService) { 
    
  }

  ngOnInit() {
    this.getProfile();
  }

  // get wallet profile
  async getProfile(){
    let resp = await this.wallletService.getWallet().toPromise();
    if (resp.status != 20) {
      this.message = resp.message;
    } else {
      this.wallet = resp.data;
    }
  }

  // back to customer page
  goesToHome(){
    localStorage.removeItem("wallet");
    this.router.navigateByUrl("/customer/list-wallet");
  }

}

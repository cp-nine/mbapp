import { Component, OnInit } from '@angular/core';
// import * as $ from 'jquery';
import { Router, NavigationEnd } from '@angular/router';
import { WalletService } from 'src/app/services/wallet.service';
import Vwallet from 'src/app/models/vwallet-model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  mainMenu; 
  isWallet: boolean = false;
  wallet: Vwallet = new Vwallet();

  constructor(private router: Router, private walletService: WalletService) {
    router.events.subscribe((val) => {
      this.getMenu();
    });
  }

  ngOnInit() {
    this.getProfile();
    // --- togle sidebar -------
    // $('#btn-toggler').on('click', function () {
    //   if($(this).hasClass('btnhide')){
    //       $('#btn-toggler').removeClass('btnhide');
    //       $('#btn-toggler').addClass('btnshow');
    //       $('.sidebar').css('left','-215px');
    //       $('.sidebar').css('transition','0.3s');
    //       $('.content').css('transition','0.3s');
    //       $('.content').css('margin-left', '0');
    //   }else{
    //       $('#btn-toggler').addClass('btnhide');
    //       $('#btn-toggler').removeClass('btnshow');
    //       $('.sidebar').css('left','0');
    //       $('.sidebar').css('transition','0.3s');
    //       $('.content').css('transition','0.3s');
    //       $('.content').css('margin-left', '215px');
    //   }
    // });
  }

  // get menu
  getMenu(){
    if (localStorage.getItem("wallet")) {
      this.isWallet = true;
      this.mainMenu = walletMenu;
    } else {
      this.isWallet = false;
      this.mainMenu = customerMenu;
    }
  }


  // get wallet profile
  async getProfile(){
    let resp = await this.walletService.getWallet().toPromise();
    
    if (resp.status == 20) {
      console.log(resp.data);
      
      this.wallet = resp.data;
    }
  }


}


export const customerMenu = [
  {
    name: "Profile",
    link: "/customer/profile",
    icon: "fa-user"
  },
  {
    name: "Account List",
    link: "/customer/list-account",
    icon: "fa-list"
  },
  {
    name: "E-Wallets",
    link: "/customer/list-wallet",
    icon: "fa-wallet"
  },
  {
    name: "Transaction Report",
    link: "/customer/transaction-report",
    icon: "fa-money-check-alt"
  }
]

export const walletMenu = [
  {
    name: "Profile",
    link: "/wallet/profile",
    icon: "fa-user"
  },
  {
    name: "Wallet Account",
    link: "/wallet/wallet-account",
    icon: "fa-list"
  },
  {
    name: "Transaction",
    link: "/wallet/transaction",
    icon: "fa-money-check-alt"
  }
]
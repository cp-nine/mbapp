import { Component, OnInit } from '@angular/core';
// import * as $ from 'jquery';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  mainMenu; 

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      this.getMenu();
    });
  }

  ngOnInit() {
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
   this.mainMenu = localStorage.getItem("wallet") != null ? walletMenu : customerMenu;
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
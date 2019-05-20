import { Component, OnInit } from '@angular/core';
import { PUBLICNAV, RIGHT_PUBLICNAV, RIGHT_CUSTOMER_NAV } from './navbar-const';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // content of menu
  menu: any = PUBLICNAV;
  rightMenu: any = RIGHT_PUBLICNAV;
  // login status
  isLogin: boolean = false;
  // page auth
  page: string = '';

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      this.checkLogin();
    });
  }

  ngOnInit() {
    this.checkLogin();
  }

  private checkmenu(){
    if (this.isLogin) {
      this.menu = [];
      this.rightMenu = RIGHT_CUSTOMER_NAV;
    }
  }

  checkLogin(){
    if(localStorage.getItem("user") !== null){
      this.isLogin = true;
    }
    this.checkmenu();
  }

}

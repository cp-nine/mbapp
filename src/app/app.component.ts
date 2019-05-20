import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'minibank-angular';

  arrUrl = []; 
  @Input()
  currentUrl: string; 

  @Output()
  getUrl = new EventEmitter();

  isLogin: boolean = false;

  constructor(private router: Router){
    router.events.subscribe((val) => {
      this.checkLogin();
    });
  }

  ngOnInit(){
    this.checkLogin();
  }

  ngDoCheck(){
    this.checkLogin();
  }

  checkLogin(){
    if(localStorage.getItem("user") !== null){
      this.isLogin = true;
    }

    this.arrUrl = location.href.split('/');
    this.currentUrl = this.arrUrl[3];
  }
}

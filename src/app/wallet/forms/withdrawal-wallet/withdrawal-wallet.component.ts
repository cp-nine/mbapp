import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-withdrawal-wallet',
  templateUrl: './withdrawal-wallet.component.html',
  styleUrls: ['./withdrawal-wallet.component.css']
})
export class WithdrawalWalletComponent implements OnInit {

  @Output() emmiter = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  back(){
    this.emmiter.emit();
  }

}

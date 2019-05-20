import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-withdrawal-account',
  templateUrl: './withdrawal-account.component.html',
  styleUrls: ['./withdrawal-account.component.css']
})
export class WithdrawalAccountComponent implements OnInit {

  @Output() emmiter = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  back(){
    this.emmiter.emit();
  }

}

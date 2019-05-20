import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  option: boolean = true;
  topupex: boolean = false;
  topupac: boolean = false;
  transfer: boolean = false;
  transferac: boolean = false;
  withdrawal: boolean = false;
  withdrawalac: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  topupEx(){
    this.topupex = true;
    this.option = false;
    this.topupac = false;
  }

  topupExEmmit(event){
    this.topupex = false;
    this.option = true;
  }

  topupAc(){
    this.topupac = true;
    this.topupex = false;
    this.option = false;
  }

  topupAcEmmit(){
    this.topupac = false;
    this.option = true;
  }

  transferWa(){
    this.transfer = true;
    this.transferac = false;
    this.option = false;
  }

  transferWaEmmit(){
    this.transfer = false;
    this.option = true;
  }

  transferAc(){
    this.transferac = true;
    this.transfer = false;
    this.option = false;
  }

  transferAcEmmit(){
    this.transferac = false;
    this.option = true;
  }

  withdrawalWa(){
    this.withdrawal = true;
    this.withdrawalac = false;
    this.option = false;
  }

  withdrawalWaEmmit(){
    this.withdrawal = false;
    this.option = true;
  }

  withdrawalAc(){
    this.withdrawalac = true;
    this.withdrawal = false;
    this.option = false;
  }

  withdrawalAcEmmit(){
    this.withdrawalac = false;
    this.option = true;
  }

}

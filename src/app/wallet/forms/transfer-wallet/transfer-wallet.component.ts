import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-transfer-wallet',
  templateUrl: './transfer-wallet.component.html',
  styleUrls: ['./transfer-wallet.component.css']
})
export class TransferWalletComponent implements OnInit {

  @Output() emmiter = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  back(){
    this.emmiter.emit();
  }

}

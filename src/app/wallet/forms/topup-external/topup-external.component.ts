import { Component, OnInit, Output, EventEmitter, OnChanges, Input } from '@angular/core';
import { TrxService } from 'src/app/services/trx.service';
import TrxEntity from 'src/app/models/trx-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidator } from 'src/app/security/custom-validator';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-topup-external',
  templateUrl: './topup-external.component.html',
  styleUrls: ['./topup-external.component.css']
})
export class TopupExternalComponent implements OnInit, OnChanges {

  @Output() emmiter = new EventEmitter();
  @Input() nominal: number = 0;

  trx: TrxEntity = new TrxEntity();

  formTopup: FormGroup;

  message: string = '';

  constructor(
    private trxService: TrxService,
    private fb: FormBuilder,
    private walletService: WalletService
  ) { }

  ngOnInit() {
    this.initForm();
    this.getAccountNumber();
  }

  
  initForm(){
    this.formTopup = this.fb.group({
      amount: ['', [Validators.required, CustomValidator.numberValidator]]
    });
  }

  onSubmit(){
    this.trx.trxCode = "T0002";
    this.trx.amount = this.formTopup.controls.amount.value;
    this.trx.description = "Top Up wallet Using Visa";

    // alert(JSON.stringify(this.trx));
    this.topupProcess(this.trx);
  }

  ngOnChanges(): void {
    this.nominal = this.formTopup.controls.amount.value;
  }

  // topup 
  async topupProcess(trx: TrxEntity){
    let resp = await this.trxService.topup(trx).toPromise();
    this.emmiter.emit();
    alert(resp.message);
  }


  // get wallet account Number
  async getAccountNumber(){
    let resp = await this.walletService.getWallet().toPromise();
    if (resp.status != 20) {
      console.log(resp.status);
    } else {
      this.trx.acnCredit = resp.data.accountNumber;
      console.log(resp.data);
      
    }
  }


  // back
  back(){
    this.emmiter.emit();
  }

}

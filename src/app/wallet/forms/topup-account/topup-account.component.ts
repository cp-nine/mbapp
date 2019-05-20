import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidator } from 'src/app/security/custom-validator';
import TrxEntity from 'src/app/models/trx-model';
import { TrxService } from 'src/app/services/trx.service';
import { WalletService } from 'src/app/services/wallet.service';
import { Account } from 'src/app/models/account-model';

@Component({
  selector: 'app-topup-account',
  templateUrl: './topup-account.component.html',
  styleUrls: ['./topup-account.component.css']
})
export class TopupAccountComponent implements OnInit, OnChanges {
  
  @Output() emmiter = new EventEmitter();
  @Input() nominal: number = 0;

  trx: TrxEntity = new TrxEntity();
  accounts: Account[] = [];
  inputPin: boolean = false;

  @Input()
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
    this.getWalletAccountNumber();
  }

  ngOnChanges(): void {
    this.nominal = this.formTopup.controls.amount.value;
  }

  
  initForm(){
    this.formTopup = this.fb.group({
      accountNumber: ['', [Validators.required, CustomValidator.numberValidator]],
      amount: ['', [Validators.required, CustomValidator.numberValidator]],
      pin: ['', [
        Validators.required, 
        CustomValidator.numberValidator, 
        Validators.minLength(6),
        Validators.maxLength(6)]]
    });
  }


  
  public get f() {
    return this.formTopup.controls;
  }
  


  saveTrx(){
    this.inputPin = true;
    this.trx.trxCode = "T0003";
    this.trx.acnDebet = this.formTopup.controls.accountNumber.value;
    this.trx.amount = this.formTopup.controls.amount.value;
    this.trx.description = "Top Up Wallet from Account";
  }


  onSubmit(){ 
    this.trx.pin = this.formTopup.controls.pin.value;
    // alert(JSON.stringify(this.trx));
    this.topupProcess(this.trx);
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
    }
  }


  // get list wallet account Number
  async getWalletAccountNumber(){
    let resp = await this.walletService.getWalletAccount().toPromise();
    if (resp.status != 20) {
      console.log(resp.status);
    } else {
      this.accounts = [];
      resp.data.forEach(i => {
        if (i.account.acnType == 11) {
          this.accounts.push(i.account);
        }
      });
    }
  }

  // back
  back(){
    this.emmiter.emit();
  }

}

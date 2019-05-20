import { Component, OnInit, Output, EventEmitter, OnChanges, Input } from '@angular/core';
import TrxEntity from 'src/app/models/trx-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TrxService } from 'src/app/services/trx.service';
import { WalletService } from 'src/app/services/wallet.service';
import { CustomValidator } from 'src/app/security/custom-validator';
import { Account } from 'src/app/models/account-model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-transfer-account',
  templateUrl: './transfer-account.component.html',
  styleUrls: ['./transfer-account.component.css']
})
export class TransferAccountComponent implements OnInit, OnChanges {

  @Output() emmiter = new EventEmitter();
  @Input() nominal: number = 0;

  trx: TrxEntity = new TrxEntity();
  accounts: Account[] = [];
  account: Account = new Account();
  inputPin: boolean = false;
  inputDest: boolean = false;
  isChecked: boolean = false;
  destination: number;

  @Input()
  formTransfer: FormGroup;
  message: string = '';


  constructor(
    private trxService: TrxService,
    private fb: FormBuilder,
    private walletService: WalletService,
    private accountService: AccountService
  ) { }


  ngOnInit() {
    this.initForm();
    this.getWalletAccountNumber();
  }

  ngOnChanges(): void {
    this.nominal = this.formTransfer.controls.amount.value;
  }

  
  initForm(){
    this.formTransfer = this.fb.group({
      accountNumber: ['', [Validators.required, CustomValidator.numberValidator]],
      destinationNumber: ['', [Validators.required, CustomValidator.numberValidator]],
      description: [''],
      amount: ['', [Validators.required, CustomValidator.numberValidator]],
      pin: ['', [
        Validators.required, 
        CustomValidator.numberValidator, 
        Validators.minLength(6),
        Validators.maxLength(6)]]
    });
  }


  
  public get f() {
    return this.formTransfer.controls;
  }
  


  saveTrx(){
    this.inputDest = true;
    this.trx.trxCode = "T0004";
    this.trx.acnDebet = this.formTransfer.controls.accountNumber.value;
    this.trx.amount = this.formTransfer.controls.amount.value;
    this.trx.description = this.formTransfer.controls.description.value;
  }


  checkAccount(){   
    this.destination = this.formTransfer.controls.destinationNumber.value;
    this.accountService.getAccountById(this.destination).subscribe(
      resp => {
        if(resp.status != 20){
          this.isChecked = false;
          this.message = "Account Number Not Valid";
        } else {
          this.isChecked = true;
          this.message = '';
          this.account = resp.data;
        }
      }
    );
  }


  saveAccount(){
    this.inputPin = true;
    this.trx.acnCredit = this.formTransfer.controls.destinationNumber.value;
  }


  onSubmit(){ 
    this.trx.pin = this.formTransfer.controls.pin.value;
    // alert(JSON.stringify(this.trx));
    this.transferProcess(this.trx);
  }


  // transfer
  async transferProcess(trx: TrxEntity){
    let resp = await this.trxService.transfer(trx).toPromise();
    if (resp.status != 20) {
      alert(resp.message);
    } else {
      this.emmiter.emit();
      alert(resp.message); 
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

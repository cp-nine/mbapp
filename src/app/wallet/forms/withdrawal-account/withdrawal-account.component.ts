import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import TrxEntity from 'src/app/models/trx-model';
import { Account } from 'src/app/models/account-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TrxService } from 'src/app/services/trx.service';
import { WalletService } from 'src/app/services/wallet.service';
import { AccountService } from 'src/app/services/account.service';
import { CustomValidator } from 'src/app/security/custom-validator';

@Component({
  selector: 'app-withdrawal-account',
  templateUrl: './withdrawal-account.component.html',
  styleUrls: ['./withdrawal-account.component.css']
})
export class WithdrawalAccountComponent implements OnInit {

  @Output() emmiter = new EventEmitter();
  @Input() nominal: number = 0;

  trx: TrxEntity = new TrxEntity();
  accounts: Account[] = [];
  account: Account = new Account();
  inputPin: boolean = false;

  @Input()
  formWithdrawal: FormGroup;
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
    this.nominal = this.formWithdrawal.controls.amount.value;
  }

  
  initForm(){
    this.formWithdrawal = this.fb.group({
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
    return this.formWithdrawal.controls;
  }
  


  saveTrx(){
    this.inputPin = true;
    this.trx.trxCode = "T0008";
    this.trx.acnDebet = this.formWithdrawal.controls.accountNumber.value;
    this.trx.amount = this.formWithdrawal.controls.amount.value;
    this.trx.description = "Withdrawal Account";
  }

  onSubmit(){ 
    this.trx.pin = this.formWithdrawal.controls.pin.value;
    // alert(JSON.stringify(this.trx));
    this.withdrawalProcess(this.trx);
  }


  // transfer
  async withdrawalProcess(trx: TrxEntity){
    let resp = await this.trxService.withdrawal(trx).toPromise();
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

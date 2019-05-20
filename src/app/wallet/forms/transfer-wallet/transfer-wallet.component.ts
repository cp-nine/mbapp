import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import TrxEntity from 'src/app/models/trx-model';
import { Account } from 'src/app/models/account-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TrxService } from 'src/app/services/trx.service';
import { WalletService } from 'src/app/services/wallet.service';
import { AccountService } from 'src/app/services/account.service';
import { CustomValidator } from 'src/app/security/custom-validator';
import WalletAccount from 'src/app/models/wallet-account-model';

@Component({
  selector: 'app-transfer-wallet',
  templateUrl: './transfer-wallet.component.html',
  styleUrls: ['./transfer-wallet.component.css']
})
export class TransferWalletComponent implements OnInit {

  @Output() emmiter = new EventEmitter();
  @Input() nominal: number = 0;

  trx: TrxEntity = new TrxEntity();
  accounts: Account[] = [];
  account: Account = new Account();
  inputPin: boolean = false;
  inputDest: boolean = false;
  isChecked: boolean = false;
  destination: number;
  walletAccount: WalletAccount = new WalletAccount();

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
    this.getAccountNumber();
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
    this.trx.trxCode = "T0005";
    this.trx.amount = this.formTransfer.controls.amount.value;
    this.trx.description = this.formTransfer.controls.description.value;
  }


  checkAccount(event){   
    let cashtag = this.formTransfer.controls.destinationNumber.value;
    this.walletService.getWalletByCashtag(cashtag).subscribe(
      resp => {
        if(resp.status != 20){
          this.isChecked = false;
          this.message = "Cash Tag Not Valid";
        } else {
          this.isChecked = true;
          this.message = '';
          this.walletAccount = resp.data;
          this.destination = resp.data.accountNumber;
        }
      }
    );
  }


  saveAccount(){
    this.inputPin = true;
    this.trx.acnCredit = this.destination;
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


  // get wallet account Number
  async getAccountNumber(){
    let resp = await this.walletService.getWallet().toPromise();
    if (resp.status != 20) {
      console.log(resp.status);
    } else {
      this.trx.acnDebet = resp.data.accountNumber;
    }
  }

  // back
  back(){
    this.emmiter.emit();
  }

}

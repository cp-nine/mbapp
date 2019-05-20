import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Customer } from 'src/app/models/customer-model';
import { WalletService } from 'src/app/services/wallet.service';
import { CustomValidator } from 'src/app/security/custom-validator';
import Wallet  from 'src/app/models/wallet-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-wallet',
  templateUrl: './create-wallet.component.html',
  styleUrls: ['./create-wallet.component.css']
})
export class CreateWalletComponent implements OnInit {

  
  walletForm: FormGroup;
  submitted: boolean = false;

  customer: Customer;
  wallet: Wallet;

  message: string = '';
  isSuccess: boolean = false;

  @Output()
  modalEmitter = new EventEmitter();

  acn: number;

  constructor(
    private fb: FormBuilder,
    private walletService: WalletService,
    private router: Router
  ) { }

  ngOnInit() {
    // this.testAsycn();
    this.registerGroup();
  }

  registerGroup(){
    this.walletForm = this.fb.group({
      walletName: ['', Validators.required],
      cashTag: ['', Validators.required],
      accountNumber: ['', [Validators.required, CustomValidator.numberValidator]],
      fullName: ['', [Validators.required]]
    });
  }

  
  public get f(){
    return this.walletForm.controls;
  } 


  createWallet(){
    this.submitted = true;

    this.wallet = this.walletForm.value;

    console.log(this.wallet);    

    // check validation form
    if (this.walletForm.invalid) {
      return;
    }

    // console.log(this.walletForm.value);
    this.createProcess();
  }

  async createProcess(){
    let resp = await this.walletService.createWallet(this.wallet).toPromise();
    if (resp.status !== 20) {
      this.message = resp.message;
    } else {
      this.message = resp.message;
      setTimeout(() => {
        this.router.navigate(["/customer/list-wallet"]);
      }, 1000);
    }

  }

}

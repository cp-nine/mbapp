import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Account } from 'src/app/models/account-model';
import { AccountService } from 'src/app/services/account.service';
import { CustomValidator } from 'src/app/security/custom-validator';
import { mustMatch } from 'src/app/security/must-match';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  message: string = '';
  acnForm: FormGroup;
  submitted: boolean = false;
  account: Account = new Account();
  isCreated: boolean = true;
  option: boolean = false;
  insertBalance:boolean = false;

  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {    
    this.acnForm = this.fb.group({
      accountName: ['', [Validators.required]],
      pin: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), CustomValidator.numberValidator]],
      cpin: ['', [Validators.required]],
      balance: ['', [Validators.min(200000), CustomValidator.numberValidator]]
    },{
      validator: mustMatch("pin","cpin")
    });
  }


  public get f() {
    return this.acnForm.controls;
  }


  // create account
  addAccount(){
    let balance = this.acnForm.controls.balance.value;
    this.submitted = true;
    this.account.accountName = this.acnForm.controls.accountName.value;;
    this.account.balance = balance==="" ? 0 : balance;
    this.account.pin = this.acnForm.controls.pin.value;
    this.account.acnType = 11;
    this.account.customerNumber = localStorage.getItem("user");

    // check validation form
    if (this.acnForm.invalid) {

      return;

    }
    
    this.createAccount(this.account);
  
  }
  
  
  // create account process
  async createAccount(account: Account){    
    let resp = await this.accountService.createAccount(account).toPromise();
    if (resp.status !== 20) {
      this.message = resp.message;
    } else {
      this.message = "Create Account "+ resp.message;
      setTimeout(()=>{
        this.router.navigate(['/customer/list-account']);
      },1000);
    }
  }


  // insert option
  insertOption(){
    this.option = !this.option;
  }

   // insert option
   firstBalance(){
    this.insertBalance = !this.insertBalance;
  }
}

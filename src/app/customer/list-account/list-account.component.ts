import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/models/account-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidator } from 'src/app/security/custom-validator';
import { mustMatch } from 'src/app/security/must-match';

@Component({
  selector: 'app-list-account',
  templateUrl: './list-account.component.html',
  styleUrls: ['./list-account.component.css']
})
export class ListAccountComponent implements OnInit {

  private accounts: Account[]; 

  constructor(
    private accountService: AccountService,
  ) { }

  ngOnInit() {
    this.getAccounts();
  }

  // get accounts
  async getAccounts(){
    let resp = await this.accountService.getAccounts().toPromise();
    this.accounts = resp.data;
    console.log(resp);
    
  }


}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ComponentsModule } from '../components/components.module';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { ListAccountComponent } from './list-account/list-account.component';
import { TransactionReportComponent } from './transaction-report/transaction-report.component';
import { ListWalletComponent } from './list-wallet/list-wallet.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CreateAccountComponent } from './forms/create-account/create-account.component';
import { CreateWalletComponent } from './forms/create-wallet/create-wallet.component';

@NgModule({
  declarations: [DashboardComponent, CustomerProfileComponent, ListAccountComponent, TransactionReportComponent, ListWalletComponent, LoginComponent, RegisterComponent, CreateAccountComponent, CreateWalletComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ComponentsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CustomerModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { TransactionReportComponent } from './transaction-report/transaction-report.component';
import { ListAccountComponent } from './list-account/list-account.component';
import { ListWalletComponent } from './list-wallet/list-wallet.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CreateAccountComponent } from './forms/create-account/create-account.component';
import { CreateWalletComponent } from './forms/create-wallet/create-wallet.component';
import { CustomerGuardGuard } from '../guard/customer-guard.guard';
import { AuthGuardGuard } from '../guard/auth-guard.guard';

const routes: Routes = [
  {path:'', redirectTo:'/dashboard', pathMatch: 'full'},
  {path:'dashboard', component: DashboardComponent},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'profile', component: CustomerProfileComponent},
  {path:'list-account', component: ListAccountComponent},
  {path:'create-account', component: CreateAccountComponent},
  {path:'list-wallet', component: ListWalletComponent},
  {path:'create-wallet', component: CreateWalletComponent},
  {path:'transaction-report', component: TransactionReportComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }

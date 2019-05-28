import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { TransactionComponent } from './transaction/transaction.component';
import { WalletAccountComponent } from './wallet-account/wallet-account.component';
import { ActivityComponent } from './activity/activity.component';

const routes: Routes = [
  {path:'', redirectTo:'/profile', pathMatch: 'full'},
  {path:'profile', component: ProfileComponent},
  {path:'transaction', component: TransactionComponent},
  {path:'wallet-account', component: WalletAccountComponent},
  {path:'activity', component: ActivityComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalletRoutingModule { }

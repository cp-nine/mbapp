import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletRoutingModule } from './wallet-routing.module';
import { ComponentsModule } from '../components/components.module';
import { ProfileComponent } from './profile/profile.component';
import { WalletAccountComponent } from './wallet-account/wallet-account.component';
import { TransactionComponent } from './transaction/transaction.component';
import { ActivityComponent } from './activity/activity.component';
import { TopupExternalComponent } from './forms/topup-external/topup-external.component';
import { TopupAccountComponent } from './forms/topup-account/topup-account.component';
import { TransferAccountComponent } from './forms/transfer-account/transfer-account.component';
import { TransferWalletComponent } from './forms/transfer-wallet/transfer-wallet.component';
import { WithdrawalWalletComponent } from './forms/withdrawal-wallet/withdrawal-wallet.component';
import { WithdrawalAccountComponent } from './forms/withdrawal-account/withdrawal-account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MandatoryPipe } from '../pipes/mandatory.pipe';

@NgModule({
  declarations: [ProfileComponent, WalletAccountComponent, TransactionComponent, ActivityComponent, TopupExternalComponent, TopupAccountComponent, TransferAccountComponent, TransferWalletComponent, WithdrawalWalletComponent, WithdrawalAccountComponent, MandatoryPipe],
  imports: [
    CommonModule,
    WalletRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class WalletModule { }

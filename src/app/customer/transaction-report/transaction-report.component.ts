import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net-bs4';
import Vtrx from 'src/app/models/vtrx-model';
import { TrxService } from 'src/app/services/trx.service';

@Component({
  selector: 'app-transaction-report',
  templateUrl: './transaction-report.component.html',
  styleUrls: ['./transaction-report.component.css']
})
export class TransactionReportComponent implements OnInit {

  private transactions: Vtrx[];

  constructor(private trxService: TrxService) { }

  ngOnInit() {
    this.getTransactions();

    setTimeout(() => {
      $(function () {
        $('#tb-transaction').DataTable();
      });
    }, 2000);
  }

  async getTransactions(){
    let resp = await this.trxService.getTransactions().toPromise();
    this.transactions = resp.data;
    console.log(this.transactions);
    
  }

}

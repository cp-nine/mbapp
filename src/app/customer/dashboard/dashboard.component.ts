import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  
  constructor() { }

  ngOnInit() {
    this.myChart();
  }


  // chart
  myChart(){
    var ctx = document.getElementById('myChart');
    var data = {
      datasets: [{
        label:'ActiVity',
        data: [25, 13, 30],
        backgroundColor: [
          "rgb(48, 219, 162)",
          "rgb(49, 158, 247)",
          "rgb(229, 71, 71)"
        ],
      }],
      labels: [
        'Top Up',
        'Transfer',
        'Withdrawal'
      ]
    };
    var barChart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {
        responsive: true
      }
    });
  }



}

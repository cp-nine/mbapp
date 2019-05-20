import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  arrUrl = []; 
  currentUrl: string;

  breadcrumb : string = 'Home';
  
  constructor() { }

  ngOnInit() {
  }

  ngDoCheck(): void {
    this.arrUrl = location.href.split('/');
    this.currentUrl = this.arrUrl[4];

    switch (this.currentUrl) {
      case "dashboard":
        this.breadcrumb = "dashboard";
        break;
      case "profile":
        this.breadcrumb = "profile";
        break;
      case "list-account":
        this.breadcrumb = "list account";
        break;
      case "list-wallet":
        this.breadcrumb = "list wallet";
        break;
        case "transaction-report":
        this.breadcrumb = "transaction report";
        break;
    
      default:
        break;
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer-model';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {

  public customer: Customer = new Customer();

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.getProfile();
  }

  // get customer profile
  async getProfile(){
    let resp = await this.customerService.getCustomer().toPromise();
    this.customer = resp.data;
        
  }

}

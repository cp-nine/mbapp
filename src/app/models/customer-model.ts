import { Account } from './account-model';

export class Customer {

    customerNumber: string;
    cardIdentity: number;
    fname: string;
    lname: string;
    placeOb: string;
    brithDate: string;
    gender: string;
    address: string;
    moms: string;
    phoneNumber: string;
    email: string;
    username: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    flagDelete: number;
    accounts: Account[];

    constructor() {
        
    }
}
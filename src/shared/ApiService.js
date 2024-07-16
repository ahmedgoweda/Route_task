import axios from 'axios'
export class CustomersService {
    baseUrl = 'http://localhost:8000';

  getCustomers=()=>{
  return axios.get(`${this.baseUrl}/customers`)
  } 

  getTransactions=()=>{
    return axios.get(`${this.baseUrl}/transactions`)
    } 
}
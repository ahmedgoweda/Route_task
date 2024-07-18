import React, { useEffect, useState } from 'react';
import { CustomersService } from '../../shared/ApiService';
import { Input, InputLabel, Tabs, Tab, Box, FormControl, Select, MenuItem, FormLabel } from '@mui/material';
import CustomersTable from '../customers/Customers';
import TotalAmountsChart from '../TotalAmountGraph/TotalAmountGraph';

function Home() {
  const [customers, setCustomers] = useState([]);
  const [cachedCustomers, setCachedCustomers] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedCustomer, selectCustomer] = useState([]);


  const customersService = new CustomersService();

  const getCustomers = async () => {
    try {
      const { data } = await customersService.getCustomers();
      const transactionsData = (await customersService.getTransactions()).data;

      console.log(transactionsData);
      const customers = data.map(customer => ({
        ...customer,
        transactions: transactionsData.filter(transaction => {
          return +transaction.customer_id === +customer.id;
        })
      }));
      console.log(customers);

      setCustomers(customers);
      setCachedCustomers(customers);

    } catch (error) {
      console.error("Failed to fetch customers:", error);
    }
  };

  const searchCustomers = (event) => {
    const value = event.target.value;
    if (!value || value === '') {
      setCustomers(cachedCustomers);
      return;
    }
    const filteredData = customers.filter(custom => {
      console.log(custom, value);
      return custom.name.toLowerCase().includes(value.toLowerCase()) || custom.transactions.some(trans => trans.amount.toString().includes(value));
    });
    console.log(filteredData);
    setCustomers(filteredData);
  };

  useEffect(() => {
    getCustomers();
  }, []);

  const selectActiveTab = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (

      <div className='container w-50  mt-5  w-100'>
        <Box className='bg-light text-info rounded-2 mb-2 ' sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={selectActiveTab}>
            <Tab label="Customers Table" />
            <Tab label="Total Amounts Chart" />
          </Tabs>
        </Box>
        {activeTab === 0 && customers &&
           <div className='search-container bg-success rounded-5 p-5 form-control'>
          <InputLabel>
            Search:...
          </InputLabel>
          <Input onChange={searchCustomers} type="search" className='bg-light form-control rounded-3  w-50 mb-2' />
          <CustomersTable customers={customers} />
        </div>
        }
        {activeTab === 1 &&
        <>
         <FormControl fullWidth>
              <FormLabel id="customerLabel">Select Customer</FormLabel>
              <Select
                labelId="customerLabel"
                value={selectedCustomer}
                onChange={(event)=>{
                  selectCustomer(event.target.value)
                }
                }
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {customers.map(customer => (
                  <MenuItem key={customer.id} value={customer.transactions} >
                    {customer.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {
              (selectedCustomer&&selectedCustomer.length >0)&&
              <TotalAmountsChart transactions={selectedCustomer} />

            }
        </>

        }
      </div>
  );
}

export default Home;

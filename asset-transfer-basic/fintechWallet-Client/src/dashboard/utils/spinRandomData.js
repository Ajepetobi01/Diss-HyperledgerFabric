import { faker } from '@faker-js/faker';

export const createData = (name, calories, fat, carbs, protein) => {
    return {
      name,
      calories,
      fat,
      carbs,
      protein,
    };
  }

   
  
export const headCells = [

      {
        id: 'ID',
        numeric: false,
        disablePadding: true,
        label: 'ID',
      },
      {
        id: 'Username',
        numeric: false,
        disablePadding: false,
        label: 'Username',
      },

     {
        id: 'UserAccountIdentification',
        numeric: false,
        disablePadding: false,
        label: 'UserAccount',
      },
      {
        id: 'AccountWalletBalance',
        numeric: true,
        disablePadding: false,
        label: 'AcctWalletBal',
      },
      {
        id: 'AccountCurrency',
        numeric: true,
        disablePadding: false,
        label: 'AcctCurr',
      },
      {
        id: 'AccountLastTransaction',
        numeric: true,
        disablePadding: false,
        label: 'AcctLastTxn',
      },
      {
        id: 'AccountFirstName',
        numeric: false,
        disablePadding: false,
        label: 'Firstname',
      },

      {
        id: 'AccountLastName',
        numeric: false,
        disablePadding: false,
        label: 'Lastname',
      },

      {
        id: 'AccountTotalTransaction',
        numeric: true,
        disablePadding: false,
        label: 'AcctTotTxn',
      },
      {
        id: 'TotalTransaction',
        numeric: true,
        disablePadding: false,
        label: 'AcctTotTxn',
      },
      {
        id: 'AccountLocation',
        numeric: true,
        disablePadding: false,
        label: 'AcctLoc',
      },
  ];

const generateUuid = () => Math.random().toString(36).slice(-6);

//   generate Fakers
export const createFakeData = (num = 10) => {

   
    //const employeeReference =  'Em_' + generateUuid();
   // const accountReference =   'Acc_' + generateUuid();

    let arrRes = []
    for (let index = 0; index < num; index++) {

        const firstname = faker.name.firstName();
        const lastname = faker.name.lastName();

        arrRes.push({

                ID: "ID_" + generateUuid(),
                Username: "usr_" + generateUuid(),
                UserAccountIdentification: "accid_"+ generateUuid(),
                AccountWalletBalance: faker.datatype.number({min:20, max:2000}),
                AccountCurrency: 'GBP',
                AccountLastTransaction: faker.datatype.number({min:3, max:2000}),
                AccountTotalTransaction: faker.datatype.number({min:300, max:13000}),
                TotalTransaction: faker.datatype.number({min:5, max:300}),
                AccountFirstName: firstname,
                AccountLastName: lastname,
                AccountLocation: 'GB'

        })
    }
    return arrRes
}
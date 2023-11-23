'use strict';
// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2020-07-28T23:36:17.929Z",
    "2023-11-22T10:51:36.790Z",
  ],
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2020-07-28T23:36:17.929Z",
    "2020-08-01T10:51:36.790Z",
  ],
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

 

//let's first make the container of all movements row empty
containerMovements.innerHTML = '';
// a function that will display all movements rows in the browser

 function displayMovements (acc, sort = false){
  const movs = sort ? acc.movements.slice().sort((a,b)=> a - b) : acc.movements;
  
  movs.forEach(function (mov, i){
    const type = mov >0 ? 'deposit':'withdrawal';
    const date = new Date (acc.movementsDates[i]);
    const displayDate = formatMovementsDates(date)
    const html = ` <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
    <div class="movements__date">${displayDate}</div>
    <div class="movements__value">${mov.toFixed(2)}€ </div>
    </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

//let's compute the usernames
function createUserName (accounts){
  accounts.forEach(function(acc){
    
acc.userName = acc.owner.toLowerCase().split(' ').map( name => name[0])
.join('');
  })
}
//update Ui
function updateUi(acc) {
//display all the movements
displayMovements(acc);
//calculate and display the total balance
CalcDisplayBalance(acc);
// calc and display summaries 
CalcDisplaySummary (acc.movements);
};

//create a simplified username
createUserName(accounts);
//calc and display the balance
const CalcDisplayBalance = function (acc) {

acc.balance = acc.movements.reduce((acc, mov)=>  acc + mov, 0);
labelBalance.innerHTML = `${acc.balance.toFixed(2)}€`;

};
//calculate and display the summary of incomes and outs as well as the intrests
function CalcDisplaySummary (movements){
const incomes = movements.filter(mov => mov > 0).reduce( (acc , mov) => acc + mov , 0);
labelSumIn.textContent = `${incomes.toFixed(2)}€`;
const outs = movements.filter(mov => mov < 0).reduce( (acc , mov) => acc + mov , 0);
labelSumOut.textContent = `${Math.abs(outs).toFixed(2)}€`;
const interest = movements.filter( mov => mov > 0).map(deposit => deposit * currentAccount.interestRate/100).reduce((acc , mov)=> acc + mov , 0);
labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

//formatting the movement dates
function formatMovementsDates(date){
  const calcDaysPassed = (date1 , date2) => Math.abs(date1 - date2)/(1000*60*60*24);
  const daysPassed  = calcDaysPassed(new Date(), date);
  if( daysPassed === 0) return "Today";
  if( daysPassed === 1) return "Yesterday";
  if( daysPassed <= 7) return `${daysPassed} Days Ago`;
else{

  const month = `${date.getMonth() + 1}`.padStart(2, 0) ;
const year = date.getFullYear();
const mydate = `${date.getDate()}`.padStart(2 , 0);
return `${mydate}/ ${month}/ ${year}`;

}


}

let currentAccount;
//By clicking the logIn button

btnLogin.addEventListener('click', function (e){
e.preventDefault();
  
 currentAccount = accounts.find (function (acc){
return acc.userName === inputLoginUsername.value; 
});

if (currentAccount?.pin == inputLoginPin.value){
  const firstName = currentAccount.owner.split(' ')[0];
  labelWelcome.textContent = `Welcome back , ${firstName}!`;
  containerApp.style.opacity = 100;
  //clear input fields
  inputLoginUsername.value = inputLoginPin.value = ' ';
  inputLoginPin.blur();
updateUi (currentAccount);
const now = new Date ();
const month = `${now.getMonth() + 1}`.padStart(2, 0) ;
const year = now.getFullYear();
const date = `${now.getDate()}`.padStart(2 , 0);
const day  = now.getDay();
labelDate.textContent = `${date}/ ${month}/ ${year}`;

};

});


// by clicking the transfer button
btnTransfer.addEventListener('click', function(e){
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiveAcc = accounts.find( acc => acc.userName === inputTransferTo.value);
  inputTransferAmount.value = inputTransferTo.value = ' ';

if(amount > 0 && currentAccount?.balance >= amount &&  receiveAcc.userName !== currentAccount.userName){
  receiveAcc.movements.push(amount);
  currentAccount.movements.push(-amount);
  currentAccount.movementsDates.push(new Date());
    receiveAcc.movementsDates.push(new Date());
  updateUi(currentAccount); 
}
} );
//By clicking the request loan button
btnLoan.addEventListener('click', function(e){
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if(amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)){
    //push the new loan into the movements array
    currentAccount.movements.push(amount);
    //push the new loan dates into movementdates array
    currentAccount.movementsDates.push(new Date());
    
    //clear the input field
    inputLoanAmount.value = ' ';
    //update Ui
    updateUi(currentAccount);
  };
});
//By clicking the close account button
btnClose.addEventListener('click', function(e){
  e.preventDefault();
  if (currentAccount.userName === inputCloseUsername.value && currentAccount.pin == inputClosePin.value ){
const index = accounts.findIndex(acc => acc.userName === currentAccount.userName);
accounts.splice(index , 1);
// hide the Ui
containerApp.style.opacity = 0 ;

  };
  //clear the input fields
  inputCloseUsername.value = inputClosePin.value = ' ';
inputClosePin.blur();
});

// By clicking the sort button
let sorted = false;
btnSort.addEventListener('click',function(e){
  e.preventDefault();
  displayMovements(currentAccount ,!sorted);
  sorted = !sorted;
});









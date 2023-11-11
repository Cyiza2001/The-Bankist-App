'use strict';
// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
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

 function displayMovements (movements){
  movements.forEach(function (mov, i){
    const type = mov >0 ? 'deposit':'withdrawal';
    const html = ` <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
    <div class="movements__date">3 days ago</div>
    <div class="movements__value">${mov}€ </div>
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
displayMovements(acc.movements);
//calculate and display the total balance
CalcDisplayBalance(acc);
// calc and display summaries 
CalcDisplaySummary (acc.movements);};
//create a simplified username
createUserName(accounts);
//calc and display the balance
const CalcDisplayBalance = function (acc) {

acc.balance = acc.movements.reduce((acc, mov)=>  acc + mov, 0);
labelBalance.innerHTML = `${acc.balance}€`;

};
//calculate and display the summary of incomes and outs as well as the intrests
function CalcDisplaySummary (movements){
const incomes = movements.filter(mov => mov > 0).reduce( (acc , mov) => acc + mov , 0);
labelSumIn.textContent = `${incomes}€`;
const outs = movements.filter(mov => mov < 0).reduce( (acc , mov) => acc + mov , 0);
labelSumOut.textContent = `${Math.abs(outs)}€`;
const interest = movements.filter( mov => mov > 0).map(deposit => deposit * currentAccount.interestRate/100).reduce((acc , mov)=> acc + mov , 0);
labelSumInterest.textContent = `${interest}€`;
}
let currentAccount;

//By clicking the logIn button

btnLogin.addEventListener('click', function (e){
e.preventDefault();
  
 currentAccount = accounts.find (function (acc){
return acc.userName === inputLoginUsername.value; 
});

if (currentAccount.pin == inputLoginPin.value){
  const firstName = currentAccount.owner.split(' ')[0];
  labelWelcome.textContent = `Welcome back , ${firstName}!`;
  containerApp.style.opacity = 100;
  //clear input fields
  inputLoginUsername.value = inputLoginPin.value = ' ';
  inputLoginPin.blur();
updateUi (currentAccount);
};

});

// by clicking the transfer button
btnTransfer.addEventListener('click', function(e){
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiveAcc = accounts.find( acc => acc.userName === inputTransferTo.value);
  inputTransferAmount.value = inputTransferTo.value = ' ';

if(amount > 0 && currentAccount.balance >= amount &&  receiveAcc.userName !== currentAccount.userName){
  receiveAcc.movements.push(amount);
  currentAccount.movements.push(-amount);
  updateUi(currentAccount); 
}
} );

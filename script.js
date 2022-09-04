'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

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

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  //movement.slice() will create a copy of the array then sort will mutate this array
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? `deposit` : `withdrawal`;
    const html = `
      <div class="movements__row">
          <div class="movements__type
          movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__value">${mov}€</div>
      </div>
     `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((accum, mov) => accum + mov, 0);

  labelBalance.textContent = `${acc.balance} €`;
};
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((accum, mov) => accum + mov, 0); //accum stands for accumulator
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((accum, mov) => accum + mov, 0);

  labelSumOut.textContent = `${Math.abs(out)}€`;
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposits => (deposits * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((accum, int) => accum + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(function (name) {
        return name[0];
      }) //map(name => name[0])
      .join('');
  });
};

createUserNames(accounts);
const updateUI = function (acc) {
  //Display movements
  displayMovements(acc.movements);
  //Display balance
  calcDisplayBalance(acc);
  // Display summary
  calcDisplaySummary(acc);
};
//Event handler
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  //prevent form from submiting
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI and a welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0] // created an array of two items choosing the first
    }`;
    containerApp.style.opacity = 100;

    // clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    //Update UI
    updateUI(currentAccount);

    console.log('login');
  }
});
console.log(accounts);

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    recieverAcc &&
    currentAccount.balance >= amount &&
    recieverAcc?.username !== currentAccount.username
  ) {
    //doing the transfer
    currentAccount.movements.push(-amount);
    recieverAcc.movements.push(amount);

    //Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    //Add movement
    currentAccount.movements.push(amount);
    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    //Delete account
    accounts.splice(index, 1);
    //Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

//const currencies = new Map([
// ['USD', 'United States dollar'],
// ['EUR', 'Euro'],
// ['GBP', 'Pound sterling'],
//]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/*//slice
let arr = ['a', 'b', 'c', 'd', 'e'];

console.log(arr.slice(2));

console.log(arr.slice(2, 4));

console.log(arr.slice(1, -2));
const arr2 = arr.slice();
console.log(arr2);

console.log([...arr]);
//splice
//console.log(arr2.splice(2));

//console.log(arr2);
//arr2.splice(-1);
//sconsole.log(arr2);
arr2.splice(1, 3);
console.log(arr2);

//REVERSE METHOD
const arr3 = ['j', 'i', 'h', 'g', 'f'];

console.log(arr3.reverse());

console.log(arr3);

//CONCAT METHOD
const letters = arr.concat(arr3);
console.log(letters);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1} You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1} You withdrew ${Math.abs(movement)}`);
  }
}
//ARRAY
console.log('____forEach____');
movements.forEach(function (movement, i, arr) {
  if (movement > 0) {
    console.log(`Movement ${i + 1} You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1} You withdrew ${Math.abs(movement)}`);
  }
});

movements.forEach(function (movement, i, arr) {
  console.log(movement, i, arr);
});

//MAP
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value} `);
});

//SET
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);

currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}:${map}`);
});


const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrected = dogsJulia.slice();
  dogsJuliaCorrected.splice(0, 1);
  dogsJuliaCorrected.splice(-2);
  //const dogsJuliaCorreted = dogsJulia.slice(1,3);
  const dogs = dogsJuliaCorrected.concat(dogsKate);
  //Dog number 1 is an adult, and is 5 years old) or a puppy
  //("dog number 2 is still a puppy 🐶")
  dogs.forEach(function (dog, i) {
    if (dog >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
    } else {
      console.log(`Dog number${i + 1} is still a puppy 🐶`);
    }
  });
};

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);


const eurTousd = 1.1;
const movementsUSD = movements.map(function (mov) {
  return mov * eurTousd;
}); //or const movmentsUSD = movements.map(mov => mov * eurTousd)

console.log(movements);
console.log(movementsUSD);

const movementUSDFor = [];
for (const mov of movements) {
  movementUSDFor.push(mov * eurTousd);
}

console.log(movementUSDFor);

const movementDescriptions = movements.map(
  (mov, i) =>
  `Movement ${i + 1}: You ${mov > 0 ? `deposited` : `withdrew`}${Math.abs(
    mov
    )}`
    );
    
    console.log(movementDescriptions);
    const deposits = movements.filter(function (mov) {
      return mov > 0;
    });
    
console.log(movements);
console.log(deposits);

const depositsFor = [];
for (const mov of movements) {
  if (mov > 0) {
    depositsFor.push(mov);
  }
}

console.log(depositsFor);

const withdrawals = movements.filter(mov => mov < 0);
const withdrawals2 = movements.filter(function (mov) {
  return mov < 0;
});
console.log(withdrawals2);
console.log(withdrawals);

// accumulator snowball
//const balance = movements.reduce(function (accum, curEle, ind, arr) {
  //console.log(`iteration ${ind} accumlator is ${accum}`);
  //return accum + curEle;
  //}, 0);

  //console.log(balance);
  const balance = movements.reduce((accum, curEle) => accum + curEle, 0);
  
  console.log(balance);
  
  const numberdata = [3, 5, 7, 7, 89, 57676];
  
  const sumNumber = function (numd) {
    const added = numd.reduce(function (accum, currEle, ind, arr) {
      return accum + currEle;
    }, 0);
    return added;
  };
  console.log(sumNumber(numberdata));
  
  const max = movements.reduce(function (accum, curEle) {
  if (accum > curEle) {
    return accum;
  } else {
    return curEle;
  }
}, movements[0]);

console.log(max);

// task

const ages1 = [5, 2, 4, 1, 15, 8, 3];
const ages2 = [16, 6, 10, 5, 6, 1, 4];
const calcAverageHumanAge = function (ages) {
  const humanAges = ages.map(function (age) {
    return age <= 2 ? 2 * age : 16 + age * 4;
  });
  console.log(humanAges);
  const adultHuman = humanAges.filter(function (age) {
    return age >= 18;
  });
  console.log(adultHuman);
  const averageHumanAge = adultHuman.reduce(function (accum, age) {
    return accum + age / adultHuman.length;
  }, 0);
  return averageHumanAge;
};

console.log(calcAverageHumanAge(ages1));
console.log(calcAverageHumanAge(ages2));

///////////////////////////////////////
// The map Method
const eurToUsd = 1.1;

// const movementsUSD = movements.map(function (mov) {
  //   return mov * eurToUsd;
  // });
  
  const movementsUSD = movements.map(mov => mov * eurToUsd);
  
  console.log(movements);
  console.log(movementsUSD);
  
  const movementsUSDfor = [];
  for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
  console.log(movementsUSDfor);
  
  const movementsDescriptions = movements.map(
    (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
      )}`
      );
      console.log(movementsDescriptions);
      
      ///////////////////////////////////////
      // The filter Method
      const deposits = movements.filter(function (mov, i, arr) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);

const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);

///////////////////////////////////////
// The reduce Method
console.log(movements);

// accumulator -> SNOWBALL
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`Iteration ${i}: ${acc}`);
//   return acc + cur;
// }, 0);
const balance = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance);

let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

// Maximum value
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
console.log(max);
//includes
console.log(movements.includes(-49));

//some
const anyDeposits = movements.some(mov => mov > 5000);
console.log(movements);
console.log(anyDeposits);

//every
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

const deposits = mov => mov > 0;
console.log(movements.some(deposits));
console.log(movements.filter(deposits));

console.log(movements.every(deposits));
const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
const newArr9 = [123,4,5,6,7]
console.log(arrDeep.flat(2));

//movements.sort((a, b) => {
  //retuen < 0 a,b
  // return >0 b,a
  //if (a > b) {
  //  return 1;
 // }
  //if (a < b) {
  //  return -1
  }
});
movements.sort((a, b) => a - b);
console.log(movements);

*/

labelBalance.addEventListener('click', function () {
  // console.log(movementUI.map(el => el.textContent.replace('€', ''))); this  can be replaced since the from() method
  // uses a second argument which is like the map() method which is a call back function
  const movementUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementUI);

  // Another way of creating an array from a NodeList is using the spread operator
  const movementUI2 = [...document.querySelectorAll('.movements__value')];
  //but in this case we must use the map() method if we want to work on individual element in the array
  console.log(movementUI2.map(el => Number(el.textContent.replace('€', ''))));
});


// using flatMap
const bannkDepoitSum2 = accounts
  .flatMap(acc => acc.movements)
  .filter(movP => movP > 0)
  .reduce((accum, curr, _) => accum + curr, 0);

console.log(bannkDepoitSum2);
// using reduce instead of filter method to check for numbers >= 1000 in accounts
const numDeposits1000 = accounts
  .flatMap(acct => acct.movements)
  .reduce((count, curr) => (curr >= 1000 ? count + 1 : count), 0);




const sum = accounts
  .flatMap(acct => acct.movements)
  .reduce(
    (sums, cur) => {
      cur > 0 ? (sums.deposit += cur) : (sums.withdrawal += cur);
      return sums; // sums is the object with sum of deposit and withdrawal
    },
    { deposit: 0, withdrawal: 0 }
  );



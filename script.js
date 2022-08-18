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

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  //.textContent = '';
  movements.forEach(function (mov, i) {
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
displayMovements(account1.movements);

const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((accum, mov) => accum + mov, 0);
  labelBalance.textContent = `${balance} €`;
};
calcDisplayBalance(account1.movements);
const calcDisplaySummary = function (movements) {
  const incomes = movements
    .filter(mov => mov > 0)
    .reduce((accum, mov) => accum + mov, 0); //accum stands for accumulator
  labelSumIn.textContent = `${incomes}€`;

  const out = movements
    .filter(mov => mov < 0)
    .reduce((accum, mov) => accum + mov, 0);

  labelSumOut.textContent = `${Math.abs(out)}€`;
  const interest = movements
    .filter(mov => mov > 0)
    .map(deposits => (deposits * 1.2) / 100)
    .filter(int => int >= 1)
    .reduce((accum, int) => accum + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};
calcDisplaySummary(account1.movements);
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
//Event handler
btnLogin.addEventListener('click', function (e) {
  //prevent form from submiting
  e.preventDefault();
  console.log('login');
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
*/

const eurTousd = 1.1;
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
    // console.log(arr);
    return mov * eurTousd;
  })
  //.map(mov => mov * eurTousd)
  .reduce((accum, mov) => accum + mov, 0);
console.log(totalDepositsUSD);

const ranNum = Math.trunc(Math.random() * 6) + 1;
console.log(ranNum);

const calcAverageHumanAge = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((accum, age, i, arr) => accum + age / arr.length, 0);

const avrg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avrg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

console.log(avrg1, avrg2);

const firstWithdrawal = movements.find(mov => mov < 0);

console.log(firstWithdrawal);
console.log(movements);

console.log(accounts);

const acctsarah = accounts.find(acct => acct.owner === 'Sarah Smith');

console.log(acctsarah);

for (const acct of accounts) {
  if (acct.owner === 'Sarah Smith') {
    console.log(acct);
  }
}

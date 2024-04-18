"use strict";
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  history: [
    "2024-04-18T16:57:43.263Z",
    "2024-04-18T16:57:43.263Z",
    "2024-04-18T16:57:43.263Z",
    "2024-04-18T16:57:43.263Z",
    "2024-04-18T16:57:43.263Z",
    "2024-04-18T16:57:43.263Z",
    "2024-04-18T16:57:43.263Z",
    "2024-04-18T16:57:43.263Z",
  ],
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  history: [
    "2024-04-18T16:57:43.263Z",
    "2024-04-18T16:57:43.263Z",
    "2024-04-18T16:57:43.263Z",
    "2024-04-18T16:57:43.263Z",
    "2024-04-18T16:57:43.263Z",
    "2024-04-18T16:57:43.263Z",
    "2024-04-18T16:57:43.263Z",
    "2024-04-18T16:57:43.263Z",
  ],
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  history: [
    "2024-04-18T16:57:43.263Z",
    "2024-04-18T16:57:43.263Z",
    "2024-04-18T16:57:43.263Z",
    "2024-04-18T16:57:43.263Z",
    "2024-04-18T16:57:43.263Z",
    "2024-04-18T16:57:43.263Z",
    "2024-04-18T16:57:43.263Z",
    "2024-04-18T16:57:43.263Z",
  ],
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  history: [
    "2024-04-18T16:57:43.263Z",
    "2024-04-18T16:57:43.263Z",
    "2024-04-18T16:57:43.263Z",
    "2024-04-18T16:57:43.263Z",
    "2024-04-18T16:57:43.263Z",
  ],
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
// // // // // // // // // // // // // // // // // //
//making global current Account
let currentAcc = account1;
const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
//function compute usernames

function computeUserName(acc) {
  acc.userName = acc.owner
    .toLowerCase()
    .split(" ")
    .map((el) => el.split("")[0])
    .join("");
}
computeUserName(account1);

accounts.forEach((el) => {
  computeUserName(el);
});
/////////////////////////////////////////////////
//timer
/////////////////////////////////////////////////
function countDown() {
  const targetDate = new Date().getTime() + 5 * 60 * 1000;
  // Update the countdown every second
  const countdown = setInterval(function () {
    // Get the current date and time
    const currentDate = new Date().getTime();

    // Calculate the remaining time
    const remainingTime = targetDate - currentDate;

    // Calculate the minutes and seconds
    const minutes = Math.floor(remainingTime / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    // Display the countdown
    labelTimer.textContent = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;

    // Check if the countdown is finished
    if (remainingTime < 0) {
      clearInterval(countdown);
      containerApp.style.opacity = 0;
    }
  }, 1000); // Update every 1000 milliseconds (1 second)
}

//Today ajenda
//compute usernames----
//validate user data to check if its correct then logs in---
//visualize the transactions into the display

//function to display movements
function DisplayMovements(acc) {
  containerMovements.innerHTML = "";
  acc.movements.forEach((el, i) => {
    const html = `        <div class="movements__row">
    <div class="movements__type movements__type--${
      el > 0 ? "deposit" : "withdrawal"
    }">${i + 1} ${el > 0 ? "deposit" : "withdrawal"}</div>
    <div class="movements__date">${new Date(
      acc.history[i]
    ).toLocaleDateString()}</div>
    <div class="movements__value">${el}€</div>
  </div>`;
    containerMovements.insertAdjacentHTML("beforeend", html);
  });
}

//function logingIn
//function login and check username and password
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  currentAcc = checkUser(inputLoginUsername.value);
  if (
    currentAcc &&
    currentAcc.userName === inputLoginUsername.value &&
    currentAcc.pin === Number(inputLoginPin.value)
  ) {
    updateUi(currentAcc);
    DisplayMovements(currentAcc);
    containerApp.style.opacity = 1;
    labelWelcome.textContent = `Welcome  ${currentAcc.owner.split(" ")[0]}`;
    const date = new Date();
    const day = date.getHours();
    const month = date.getMonth();
    const year = date.getFullYear();
    labelDate.textContent = `${String(day).padStart(2, "0")}/${String(
      month + 1
    ).padStart(2, "0")}/${year}`;
    countDown();
  } else {
    console.log("account not found");
  }
});

function updateUi() {
  calculateBalance(currentAcc);
  calculateSummary(currentAcc);
  // calculate balance and display it
  //calculate summary
  //Display movements
}
function calculateBalance(acc) {
  acc.balance = acc.movements.reduce((acc, cum) => acc + cum);
  labelBalance.textContent = `${acc.balance}€`;
}
function calculateSummary(acc) {
  //calculating sumIn
  const sumIn = acc.movements
    .filter((val) => val > 0)
    .reduce((acc, cum) => acc + cum, 0);
  //calculating sumOut
  const sumOut = acc.movements
    .filter((val) => val < 0)
    .reduce((acc, cum) => acc + cum, 0);
  //calculating intrest
  //only positive numbers and apply intrest on it
  const intrest = acc.movements
    .filter((el) => el > 0)
    .map((el) => (acc.interestRate * el) / 100)
    .reduce((acc, cum) => acc + cum);
  labelSumInterest.textContent = `${Math.round(intrest, 0)}€`;
  labelSumIn.textContent = `${sumIn}€`;
  labelSumOut.textContent = `${Math.abs(sumOut)}€`;
}
//function transfer money to other account
//inputs :transferamount and account
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const transferAmount = Number(inputTransferAmount.value);

  const transferAcc = checkUser(inputTransferTo.value);
  //building logic if transfer account exists && transfer account not current account && current account have enough balance then send it
  if (
    transferAcc &&
    transferAcc !== currentAcc &&
    currentAcc.balance > transferAmount
  ) {
    transferAcc.movements.push(transferAmount);
    transferAcc.history.push(new Date().toISOString());
    currentAcc.movements.push(-1 * transferAmount);
    currentAcc.history.push(new Date().toISOString());

    updateUi(currentAcc);
    DisplayMovements(currentAcc);
  } else {
    console.log("transfer failed");
    //we have to show error message to there payment not successfull
  }
});

//function request loan
//things to do check if person have any transaction that is 20% of requested loan
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    currentAcc.movements.some((el) => el >= Number(inputLoanAmount.value) * 0.1)
  ) {
    currentAcc.movements.push(Number(inputLoanAmount.value));
    updateUi(currentAcc);
    DisplayMovements(currentAcc);
  } else {
    console.log("not approved");
  }
});

//close account
btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("account closed");
  //takes 2 parameters account holder name and pin if it matched then close it
  if (
    currentAcc.userName === inputCloseUsername.value &&
    currentAcc.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      (el) => el.userName === currentAcc.userName
    );
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  } else {
  }
});
function checkUser(val) {
  const user = accounts.find((el) => el.userName === val);
  return user;
}
//refactoring the existing code to apply dry method

// Making timer

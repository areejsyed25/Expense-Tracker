

let form = document.getElementById("form");
let expenseType =  document.getElementById("type");
let expenseAmount = document.getElementById("amount");
let expenseDate = document.getElementById("date");
let expenseList = document.getElementById("expense-list");
let income = document.getElementById("income-val");
let expenses = document.getElementById("expenses-val");
let refreshButton = document.getElementById("refresh-button");
let balance = document.getElementById("balance-value");

let incomeTotal = 0;
let expensesTotal = 0;
let balanceTotal = 0;

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];


transactions.forEach((tx) => {
  const newLi = document.createElement("li");
  newLi.textContent = `${tx.type} | ${tx.amount}$ | ${tx.date}`;
  expenseList.append(newLi);

  if (tx.amount > 0) {
    incomeTotal += tx.amount;
  } else {
    expensesTotal += tx.amount;
  }

  balanceTotal += tx.amount;
});

income.innerText = String(incomeTotal);
expenses.innerText = String(expensesTotal);
balance.innerText = String(balanceTotal)


let addListItem = (expenseList,newTransaction) =>{
    const newLi = document.createElement("li");
    newLi.textContent = newTransaction.type + " | " + newTransaction.amount+ "$ | " + newTransaction.date;
    if(Number(expenseAmount.value) > 0){
        newLi.style.color = "green";
    }else{
        newLi.style.color = "red";
    }
    expenseList.append(newLi);
}

let updateExpenses = (newTransaction) => {
    if (newTransaction.amount > 0){
        incomeTotal += newTransaction.amount;
        income.innerText = String(incomeTotal);
    }else{
        expensesTotal += newTransaction.amount;
        expenses.innerText = String(expensesTotal);
    }
}

let updateBalance = (newTransaction) => {
    balanceTotal += newTransaction.amount;
    balance.innerText = String(balanceTotal);
}

form.addEventListener("submit", function(event){
    event.preventDefault();


    let newTransaction = {
    type: expenseType.value,
    amount: Number(expenseAmount.value),
    date: expenseDate.value
    };

    if(isNaN(newTransaction.amount)){
        alert("Amount entered must be a valid value!")
        return;
    }
    updateExpenses(newTransaction);
    updateBalance(newTransaction);
    addListItem(expenseList,newTransaction);
    transactions.push(newTransaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));

    expenseType.value = '';
    expenseAmount.value = '';
    expenseDate.value = '';

});

refreshButton.addEventListener("click",function(){
    income.innerText = 0;
    expenses.innerText=0;
    balance.innerText=0;
    expenseList.innerHTML="";
    incomeTotal = 0;
    expensesTotal = 0;
    balanceTotal = 0;

    transactions = [];
    localStorage.clear();

})



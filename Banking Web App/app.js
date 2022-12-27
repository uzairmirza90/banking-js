// Access Dom Elements
const date = document.querySelector(".date");
const balance = document.querySelector(".current-balance");
const transaction = document.querySelector(".transactions");
const user = document.querySelector(".user");
const pin = document.querySelector(".pin");
const login = document.querySelector(".submit");
const loginForm = document.querySelector(".login");
const transferToUser = document.querySelector(".t-user-id");
const transferToAmount = document.querySelector(".t-amount");
const transferSubmit = document.querySelector(".t-submit");
let requestLoanAmount = document.querySelector(".r-amount");
const requestSubmit = document.querySelector(".r-submit");
const closeUserID = document.querySelector(".c-user-id");
const closeUserPin = document.querySelector(".c-user-pin");
const closeSubmit = document.querySelector(".c-submit");
const app = document.querySelector(".banking");
const beforeLogin = document.querySelector(".before-login");
const greeting = document.querySelector(".greeting");
let addBalance = 0;

// Accounts
const account1 = {
    owner: "uzair",
    transactions: [],
    interestRate: 1.2,
    pin: 1111,
};
  
const account2 = {
    owner: "abdullah",
    transactions: [],
    interestRate: 1.2,
    pin: 2222,
}

// Show Transactions
function showTransactions(values){
    values.forEach(function(value, i){
        const checkType = value > 0 ? "Deposit" : "Withdrawl";
        const html = `
            <div class="transactions-row" style="margin-bottom: 18px;">
                <div class="index-and-type">
                    <div class="index color-${checkType}">${i+1}.</div>
                    <div class="transaction-type transaction-type-${checkType}">${checkType}</div>
                </div>
                <div class="transaction-value color-${checkType}">$ ${value}</div>
            </div>   
            <hr style="opacity: 0.2"> 
        `;
        transaction.innerHTML += html;
    })
}

// Login Disabled
function loginDisabled(){
    loginForm.innerHTML = "";
    loginForm.innerHTML = `
        <h2 style="margin: 0;">Enjoy Banking!</h2>`;
}

// App hidden before login
function hideApp(){
    app.style.visibility = "visible";
    beforeLogin.style.display = "none";
    transaction.innerHTML = "";
}

// Login
let usernameUpperCase1 = `${account1.owner.charAt(0).toUpperCase() + account1.owner.slice(1, account1.owner.length)}`;
let usernameUpperCase2 = `${account2.owner.charAt(0).toUpperCase() + account2.owner.slice(1, account2.owner.length)}`;
let greetingUser1 = `Welcome, ${usernameUpperCase1}`;
let greetingUser2 = `Welcome, ${usernameUpperCase2}`;


// Request Loan
requestSubmit.addEventListener("click", function(){
    if(requestLoanAmount.value == ""){
        alert("Please Enter Loan Amount!");
    }else if(requestLoanAmount.value != "" && greeting.textContent == greetingUser1){
        account1.transactions.push(requestLoanAmount.value);
        addBalanceToCurrent();

        var newArray = localStorage.setItem("uzair", JSON.stringify(account1.transactions));
        console.log(newArray);
        var newValue = requestLoanAmount.value;
        var myArray = JSON.parse(localStorage.getItem("uzair"));
        myArray.push(newValue);
        localStorage.setItem("uzair", JSON.stringify(myArray));
        console.log(localStorage.getItem("uzair"));


    }else if(requestLoanAmount.value != "" && greeting.textContent == greetingUser2){
        account2.transactions.push(requestLoanAmount.value);
        addBalanceToCurrent();
        showTransactions(account2.transactions);
    }
})

function loggedin(){
    if(user.value == "" && pin.value == ""){
        alert("Please Enter User ID and PIN to Login!")
    }else if(user.value != "" && pin.value == ""){
        alert("Please Enter Your PIN");
    }else if(user.value == "" && pin.value != ""){
        alert("Please Enter Your User ID");
    }else if(!user.value == "" && !pin.value == ""){
        if(user.value == account1.owner && pin.value == account1.pin){
            hideApp();
            greeting.textContent = greetingUser1;
            loginDisabled();

            let data =  JSON.parse(localStorage.getItem("uzair"));
            showTransactions(data);
        }
        if(user.value == account2.owner && pin.value == account2.pin){
            hideApp();
            greeting.textContent = greetingUser2;
            loginDisabled();
        }
    }
};

app.style.visibility = "hidden";

login.addEventListener("click", function(){
    loggedin();
})

login.addEventListener("keydown", function(event){
    if(event.key === "Enter"){
            loggedin();
    };
})

// Sign Out
function signOut(){
    if(closeUserID.value == "" && closeUserPin.value == ""){
        alert("Please Enter User ID and PIN to Sign Out!")
    }else if(!closeUserID.value == "" && closeUserPin.value == ""){
        alert("Please Enter Your PIN to Sign Out!");
    }else if(closeUserID.value == "" && !closeUserPin.value == ""){
        alert("Please Enter Your User ID to Sign Out");
    }else if(!closeUserID.value == "" && !closeUserPin.value == ""){
        if(closeUserID.value == account1.owner && closeUserPin.value == account1.pin && 
            greeting.textContent == `Welcome, ${usernameUpperCase1}`){
            location.reload();
        }
        if(closeUserID.value != account1.owner && closeUserPin.value != account1.pin && 
            greeting.textContent != `Welcome, ${usernameUpperCase1}`){
            location.reload();
        }
    }
};

closeSubmit.addEventListener("click", function(){
    signOut();
})

closeSubmit.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        signOut();
    }
})

// Add Balance
function addBalanceToCurrent(){
    let requestValue = requestLoanAmount.value;
    addBalance += eval(requestValue);
    balance.innerHTML = `$ ${addBalance}`;
    requestLoanAmount.value = "";
}

// Transfer money 
transferSubmit.addEventListener("click", function(){
    if(transferToUser.value != "" && transferToAmount.value != ""){
        balance = balance - transferToAmount.value;
        balance.innerHTML = balance;
    }
})

// Date and Time
function formatAMPM() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var newDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + ", ";
    var strTime = newDate + hours + ":" + minutes + " " + ampm;
    return strTime;
}
date.innerHTML = formatAMPM();




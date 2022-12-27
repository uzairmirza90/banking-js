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

document.querySelector(".date").innerHTML = formatAMPM();

// Current balance

let currentBalance = "$ " + 0;
let currentNewBalance = (document.querySelector(".current-balance").innerHTML =
  currentBalance);

// Transactions

const account1 = {
  owner: "uzair",
  transactions: [200, 450, -400, 3000, -650, -130, 70, 1300, -1000],
  interestRate: 1.2, // %
  pin: 1111,
};

function showTransactions(values){
    values.forEach(function(value, i){
        const checkType = value > 0 ? "Deposit" : "Withdrawl";
        const html = `
            <div class="transactions-row" style="margin-bottom: 18px;">
                <div class="index-and-type">
                    <div class="index color-${checkType}">${i + 1}.</div>
                    <div class="transaction-type transaction-type-${checkType}">${checkType}</div>
                </div>
                <div class="transaction-value color-${checkType}">${value} $</div>
            </div>   
            <hr style="opacity: 0.2"> 
        `;
        document.querySelector(".transactions").insertAdjacentHTML("afterbegin", html);
    })
}

showTransactions(account1.transactions);

// User Login

// document.querySelector(".submit").addEventListener("click", function(){
//     if(document.querySelector(".user").value == "" && 
//         document.querySelector(".pin").value == ""){
//         alert("Please Enter User ID and PIN !");
//     }else if(document.querySelector(".user").value == ""){
//         alert("Please Enter User ID!")
//     }else if(document.querySelector(".pin").value == ""){
//         alert("Please Enter PIN !");
//     }else if(!document.querySelector(".user").value == "" && 
//         !document.querySelector(".pin").value == ""){
//         if(document.querySelector(".user").value == account1.owner && 
//             document.querySelector(".pin").value == account1.pin){
//                 document.querySelector(".banking").style.visibility = "visible";
//         }
//     }
// })


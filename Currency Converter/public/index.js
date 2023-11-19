//Alert Toast
function showToast(text) {
  Toastify({
    text: text,
    duration: 3000, // Duration in milliseconds
    gravity: "Top", // Position of the toast
    position: "left", // Placement of the toast
    backgroundColor: "linear-gradient(to right, #ff9900, #ff0000)", // Custom background color
    stopOnFocus: true, // Stop the toast when the window/tab is focused
  }).showToast();
}
//Main Function for Calculation
function convertCurrency() {
  //All Variables
  const API_KEY = "cee0c47fe39861566e1fcaa1";
  let result;
  let fromCurrency = document.getElementById("from").value.toUpperCase();
  let toCurrency = document.getElementById("to").value.toUpperCase();
  let amount = document.getElementById("amount").value;

  if (amount == "" || amount == null || amount == undefined) {
    showToast("Please enter a Number!!");
  } else if (amount < 0) {
    showToast("You can not input negative number");
  } else if (amount.length > 19) {
    showToast("You can not input more than 19 digits!!");
    document.getElementById("amount").value = "";
    document.getElementById("result").textContent = "";
    document.getElementById("result").style.border = "none";
    console.clear();
  } else {
    // send data to the server by REST API

    axios
      .post("/api/data", {
        fromCurrency,
        toCurrency,
        amount,
      })
      .then((res) => {
        // Handle the response
        result = res.data.result;

        //set data to the display
        let resultElement = document.getElementById("result");
        resultElement.textContent = `${amount} ${fromCurrency} = ${result.toFixed(
          2
        )} ${toCurrency}`;
        resultElement.style.border = "dotted";
        console.clear();
      })
      .catch((e) => {
        // Handle the error
        console.clear();
      });
  }
}

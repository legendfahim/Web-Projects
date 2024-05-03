//Dom element
let op = document.getElementById("operation");
let secret = document.getElementById("data");
let result = document.getElementById("result");

//Update title
function updateHeading(select) {
  var operationTitle = document.getElementById("operationTitle");
  operationTitle.innerText = select.value;
}

//Send data and Get response
async function handleSubmit() {
  if (secret.value === "") {
    alert("Please enter a secret key");
  } else {
    const url = "http://localhost:3000/api/secret";

    const data = {
      operation: op.value,
      data: secret.value,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      let responseData = await response.json();
      responseData = JSON.stringify(responseData).split('"').join("");
      result.innerText = responseData;
    } catch (error) {
      console.error("Error:", error);
    }
  }
}
result.addEventListener("click", () => {
  if (result.value !== "") {
    navigator.clipboard.writeText(result.value);
    alert("Copied!!");
  }
});

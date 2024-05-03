// Show all previous data
displayUserData();

//Target all necessary elements
let nameInput = document.getElementById("name");
let mailInput = document.getElementById("mail");
let title = document.getElementById("title");
let credit = document.getElementById("credit");

//If any field empty
function handleSubmit() {
  if (nameInput.value === "" || mailInput.value === "") {
    alert("Please fill in all fields.");
    return;
  }

  // Handle form submission and save data to localStorage
  saveUserData();
}

// show credit
title.addEventListener("mouseenter", () => {
  credit.classList.remove("hidden");
  credit.classList.add("block");
});

// hide credit
title.addEventListener("mouseleave", () => {
  credit.classList.remove("block");
  credit.classList.add("hidden");
});

// Function to handle form submission and save data to localStorage
function saveUserData() {
  // Get user input values
  var name = document.getElementById("name").value;
  var mail = document.getElementById("mail").value;

  // Create an object to store user data
  var userData = {
    name: name,
    mail: mail,
  };

  // Email validation regex pattern
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Check if the email is valid
  if (!emailPattern.test(mail)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Get existing data from localStorage
  var existingData = JSON.parse(localStorage.getItem("userData")) || [];

  // Check if the email already exists in the existing data
  var emailExists = existingData.some(function (user) {
    return user.mail === mail;
  });

  // If the email already exists, show an alert and return
  if (emailExists) {
    alert("Email already exists.");
    return;
  }

  // Check if the name meets the minimum character length requirement
  if (name.length < 5) {
    alert("Name must be at least 5 characters long.");
    return;
  }

  // Check if the name meets the maximum character length requirement
  if (name.length > 8) {
    alert("Name must be less than or equal to 8 characters long.");
    return;
  }

  // Add new user data to existing data
  existingData.push(userData);

  // Clear the input fields
  document.getElementById("name").value = "";
  document.getElementById("mail").value = "";

  // Save updated data back to localStorage
  localStorage.setItem("userData", JSON.stringify(existingData));

  // Display updated data
  displayUserData();
}

// Function to display data on the page
function displayUserData() {
  // Get data from localStorage
  var userData = JSON.parse(localStorage.getItem("userData")) || [];
  var container = document.getElementById("mails");

  // Clear previous data from the container
  container.innerHTML = "";

  userData.forEach(function (user) {
    // Create a element for each user
    var row = document.createElement("div");
    row.classList.add(
      "user-row",
      "flex",
      "justify-between",
      "items-center",
      "bg-red-200",
      "p-2",
      "mb-2",
      "rounded-md",
      "sm:justify-between",
      "flex-col",
      "sm:flex-row"
    );

    // Create elements to display user data
    var nameElement = document.createElement("span");
    nameElement.textContent = user.name;
    nameElement.classList.add("name", "font-bold", "cursor-context-menu");

    var mailElement = document.createElement("span");
    mailElement.textContent = user.mail;
    mailElement.classList.add("email", "cursor-context-menu");

    // Create a button to remove the data entry
    var removeButton = document.createElement("button");
    removeButton.textContent = "❌";
    removeButton.classList.add("remove-button");
    removeButton.onclick = function () {
      removeUserData(user.mail);
    };

    // Append name, email, and remove button elements to the row
    row.appendChild(nameElement);
    row.appendChild(mailElement);
    row.appendChild(removeButton);

    // Append the row to the container
    container.appendChild(row);

    // Attach event listener to the email element for copying
    mailElement.addEventListener("click", function () {
      let email = mailElement.textContent.trim();
      navigator.clipboard
        .writeText(email)
        .then(() => {
          alert("Email address copied to clipboard");
        })
        .catch((error) => {
          console.error("Failed to copy email address:", error);
        });
    });
  });
}

// Function to remove user data from storage
function removeUserData(mail) {
  // Get existing data from localStorage
  var existingData = JSON.parse(localStorage.getItem("userData")) || [];

  // Filter out the user data with the specified mail
  var filteredData = existingData.filter(function (user) {
    return user.mail !== mail;
  });

  localStorage.setItem("userData", JSON.stringify(filteredData));

  // Display updated data
  displayUserData();
}

// Add event listener to submit by Keyboard Key
nameInput.addEventListener("keydown", function (event) {
  // Check if Enter key is pressed
  if (event.key === "Enter") {
    handleSubmit();
  }
});
mailInput.addEventListener("keydown", function (event) {
  // Check if Enter key is pressed
  if (event.key === "Enter") {
    handleSubmit();
  }
});

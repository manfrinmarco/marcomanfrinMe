document.addEventListener("DOMContentLoaded", () => {
    document
      .querySelector(".form-button .btn")
      .addEventListener("click", async (event) => {
        event.preventDefault();  // Prevent the form from submitting immediately
  
        const fullName = document.querySelector("input[placeholder='Name']").value.trim();
        const email = document.querySelector("input[placeholder='Email']").value.trim();
        const message = document.querySelector("textarea").value.trim();
        const formSuccess = document.getElementById("formSuccess");
  
        // Reset error and success messages
        resetMessages();
  
        let formValid = true;
        const fullNameError = validateFullName(fullName);
        if (fullNameError) {
          displayError("fullNameError", fullNameError);
          formValid = false;
        }
        const emailError = validateEmail(email);
        if (emailError) {
          displayError("emailError", emailError);
          formValid = false;
        }
        const messageError = validateMessage(message);
        if (messageError) {
          displayError("messageError", messageError);
          formValid = false;
        }
        
        if (formValid) {
          try {
            const formData = { fullName, email, message };
            const response = await fetch("https://example.com/contactFormSubmit", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(formData),
            });
  
            if (response.ok) {
              // Clear form fields
              document.querySelector("input[placeholder='Name']").value = "";
              document.querySelector("input[placeholder='Email']").value = "";
              document.querySelector("textarea").value = "";
  
              // Display success message
              displaySuccess("Message Sent");
            } else {
              displayError("Error submitting the form. Please try again later.");
            }
          } catch (error) {
            displayError("Network error. Please try again later.");
          }
        } else {
          displayError("Some required fields are missing or invalid.");
        }
      });
  });
  
  // Helper functions for validation and display
  function validateFullName(fullName) {
    if (!fullName) return "Full name is required.";
    if (fullName.length < 3) return "Full name must be at least 3 characters.";
    return null;
  }
  
  function validateEmail(email) {
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,6}$/i;
    if (!email) return "Email is required.";
    if (email.length < 3) return "Email must be at least 3 characters.";
    if (!emailPattern.test(email)) return "Email is in an invalid format.";
    return null;
  }
  
  function validateMessage(message) {
    if (!message) return "Message is required.";
    if (message.length < 10) return "Message must be at least 10 characters.";
    return null;
  }
  
  function resetMessages() {
    // Hide and reset error messages
    document.querySelectorAll(".error-message").forEach((el) => {
      el.textContent = "";
      el.style.display = "none";
    });
  
    // Hide success message
    document.getElementById("formSuccess").textContent = "";
    document.getElementById("formSuccess").style.display = "none";
  }
  
  function displayError(fieldId, message) {
    const errorElement = document.getElementById(fieldId);
    errorElement.textContent = message;
    errorElement.style.display = "block";
  }
  
  function displaySuccess(message) {
    const formSuccess = document.getElementById("formSuccess");
    formSuccess.textContent = message;
    formSuccess.style.color = "green";
    formSuccess.style.display = "block";
  }
  
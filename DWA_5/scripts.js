// scripts.js

const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const entries = new FormData(event.target);
  const { dividend, divider } = Object.fromEntries(entries);


  //Validation when values are missing
  
  if ((dividend == "") | (divider == "")) {
    result.innerText =
      "Division not performed. Both values are required in inputs. Try again";
  }
  else if (dividend < 0 || divider <= 0) {
        const error = new Error('Division not performed. Invalid number provided. Try again');
        console.log(error);
        result.innerText = error;
      }
  else if (isNaN(dividend) || isNAN(divider)) {
        // Create a custom error
        const criticalError = new Error("Something critical went wrong. Please reload the page");
        
        // Replace the HTML body with a warning message
        document.body.innerHTML = "<h1>Error</h1><p>An error occurred. Please try again later.</p>";
        
        // Console log the error message and stack trace
        console.log(error.message);
        console.log(error.stack);
  //Dividing numbers result in a decimal number
    }else {
    result.innerText = Math.floor(dividend / divider);
}});

//I am Vincent
function createUser() {  
    var username = document.getElementById('username').value;  
    var password = document.getElementById('password').value;  
  
    // Simple client verification  
    if (username === '' || password === '') {  
        alert('Please fill in both username and password.');  
        return;  
    }  
  
    // Assuming successful verification, store username and password  
    localStorage.setItem('username', username);  
    localStorage.setItem('password', password);  
    // Set expiration time (only storing timestamps here, additional logic is needed to check for expiration)  
    localStorage.setItem('expiration', new Date().getTime() + 2 * 24 * 60 * 60 * 1000); // Expires in 2 days  
  
    // Prompt the user for successful registration and redirect to the login page (if necessary)  
    alert('Registration successful!');  
    window.location.href = 'login.html'; // Assuming you have a login.HTML as the login page  
}
function login() {  
    var loginUsername = document.getElementById('loginUsername').value;  
    var loginPassword = document.getElementById('loginPassword').value;  
  
    // Attempt to obtain username and password from localStorage 
    var storedUsername = localStorage.getItem('username');  
    var storedPassword = localStorage.getItem('password');  
    var expiration = localStorage.getItem('expiration');  
  
    // Check if the username and password have been set and have not expired 
    if (expiration && new Date().getTime() < parseInt(expiration)) {  
        // If the user has not entered a username and password, and the username and password are remembered and have not expired, attempt automatic login  
        if (loginUsername === '' && loginPassword === '') {  
            if (storedUsername && storedPassword) {  
                // This is just a simulation of the client, and there will be server verification in real applications  
                alert('Auto login successful!');  
                // Jump to shopping page  
                window.location.href = 'shopping.html';  
                return;  
            }  
        }  
    }  
  
    // The username or password is empty, expired, or manually entered by the user  
    if (loginUsername !== '' && loginPassword !== '') {  
        // The username and password have been entered, perform login verification  
        if (loginUsername === storedUsername && loginPassword === storedPassword) {  
            alert('Login successful!');  
            // Jump to shopping page  
            window.location.href = 'shopping.html';  
        } else {  
            alert('Incorrect username or password!');  
        }  
    } else {  
        alert('Please fill in both username and password.');  
    }  
}

var cart = {}; // Shopping Cart Object  
  
  // script.js  
document.addEventListener('DOMContentLoaded', function() {  
    // Get all product and cart summary elements  
    const products = document.querySelectorAll('.product');  
    const productTotalsElement = document.getElementById('product-totals');  
    const totalPriceElement = document.getElementById('total-price');  
  
    // Changes in the number of listeners input box  
    products.forEach(function(product) {  
        const quantityInput = product.querySelector('.quantity');  
        quantityInput.addEventListener('input', function() {  
            calculateTotals();  
        });  
    });  
  
    // Listen for the click event of the remove button  
    document.querySelectorAll('.remove').forEach(function(removeButton) {  
        removeButton.addEventListener('click', function() {  
            // Get the product index to be deleted  
            const productIndex = parseInt(removeButton.dataset.productIndex, 10);  
  
            // Check if the index is valid and reset the product quantity to 0  
            if (productIndex >= 0 && productIndex < products.length) {  
                products[productIndex].querySelector('.quantity').value = 0;  
                // Recalculate the total price  
                calculateTotals();  
            }  
        });  
    });  
  
    // Calculate total price  
    function calculateTotals() {  
        let totalPrice = 0;  
        let productTotalsHTML = '';  
  
        products.forEach(function(product) {  
            const quantity = parseInt(product.querySelector('.quantity').value, 10) || 0;  
            const price = parseFloat(product.dataset.price);  
  
            const subtotal = quantity * price;  
            totalPrice += subtotal;  
  
            productTotalsHTML += `<p>Course${product.textContent.match(/Course(\d+)/)[1]} total price is: $${subtotal.toFixed(2)}</p>`;  
        });  
  
        productTotalsElement.innerHTML = productTotalsHTML;  
        totalPriceElement.textContent = totalPrice.toFixed(2);  
    }  
  
     // The click event of the purchase button  
     function purchase() {  
        alert('Purchase successful!');  
        // Here, you can add purchasing logic, such as sending Ajax requests to the server, etc  
        // ...  
    }  
  
    // Clear the click event of the shopping cart button  
    function clearCart() {  
        products.forEach(function(product) {  
            product.querySelector('.quantity').value = 0; // Set quantity to 0  
        });  
        calculateTotals(); // Recalculate the total price 
    }  
  
    // Assuming the IDs of the purchase and delete buttons are 'purchase button' and 'clear part button', respectively  
    const purchaseButton = document.getElementById('purchase-button');  
    if (purchaseButton) {  
        purchaseButton.addEventListener('click', purchase);  
    }  
  
    const clearCartButton = document.getElementById('clear-cart-button');  
    if (clearCartButton) {  
        clearCartButton.addEventListener('click', clearCart);  
    }  
  
    // Calculate the total price initially  
    calculateTotals();  
});
document.getElementById('contactForm').addEventListener('submit', function(event) {  
    event.preventDefault(); // Block the default submission behavior of forms  
    
    // Clear previous success messages (if any)  
    document.getElementById('successMessage').style.display = 'none';  
    
    // AJAX requests or other backend processing logic can be added here to send data  
    // For demonstration purposes, we will only display a success message  
    
    // Display success message  
    document.getElementById('successMessage').style.display = 'block';  
    
    // Clear form fields (optional)  
    this.reset();  
  });
  
  function validateForm() {  
    // Assuming all fields have been filled in, this is just an example. In practice, you should add validation logic  
    // For example, check if the input box is empty, if the email format is correct, etc 
    
    // Display Modal Box  
    document.getElementById("myModal").style.display = "block";  
    
    // Prevent the default submission behavior of forms, as we only display modal boxes and do not actually submit data
    return false;  
  }  
    
  // Get the close button for the modal box and add a click event to hide the modal box  
  var span = document.getElementsByClassName("close")[0];  
  span.onclick = function() {  
    document.getElementById("myModal").style.display = "none";  
  }  
    
  // When the user clicks on an area outside the modal box, the modal box is also closed  
  window.onclick = function(event) {  
    if (event.target == document.getElementById("myModal")) {  
      document.getElementById("myModal").style.display = "none";  
    }  
  }

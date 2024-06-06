//I am Vincent
// 假设我们有一个名为setCookie和getCookie的函数来处理Cookie  
function setCookie(name, value, days) {  
    var expires = "";  
    if (days) {  
        var date = new Date();  
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));  
        expires = "; expires=" + date.toUTCString();  
    }  
    document.cookie = name + "=" + (value || "") + expires + "; path=/";  
}  
  
function getCookie(name) {  
    var nameEQ = name + "=";  
    var ca = document.cookie.split(';');  
    for (var i = 0; i < ca.length; i++) {  
        var c = ca[i];  
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);  
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);  
    }  
    return null;  
}  
// Define an empty array to store user information  
var users = [];  
  
// Page initialization function, assuming there are corresponding page elements  
function init() {  
    // Hide all pages  
    var pages = document.querySelectorAll('.page');  
    for (var i = 0; i < pages.length; i++) {  
        pages[i].style.display = 'none';  
    }  
      
    // Display Create User Page 
    showPage('createUserPage');  
}  
  
/**  
 * Display the page with the specified ID and hide all other pages  
 *  
 * @param {string} pageId - The ID of the page to be displayed  
 */  
function showPage(pageId) {  
    // Hide all pages  
    var pages = document.querySelectorAll('.page');  
    for (var i = 0; i < pages.length; i++) {  
        pages[i].style.display = 'none';  
    }  
    // Display the page with the specified ID  
    document.getElementById(pageId).style.display = 'block';  
}  
  
/**  
 * Create a new user and add it to the user array, then jump to the login page  
 */  
function createUser() {  
    // Get the values of the username and password input boxes  
    var username = document.getElementById("username").value;  
    var password = document.getElementById("password").value;  
    // Add new user information to the user array  
    users.push({ username: username, password: password });  
    setCookie('username', username, 7); // 7 days  
    setCookie('password', password, 7); // 7 days (not recommended for real use)
    // Display a prompt for successfully creating a user  
    alert('User ' + username + ' created!');  
    // Jump to login page  
    showPage('loginPage');  
}  
// 登录函数  
function checkLogin() {  
    // 获取输入框中的用户名和密码  
    var username = document.getElementById("loginUsername").value;  
    var password = document.getElementById("loginPassword").value;  
  
    // 从cookie中获取存储的用户名和密码（这里假设有相应的getCookie函数）  
    var storedUsername = getCookie('username');  
    var storedPassword = getCookie('password');  
  
    // 比较输入的用户名和密码与cookie中的是否匹配  
    if (username === storedUsername && password === storedPassword) {  
        // 如果匹配，跳转到购物车页面  
        showPage('shoppingPage');  
    } else {  
        // 如果不匹配，显示错误消息  
        alert('用户名或密码错误，请尝试重新输入或跳转到注册页面进行创建。');  
        // 这里可以添加跳转到注册页面的代码，例如：showPage('registerPage');  
    }  
}  
/**  
 * Verify login information. If correct, redirect to the shopping page. Otherwise, return to the user creation page  
 */  
function login() {  
    var loginUsername = document.getElementById("loginUsername").value;  
    var loginPassword = document.getElementById("loginPassword").value; // 假设密码框的ID是loginPassword  
      
    // Try to autofill from cookie  
    var cookieUsername = getCookie('username');  
    var cookiePassword = getCookie('password');  
    if (cookieUsername && cookiePassword) {  
        document.getElementById("loginUsername").value = cookieUsername;  
        document.getElementById("loginPassword").value = cookiePassword;  
    }  
      
    // TODO: Add your actual login verification code here  
    // For demonstration purposes, let's assume any entered username/password is valid  
    if (loginUsername && loginPassword) { // 假设这里进行了验证  
        // Set cookie again to extend expiration  
        setCookie('username', loginUsername, 7);  
        setCookie('password', loginPassword, 7);  
          
        // Redirect to shopping page  
        showPage('shoppingPage');  
    } else {  
        // If no matching user is found, return to the Create User page  
        showPage('createUserPage');  
        // Display error messages (if needed)  
        alert("Invalid username or password. Please try again.");  
    }  
}  
  
// Assuming that the init function is executed after the page loading is completed  
window.onload = init;  
  
/**  
 * Calculate the total price of items in the shopping cart and display it on the page  
 */  
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
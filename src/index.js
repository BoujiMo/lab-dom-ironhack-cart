// ITERATION 1

function updateSubtotal(product) {
  
  // Get DOM elements that hold price and quantity
  //... your code goes here
  const priceElement = product.querySelector('.price span');
  const quantityElement = product.querySelector('.quantity input');

  // Extract values from DOM elements
  const price = priceElement.innerText;
  const quantity = quantityElement.value;

  // Get DOM element that holds the subtotal value for the product
  // Calculate subtotal value
  const subtotalElement = product.querySelector('.subtotal span');
  const subtotal = price * quantity;

  // Set the product subtotal to the corresponding DOM element
  subtotalElement.innerText = subtotal;

  // Return subtotal value so it can be used later
  return subtotal;
}

function calculateAll() {
  // code in the following two lines is added just for testing purposes in iteration 1.
  // it runs when only iteration 1 is completed. at later point, it can be removed.
  //const singleProduct = document.querySelector('.product');
  //updateSubtotal(singleProduct);
  // end of test

  // ITERATION 2
  // Get the DOM nodes for each product row
  //... your code goes here
  const multipleProducts = document.querySelectorAll('.product'); // returns a Node List of product rows
  
   // Declare an auxiliary variable that will hold the sum of each product subtotal
  let total = 0;

  // Iterate through the product nodes,
  // call updateSubtot() on it and add the product subtotals to the total value
  for (let product of multipleProducts) { // updates the subtotal element on each product row <tr>
    total += updateSubtotal(product);
  }

  // ITERATION 3
  // Get DOM element that holds the cart total value 
  //... your code goes here
  const totalPriceElement = document.querySelector('#total-value span');
  // Display the total value of products in cart in the appropriate node
  totalPriceElement.innerText = total;
}

// ITERATION 4

function removeProduct(event) {
  const target = event.currentTarget;
  console.log('The target in remove is:', target);

  //... your code goes here
  const productElement = target.parentElement.parentElement;
  const tableBodyElement = productElement.parentElement;
  tableBodyElement.removeChild(productElement);

  calculateAll(); // calculates the new cart total, after product removal
}

// ITERATION 4 - Create a binding function that will allow us to easily bind the eventListener to any "Remove" button

function bindDeleteButton(deleteButton) {
  deleteButton.addEventListener("click", removeProduct); 
}

// ITERATION 5

function createProduct() {
  //... your code goes here
  const tableBodyElement = document.querySelector('#cart tbody');
  const createProductNameElement = document.querySelector(
    '.create-product input[type="text"]'
  );
  const createProductPriceElement = document.querySelector(
    '.create-product input[type="number"]'
  );
  const name = createProductNameElement.value;
  const price = createProductPriceElement.valueAsNumber;
  const productElement = document.createElement('tr'); // Create new tr element
  productElement.classList.add('product'); // same as => productElement.setAttribute('class', 'product') = "product"; 
   
  // use innerHTML to create child elements inside <tr>
  productElement.innerHTML = `
    <td class="name">
      <span>${name}</span>
    </td>
    <td class="price">$<span>${price.toFixed(2)}</span></td>
    <td class="quantity">
      <input type="number" value="0" min="0" placeholder="Quantity" />
    </td>
    <td class="subtotal">$<span>0</span></td>
    <td class="action">
      <button class="btn btn-remove">Remove</button>
    </td>
  `;

   // make sure remove button inherits the same behavior as other remove buttons
  const productRemoveButtonElement = productElement.querySelector('button');
  productRemoveButtonElement.addEventListener('click', removeProduct);
  
  // append the newly created row to the parent
  tableBodyElement.appendChild(productElement);
  
   // clean the fields
  createProductNameElement.value = '';
  createProductPriceElement.valueAsNumber = 0;
}

// this code is ran once, on page load
window.addEventListener('load', () => {
  const calculatePricesBtn = document.getElementById('calculate');
  calculatePricesBtn.addEventListener('click', calculateAll); //or: [...removeButtons].forEach(button => button.addEventListener('click', removeProduct));

  //... your code goes here
  const removeButtonElements = document.querySelectorAll('.btn-remove'); // returns an HTML collection, needs to be spread into an array to iterate on it

  for (const removeButtonElement of removeButtonElements)
    removeButtonElement.addEventListener('click', removeProduct);

  const createProductElement = document.getElementById('create');
  if (createProductElement)
    createProductElement.addEventListener('click', createProduct);
});

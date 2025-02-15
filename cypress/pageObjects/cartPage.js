class CartPage {
//Elements

  // Cart link element
  get cartLink() {
    return cy.get('#cartur');
  }

  // "Place Order" button element
  get placeOrderButton() {
    return cy.get('button[data-target="#orderModal"]');
  }

  // Order modal element
  get orderModal() {
    return cy.get('#orderModal');
  }

  // "Purchase" button element
  get purchaseButton() {
    return cy.get('button[onclick="purchaseOrder()"]');
  }

  //Methods

  // Helper function to extract numeric price from string
  // Removes non-numeric characters and returns a float
  cleanPrice(priceString) {
    const numericValue = priceString.replace(/[^0-9.]/g, '').trim();
    return parseFloat(numericValue);
  }

  // Navigate to cart and validate product name and price
  validateCartContent(productName, expectedPrice) {
    // Navigate to the cart
    this.cartLink.click();

    // Find the row containing the product name and validate its details
    cy.contains(productName).parents('tr')
      .then((row) => {
        // Validate product name in the second <td> cell
        cy.wrap(row).find('td').eq(1)
          .should('contain.text', productName);

        // Validate price in the third <td> cell
        cy.wrap(row).find('td').eq(2)
          .invoke('text')
          .then((text) => {
            const actualPrice = this.cleanPrice(text);  // Extract actual price
            const cleanedExpectedPrice = this.cleanPrice(expectedPrice);  // Clean expected price

            // Assert price equality
            expect(actualPrice).to.equal(cleanedExpectedPrice);
          });
      });
  }

  // Open order modal, fill out the form, and complete the checkout process
  placeOrderAndCheckout() {
    // Open the order modal
    this.placeOrderButton.click();
    this.orderModal.should('be.visible');  // Ensure the modal is visible

    // Load fixture data for the order form and fill in the details
    cy.fixture('cart-data').then((data) => {
      const { name, country, city, creditCard, month, year } = data.selectProductIphone6;  // Extract order data

      // Fill out the order form with extracted data
      cy.get('#name').type(name);
      cy.get('#country').type(country);
      cy.get('#city').type(city);
      cy.get('#card').type(creditCard);
      cy.get('#month').type(month);
      cy.get('#year').type(year);

      // Submit the order
      this.purchaseButton.click();
      cy.get('h2').should('contain', 'Thank you for your purchase!');  // Confirm successful purchase
    });
  }

  // Helper function to extract numeric price from string
  // Removes non-numeric characters and returns a float
  extractPrice(priceString) {
    const numericValue = priceString.replace(/[^0-9.]/g, '').trim();
    return parseFloat(numericValue);
  }

  // Save order details in an object for later use
  saveOrderDetails(name, country, city, creditCard, month, year) {
    return {
      name, country, city, creditCard, month, year  // Return order details as an object
    };
  }

  // Fill out the order form with provided details and submit the form
  placeOrderFormAndSubmit(orderDetails) {
    // Input each field from the order details
    cy.get('#name').type(orderDetails.name);
    cy.get('#country').type(orderDetails.country);
    cy.get('#city').type(orderDetails.city);
    cy.get('#card').type(orderDetails.creditCard);
    cy.get('#month').type(orderDetails.month);
    cy.get('#year').type(orderDetails.year);

    // Submit the order form
    cy.get('button[type="submit"]').click();
  }
}

export default new CartPage();

class HomePage {
  // Elements

  // Navigate to the homepage by opening the specified URL
  visit() {
    cy.visit('https://www.demoblaze.com/');
  }

  // Navigation bar elements

  // Log in hyperlink (opens the login modal)
  get loginLink() {
    return cy.get('#login2');
  }

  // Username display link (shows the logged-in user's name)
  get usernameLink() {
    return cy.get('#nameofuser');
  }

  // Cart hyperlink (navigates to the cart page)
  get cartLink() {
    return cy.get('#cartur');
  }  

  // Log in modal elements

  // Username input field inside the login modal
  get usernameInput() {
    return cy.get('#loginusername');
  }

  // Password input field inside the login modal
  get passwordInput() {
    return cy.get('#loginpassword');
  }

  // Log in button inside the login modal
  get loginButton() {
    return cy.get('button[type="button"]').contains('Log in');
  }

  // Close button inside the login modal
  get closeButton() {
    return cy.get('[data-dismiss="modal"]');
  }

  // Methods

  // Log in with provided username and password
  login(username, password) {
    // Ensure username input is visible and enabled, then type the username
    this.usernameInput.should('be.visible').and('be.enabled').click();
    this.usernameInput.type(username, { delay: 100 });

    // Ensure password input is visible and enabled, then type the password
    this.passwordInput.should('be.visible').and('be.enabled').click();
    this.passwordInput.type(password, { delay: 100 });

    // Click the log in button to submit credentials
    this.loginButton.should('be.visible').and('be.enabled').click();
  }
  
  // Close the login modal window
  closeModal() {
    this.closeButton.should('be.visible').click();
  }

  // Select a product by clicking its name
  getProductLink(productName) {
    return cy.get('h4.card-title a.hrefch').contains(productName).click();
  }

  // Validate that the correct product page is displayed
  validateProductPage(productName, expectedPrice) {
    // Verify that the product name appears in the product title section
    cy.get('h2').should('contain', productName);

    // Ensure the "Add to Cart" button is present on the page
    cy.get('a').contains('Add to cart').should('be.visible');

    // Validate that the displayed product price matches the expected price
    cy.get('.price-container')
      .should('have.text', expectedPrice);
  }

  // Navigate to the cart and validate that the correct product is present
  validateCartContent(productName, expectedPrice) {
    this.cartLink.click();
    this.validateCartItem(productName, expectedPrice);
  }
}

// Export an instance of HomePage
export default new HomePage();

class ProductPage {
//Elements

  // "Add to Cart" button element
  get addToCartButton() {
    return cy.get('a.btn.btn-success.btn-lg').contains('Add to cart');
  }

  //Methods
  
  // Method to add a product to the cart, validate the alert message, and dismiss it
  addProductToCart() {
    // Click the "Add to Cart" button to add the product
    this.addToCartButton.click();

    // Validate the browser alert message confirming product addition
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('Product added.');  // Assert expected alert text

      // Dismiss the alert by returning 'true' (equivalent to clicking 'OK')
      return true;
    });
  }
}

export default new ProductPage();

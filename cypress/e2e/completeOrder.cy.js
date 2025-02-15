import homePage from '../pageObjects/homePage';
import productPage from '../pageObjects/productPage';
import cartPage from '../pageObjects/cartPage';

describe('Complete Order Checkout Test', () => {

  // Navigate to the homepage before each test execution
  beforeEach(() => {
    homePage.visit();
  });

  it('should complete an order and proceed with checkout', () => {
    // Load test data from fixture file
    cy.fixture('cart-data').then((data) => {
      const { username, password, product, expectedprice } = data.selectProductIphone6;  // Extract test data

      // Open the login modal
      homePage.loginLink.click();

      // Perform login with provided credentials
      homePage.login(username, password);

      // Verify that the user is logged in by checking the displayed username
      homePage.usernameLink.should('contain', username);

      // Select the specified product from the homepage
      homePage.getProductLink(product).click;

      // Validate that the correct product page is displayed
      homePage.validateProductPage(product, expectedprice);

      // Add the selected product to the cart
      productPage.addProductToCart();

      // Validate that the product appears correctly in the cart
      cartPage.validateCartContent(product, expectedprice);

      // Proceed with placing the order and completing the checkout process
      cartPage.placeOrderAndCheckout();
    });
  });
});

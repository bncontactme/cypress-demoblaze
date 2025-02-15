import homePage from '../pageObjects/homePage';
import productPage from '../pageObjects/productPage';  
import cartPage from '../pageObjects/cartPage'; 

describe('Cart Test', () => {

  // Run before each test to navigate to the homepage
  beforeEach(() => {
    homePage.visit(); 
  });

  it('should be able to add a product to the cart', () => {
    // Load test data from fixture file
    cy.fixture('cart-data').then((data) => {
      const { username, password, product, expectedprice } = data.selectProductIphone6;  // Extract required test data

      // Open the login modal
      homePage.loginLink.click();

      // Log in using valid credentials
      homePage.login(username, password);

      // Verify successful login by checking the displayed username
      homePage.usernameLink.should('contain', username);

      // Select a product from the homepage
      homePage.getProductLink(product).click;

      // Validate that the product page displays correct details
      homePage.validateProductPage(product, expectedprice);

      // Add the selected product to the cart
      productPage.addProductToCart();

      // Validate that the product is correctly added to the cart
      cartPage.validateCartContent(product, expectedprice);
    });
  });
});

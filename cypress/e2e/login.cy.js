import homePage from '../pageObjects/homePage';

describe('Authorization Tests', () => {

  // Navigate to the homepage before each test execution
  beforeEach(() => {
    homePage.visit();
  });

  it('should log in successfully with valid credentials (admin/admin)', () => {
    // Load test data for valid credentials
    cy.fixture('login-data').then((data) => {
      const { username, password } = data.validCredentials;  // Extract valid login credentials

      // Open the login modal
      homePage.loginLink.click();

      // Perform login using valid credentials
      homePage.login(username, password);

      // Verify that login was successful by checking the displayed username
      homePage.usernameLink.should('contain', username);
    });
  });

  it('should fail to log in with invalid credentials', () => {
    // Load test data for invalid credentials
    cy.fixture('login-data').then((data) => {
      const { username, password } = data.invalidCredentials;  // Extract invalid login credentials
  
      // Listen for the browser alert and validate the error message
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Wrong password.');  // Verify the alert message on login failure
      });
  
      // Open the login modal
      homePage.loginLink.click();
  
      // Attempt to log in with invalid credentials
      homePage.login(username, password);
    });
  });
});

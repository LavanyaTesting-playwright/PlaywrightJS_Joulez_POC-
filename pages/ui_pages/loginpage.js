const { executeStep } = require("../../utils/utils");
require("dotenv").config();

class LoginPage {
  constructor(test, page) {
    this.test = test;
    this.page = page;
    this.login = page.locator("//div[text()='Log in']");
    this.emailInput = page.locator("//input[@id='email']");
    this.passwordInput = page.locator("//input[@id='password']");
    this.loginButton = page.locator("(//button[text()='Log in'])[1]");
    this.successMsg = page.locator("//div[text()='Signed in Successfully']");
    this.kebabMenu = page.locator("//img[@alt='toggleAccountIcon']");
    this.logoutButton = page.locator("//span[contains(text(),'Sign Out')]");
  }

  async launchUrl(url) {
    await this.page.goto(url);
  }

  async loginFunctionality(email, password) {
    await executeStep(this.test, this.login, "click", "click login");
    await executeStep(
      this.test,
      this.emailInput,
      "fill",
      "Enter the username",
      email
    );
    await executeStep(
      this.test,
      this.passwordInput,
      "fill",
      "Enter the password",
      password
    );
    await executeStep(
      this.test,
      this.loginButton,
      "click",
      "Click on the login button"
    );
  }

  async logoutFunctionality() {
    await executeStep(
      this.test,
      this.kebabMenu,
      "hover",
      "Enter the open menu button"
    );

    await executeStep(
      this.test,
      this.logoutButton,
      "click",
      "Click on logout button"
    );
  }
}

module.exports = LoginPage;

const { test, expect } = require("@playwright/test");
require("dotenv").config();
const LoginPage = require("../pages/ui_pages/loginpage");
const VehicleBooking = require("../pages/ui_pages/vehicleBookingPage");

let loginPage, vehicleBooking;
test.beforeEach("Launch URL", async ({ page }) => {
  loginPage = new LoginPage(test, page);
  vehicleBooking = new VehicleBooking(test, page);
  await loginPage.launchUrl(process.env.baseUrl);
  await page.waitForTimeout(parseInt(process.env.small_timeout));
  await expect(page).toHaveTitle(
    "Joulez - Electric Vehicle Car Rental Company Based in New York City and Los Angeles."
  );
});

test.only("Testing the login and logout functionality", async ({ page }) => {
  await loginPage.loginFunctionality(process.env.email, process.env.password);
  await page.waitForTimeout(parseInt(process.env.small_timeout));
  await expect(loginPage.successMsg).toBeVisible();
  await loginPage.logoutFunctionality();
});

test("Book a vehicle successfully and verify confirm message", async ({
  page,
}) => {
  await loginPage.loginFunctionality(process.env.email, process.env.password);
  await page.waitForTimeout(parseInt(process.env.small_timeout));
  await expect(loginPage.successMsg).toBeVisible();
  await page.waitForTimeout(parseInt(process.env.small_timeout));
  await vehicleBooking.selectLocation();
  await expect(vehicleBooking.firstVehicle).toBeVisible();
  await vehicleBooking.selectVehicle();
  await vehicleBooking.bookVehicle();
  await expect(vehicleBooking.bookingMessage).toHaveText(
    "Thank You for Choosing Joulez !"
  );
  await loginPage.logoutFunctionality();
});
test("Verify booking fails with invalid login credentials", async ({
  page,
}) => {
  await vehicleBooking.selectLocation();
  await expect(vehicleBooking.firstVehicle).toBeVisible();
  await vehicleBooking.selectVehicle();
  await page.waitForTimeout(parseInt(process.env.small_timeout));

  try {
    await loginPage.loginFunctionality(
      process.env.email,
      process.env.invalid_password
    );
    throw new Error("Incorrect password, please try again ");
  } catch (error) {
    await page.waitForTimeout(1000);
    expect(vehicleBooking.invalidPasswordMsg).toHaveText(
      "Incorrect password, please try again "
    );
  }
});

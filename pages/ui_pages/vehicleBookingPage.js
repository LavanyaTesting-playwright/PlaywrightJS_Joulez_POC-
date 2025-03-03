const { executeStep } = require("../../utils/utils");
require("dotenv").config();

class VehicleBooking {
  constructor(test, page) {
    this.test = test;
    this.page = page;
    this.locationField = page.locator("//input[@placeholder='Location']");
    this.pickupLocation = page.locator("//div[@class='garageList']/ul[1]");
    this.searchBtn = page.locator("//img[@class='searchIcon']");
    (this.firstVehicle = page.locator(
      "//div[@class=' card col-3 col-sm-12 col-md-3 col-lg-3 p-3 fontAntarctica fontSize13 cursorPointer bg3B3936 text-white'][1]"
    )),
      (this.payNow = page.locator("//div[text()='Pay Now']")),
      (this.iUnderstand = page.locator("//button[text()='I Understand']")),
      (this.yes = page.locator("//button[text()='Yes']")),
      (this.cardSelection = page.locator("(//input[@type='radio'])[1]")),
      (this.confirmPayment = page.locator(
        "//button[text()='Confirm Payment']"
      )),
      (this.bookingMessage = page.locator(
        "//div[text()='Thank You for Choosing Joulez !']"
      ));
    this.invalidPasswordMsg = page.locator(
      "//div[text()='Incorrect password, please try again '] "
    );
  }

  async selectLocation() {
    await executeStep(
      this.test,
      this.locationField,
      "click",
      "Click location input field to select location"
    );
    await executeStep(
      this.test,
      this.pickupLocation,
      "click",
      "select first location"
    );
    await executeStep(
      this.test,
      this.searchBtn,
      "click",
      "Click on search button"
    );
  }

  async selectVehicle() {
    await executeStep(
      this.test,
      this.firstVehicle,
      "click",
      "Click first vehicle from available vehicles"
    );
  }
  async bookVehicle() {
    await executeStep(this.test, this.payNow, "click", "click pay now");
    await executeStep(this.test, this.iUnderstand, "click", "approve");
    await executeStep(this.test, this.yes, "click", "Click yes");
    await executeStep(this.test, this.cardSelection, "click", "Select card");
    await executeStep(this.test, this.confirmPayment, "click", "confirm");
  }
}
module.exports = VehicleBooking;

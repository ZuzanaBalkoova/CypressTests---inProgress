
const destination = "Oslo"
const currency = "kr"
describe("Testing on page kiwi.com", () => {
  it("Changes currency and search a flight and shows prices in chosen currency", () => {
    cy.log("Visit kiwi.com")
    cy.visit("https://www.kiwi.com/en/")

    cy.log("Accept cookies")
    cy.get("[data-test=CookiesPopup-Accept]").click()
    cy.log("Checking if popup is not on the page anymore")
    cy.get("[data-test=CookiesPopup]").should("not.exist")

    cy.log("Changing currency")
    cy.get("[data-test=TopNav-RegionalSettingsButton]").click()

    cy.log("Find data-test with currency select")
    cy.get("[data-test=CurrencySelect").should("be.visible").select("nok")

    cy.log("Click save and continue")
    cy.get("[data-test=SubmitRegionalSettingsButton]").click()

    cy.log("Check if the button has changed its name on the front page")
    cy.contains("[data-test=TopNav-RegionalSettingsButton]", "NOK").should("be.visible")
    
    cy.log("Find flight to Oslo")
    cy.get("[data-test=PlacePickerInput-destination]").type(destination)

    cy.log("Clicking on the destination Oslo")
    cy.get("[data-test=PlacePickerRow-wrapper]", {timeout: 10000}).contains("Oslo").click()

    cy.log("Veryfying, there is only one destination picked")
    cy.get("[data-test=SearchFieldItem-destination] [data-test=PlacePickerInputPlace]").should("have.length", 1).and("be.visible")
    
    cy.log("Unchecking checkbox to not open booking")
    cy.get("[data-test=bookingCheckbox").as("checkbox").click()
    cy.get("@checkbox").should("not.be.checked")

    cy.log("Search for flights")
    cy.contains("[data-test=LandingSearchButton]", "Search").click()

    cy.log("Check, if currency is norwegian krone, but first wait for page to load")
    cy.get("[data-test='ResultCardPrice']", { timeout: 10000 }).each(
      (price) => {
        cy.wrap(price).should("be.visible").and("contain", "kr")
      })
  })
})
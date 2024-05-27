describe("Accepting cookies and checking if they are really accepted", () => {

  it("Cookie consent", () => {
    cy.visit("https://www.kiwi.com/en/")

    cy.log("Accepting cookies")
    cy.get("[data-test=CookiesPopup-Accept").click()

    cy.log("Veryfying, that popup is NOT showing anymore")
    cy.get("[data-test=CookiesPopup").should("not.exist")

    cy.log("Cookies should be accepted in Application")
    cy.getCookie("__kwc_agreed").should("have.property", "value", "true")
  })

  it("Changing currency and checking if it really changed in cookies.", () => {
   
    cy.log("Accept cookies popup")
    cy.setCookie("__kwc_agreed", "true")
    
    cy.visit("https://www.kiwi.com/en/")
    
    cy.log("Clicking on Navbar, changing currency to New Zealand dollar - NZD")
    cy.get("[data-test=TopNav-RegionalSettingsButton]").click()
    cy.get("[data-test=CurrencySelect]").select("nzd")

    cy.log("Save and continue")
    cy.get("[data-test= SubmitRegionalSettingsButton]").click()

    cy.log("Check if regionalsettingsmodal is closed")
    cy.log("[data-test= RegionalSettingsmodal]").should("not.exist")

    cy.log("Check in cookies if currency changed to nzd.")
    cy.getCookie("preferred_currency").should("have.property","value", "nzd")
  })

})
/**
 * this is the testing file for Cypress, DO NOT TOUCH
 */
describe("Lab 5 components", () => {
  describe("Testing the API portion of the Website", () => {
    /**
     * need to test how the student's website handles API information
     * - stubbing any request to http://localhost with students.json
     *
     * tests
     * - if there is no error, then there should be 6 <tr>s in the table
     * - existing functionality should still work too
     *   - adding a <tr> should still work (there will be 7)
     */

    it("the table should render the data from the API", () => {
      // stubbing the response
      cy.intercept("GET", "*/api/students/*", {
        fixture: "students.json",
      }).as("payload");

      // loading the page
      cy.visit("../../index.html");

      // awaiting HTTP request
      cy.wait("@payload");

      const expectedData = ["Ryan Gosling", '100000000', '4.3'];

      /// HTML page requested data, processing it

      // examing the table to test for records
      cy.get("table > tbody > tr")
        .should("have.length", 6)
        .first()
        .find("td")
        .should("have.length", expectedData.length)
        .each(($td, index) => {
        const actualValue = $td.text().trim();
        const expectedValue = expectedData[index];
        cy.wrap(actualValue).should("be.eq", expectedValue);
        });
    });

    
  });

  describe("Testing Website Functionality ", () => {
 

    beforeEach(() => {
      // stubbing the response before each test
      cy.intercept("GET", "*/api/students/*", {
        fixture: "students.json",
      }).as("payload");
  
      // loading the page before each test
      cy.visit("../../index.html");
  
      // awaiting HTTP request before each test
      cy.wait("@payload");
    });

    context("Testing the page's JS", () => {
      const mapping = [
        "input[name='name'], input[placeholder='name']",
        "input[name='id'], input[placeholder='id']",
        "input[name='gpa'], input[placeholder='gpa']"
      ];
      const data = ["fort nite", "100000000", "4.3"];

      it("Should append to table if all input fields are Non-Empty", () => {
        // setting the values
        for (const index in [0, 1, 2]) {
          cy.get(mapping[index]).type(data[index]);
        }

       
        // clicking the button
        cy.get("button").filter((index, button) => Cypress.$(button).text().toLowerCase() === "submit").click();
       

        // wait for a specific element to ensure the page has been updated
        cy.get("table > tbody > tr").should("have.length", 7);

        cy.get("table > tbody > tr")
        .last() // Select the last row
        .find("td")
        .should("have.length", 3)
        .each(($td, index) => {
          const actualValue = $td.text().trim(); // Get the text content of the current td
          
          cy.wrap(actualValue).should("be.eq", data[index]);
        });
      });

      context("Should not append to table if any input field is empty", () => {
        mapping.forEach((el, index) => {
            it(`should do nothing if ${el} is empty`, () => {
                // skipping the current index
                cy.get(el).clear(); // clear the current input field
                for (let i = 0; i < mapping.length; i++) {
                    // skipping the current index
                    if (i === index) continue;
                    // typing into the inputs
                    cy.get(mapping[i]).type(data[i]);
                }
                

                const expectedData = ["Helena Bonham Carter", '100000005', '2'];

                // the button shouldn't do anything
                // finds the table with header
                // it checks for the tr in both the thead and tbody and counts for both
                // since we expect table headers, the count should be 1(from thead)
                cy.get("button").filter((index, button) => Cypress.$(button).text().toLowerCase() === "submit").click()
                
                cy.get("table > tbody > tr")
                .last() 
                .find("td")
                .should("have.length", expectedData.length)
                .each(($td, index) => {
                const actualValue = $td.text().trim();
                const expectedValue = expectedData[index];

                console.log(`Actual Value for index ${index}: ${actualValue}`);
                cy.wrap(actualValue).should("be.eq", expectedValue);
                });
    
                // clearing inputs
                for (const el of mapping) {
                    cy.get(el).clear();
                }
            });
        });
    });

    


  });
 });
});


/**
 * this is the testing file for Cypress, DO NOT TOUCH
 */

import rgbHex from "rgb-hex";
describe("Lab 4 Tests", ()=> {
  describe("Testing HTML page", () => {
    /**
     * need tests for:
     * CSS
     * - the <th>s should have classes and should be tested for their background-color
     * - the div should:
     *   - display: flex;
     *   - flex-direction: row;
     * HTML
     * - there should be a table
     *  - it should have three columns
     * - there should be three inputs & one button in a div
     *  - these should have ids
     * JS
     * - the button#submit should:
     *  - append a new tr to the tbody of the table with the data inputted
     *  - it should do NOTHING if one of the fields is empty
     */

    beforeEach("Reading the HTML file", () => {
      // connecting to the file
      cy.visit("./index.html");
  
      // awaiting for load, sometimes it's finicky
      cy.wait(100);
  
      // setting a fetch error handler
      cy.on("uncaught:exception", (e) => {
        if (e.message.includes("NetworkError")) {
          // page made call to API but failed, ignoring
          return false;
        }
        if (e.message.includes("fetch")) {
          // page made call to API but failed, ignoring
          return false;
        }
      });
    });

    context("Testing the HTML", () => {
      it("Testing the table headers, should be in order (name, id , gpa)", () => {
        // they should have headers
        cy.get("table > thead > tr > th").should("have.length", 3);

        // they should be in a certain order
        const ordering = ["name", "id", "gpa"];

        cy.get("table > thead > tr > th").then((ths) => {
          for (const index in [0, 1, 2]) {
            expect(ths[index].innerText.toLowerCase()).to.eq(ordering[index]);
          }
        });
      });

      context("Testing for presence of 3 input fields and 1 button", () => {
          const elementsToCheck = ["input", "input", "input", "button"];
      
          elementsToCheck.forEach((element) => {
              it(`${element} within div.row should exist`, () => {
                  cy.get(`div.row ${element}`).should("exist");
              });
          });
      

        it("table should exist", () => {
          cy.get("table").should("exist");
        });
      });

      context("Testing placeholders of input fields", () => {
        const inputSelectors = ["input[placeholder='name']", "input[placeholder='id']", "input[placeholder='gpa']"];
    
        inputSelectors.forEach((selector, index) => {
            it(`${selector} should have the placeholder in the order of name, id, gpa`, () => {
                const expectedPlaceholders = ["name", "id", "gpa"];
                const expectedPlaceholder = expectedPlaceholders[index].toLowerCase();
    
                cy.get(`div.row ${selector}`)
                    .should('have.attr', 'placeholder')
                    .and('include', expectedPlaceholder);
            });
        });
    });
  });

  context("Testing the page's CSS", () => {
    // testing the name column (Green)
    it("name column should be have green background", () => {
      cy.get("table > thead > tr > th").eq(0)
      .should("have.text", "name")
      .should("have.css", "background-color")
      .and((bgcolor) => {
        expect(rgbHex(bgcolor)).to.eq("00ff00");
      });
    });
    
    // testing the id column (red)
    it("id column should be have red background", () => {
    cy.get("table > thead > tr > th").eq(1)
    .should("have.text", "id")
    .should("have.css", "background-color")
    .and((bgcolor) => {
      expect(rgbHex(bgcolor)).to.eq("ff0000");
    });
  });

    // testing the gpa column (blue)
    it("gpa column should be have blue background", () => {
    cy.get("table > thead > tr > th").eq(2)
    .should("have.text", "gpa")
    .should("have.css", "background-color")
    .and((bgcolor) => {
      expect(rgbHex(bgcolor)).to.eq("0000ff");
    });
  });


  });


    context("Testing the page's JS", () => {
      const mapping = [
        "input[name='name'], input[placeholder='name']",
        "input[name='id'], input[placeholder='id']",
        "input[name='gpa'], input[placeholder='gpa']"
      ];
      const data = ["fort nite", "100000000", "4.3"];

      it("Should append to table if all input fields are non-empty", () => {
        // setting the values
        for (const index in [0, 1, 2]) {
          cy.get(mapping[index]).type(data[index]);
        }

        // clicking the button
        cy.get("button").filter((index, button) => Cypress.$(button).text().toLowerCase() === "submit").click();

        // inspecting the table
        cy.get("table > tbody > tr")
          .should("have.length.gte", 1) // TRs: default & inputted
          .find("td")
          .should("have.length.gte", 3)
          // the TDs should have data in specific indices
          .then(($tds) => {
            for (const index in [0, 1, 2])
              cy.wrap($tds[index].innerText).should("be.eq", data[index]);
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
    
                // the button shouldn't do anything
                // finds the table with header
                // it checks for the tr in both the thead and tbody and counts for both
                // since we expect table headers, the count should be 1(from thead)
                cy.get("button").filter((index, button) => Cypress.$(button).text().toLowerCase() === "submit")
                .click()
                .get("table:has(tbody)")
                .find("thead, tbody > tr")
                .should("have.length", 1);
    
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